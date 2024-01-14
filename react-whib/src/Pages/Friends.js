import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api';
const getToken = () => localStorage.getItem('access_token');

export default function UserSearchPanel() {
    const [friendList, setFriendList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const token = getToken();
            if (!token) {
                console.error('Access token not found. Redirecting to login.');
                navigate('/login');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/getuserfriends`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setIsLoading(false);
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                const data = await response.json();
                if (data && data.friends) {
                    setFriendList(data.friends.length > 0 ? data.friends : []);
                    setError(data.friends.length > 0 ? '' : 'No friends found.');
                } else {
                    throw new Error('Error loading friends.');
                }
            } catch (err) {
                console.error(err.message);
                setError('Error occurred while loading friends.');
                setFriendList([]);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const navigateToProfile = userId => {
        navigate(`/profile/${userId}`);
    };

    return (
        <div className="container mx-auto">
            <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-md mt-14">
                {error && <p className="text-red-500">{error}</p>}
                {isLoading ? (
                    <p>Loading friends...</p>
                ) : friendList.length > 0 ? (
                    <div className="p-6 bg-gray-100">
                        {/* Responsive grid layout */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {friendList.map(friend => (
                                <li key={friend.id} className="mb-2 border-b pb-2 flex justify-between items-center">
                                    <span 
                                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                                        onClick={() => navigateToProfile(friend.friend_with_user.id)}
                                    >
                                        {friend.friend_with_user.name} #{friend.friend_with_user.id}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No friends found.</p>
                )}
            </div>
        </div>
    );
}
