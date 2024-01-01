import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api';
const getToken = () => localStorage.getItem('access_token');

export default function UserSearchPanel() {
    const [friendList, setFriendList] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = getToken();
            if (!token) {
                console.error('Access token not found. Redirecting to login.');
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`${API_URL}/getuserfriends`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

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
            }
        };

        fetchData();
    }, [navigate]);

    const navigateToProfile = userId => {
        navigate(`/profile/${userId}`);
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                {error && <p className="text-red-500">{error}</p>}
                {friendList.length > 0 ? (
                    <div className="p-6 bg-gray-100">
                        <ul>
                            {friendList.map(friend => (
                                <li key={friend.id} className="mb-2 border-b pb-2 flex justify-between items-center">
                                    <span>{friend.friend_with_user.name} #{friend.friend_with_user.id}</span>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => navigateToProfile(friend.friend_with_user.id)}
                                    >
                                        View Profile
                                    </button>
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
