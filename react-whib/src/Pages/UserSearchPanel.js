import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function UserSearchPanel() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');

    async function handleSearch(event) {
        event.preventDefault();
        
        if (!searchQuery.trim()) {
            setError('Wpisz nazwę użytkownika do wyszukania.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/getusersbyname?name=${searchQuery}`);
            const data = await response.json();
    
            if (data && data.users && data.users.success) {
                const foundUsers = data.users.users;
    
                if (foundUsers.length > 0) {
                    setSearchResults(foundUsers);
                    setError('');
                } else {
                    setSearchResults([]);
                    setError('Brak wyników dla podanej nazwy użytkownika.');
                }
            } else {
                setSearchResults([]);
                setError('Wystąpił błąd podczas wyszukiwania użytkowników.');
            }
        } catch (err) {
            console.error(err);
            setError('Wystąpił błąd podczas wyszukiwania użytkowników.');
            setSearchResults([]);
        }
    }

    return (
        <div className="mx-auto h-screen grid content-center">
            <div className="flex flex-col items-center pb-28">
                <h3 className="text-2xl font-bold mb-2">Wyszukiwanie użytkowników</h3>
                <form className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 flex flex-col items-center" onSubmit={handleSearch}>
                    <div className="mb-3 w-4/6">
                        <label htmlFor="search" className="block text-gray-700">Nazwa użytkownika</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            id="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <p className="text-red-500 mb-3" id="error">{error}</p>
                    <button type="submit" className="w-4/6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Szukaj
                    </button>
                </form>
                {searchResults.length > 0 && (
                    <div className="mt-8 w-4/6">
                        <h4 className="text-lg font-bold mb-3">Wyniki wyszukiwania:</h4>
                        <ul>
                            {searchResults.map((user) => (
                                <li key={user.id}>{user.name} - {user.email}</li> //SEARCHED USERS DATA
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
