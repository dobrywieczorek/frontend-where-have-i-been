import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

export default function UserSearchPanel() {
    const url = 'http://localhost:8000/api';
    const [friendList, setFriendList] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token")
    function navigateToProfile(userId) {
        navigate(`/profile/${userId}`);
    }


    function Friends(event) {
        event.preventDefault();

        try {
            const response = fetch(`${url}/getuserfriends?${token}`);
            const data = response.json();
    
            if (data && data.users && data.users.success) {
                const foundUsers = data.users.users;
            
                if (foundUsers.length > 0) {
                    // check if user has friends
                    setFriendList(foundUsers);
                    setError('');
                } else {
                    // No users found
                    setFriendList([]);
                    setError('Brak przyjaciół. 😓');
                }
            } else {
                setFriendList([]);
                setError('Wystąpił błąd podczas wczytywania przyjaciół.');
            }
        } catch (err) {
            console.error(err);
            setError('Wystąpił błąd podczas wczytywania przyjaciół.');
            setFriendList([]);
        }
    }

    return (
        <div className="container mx-auto mt-10">
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                {friendList.length > 0 && (
                    <div className="p-6 bg-gray-100">
                        <ul>
                            {friendList.map((user) => (
                                <li key={user.id} className="mb-2 border-b pb-2 flex justify-between items-center">
                                    <span className="">{user.name} #{user.id}</span>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => navigateToProfile(user.id)}
                                    >
                                        View Profile
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}