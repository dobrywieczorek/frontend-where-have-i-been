import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function UserSearchPanel() {
    const { t } = useTranslation();
    const url = 'http://localhost:8000/api';
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    function navigateToProfile(userId) {
        navigate(`/profile/${userId}`);
    }


    async function handleSearch(event) {
        event.preventDefault();
        
        if (!searchQuery.trim()) {
            setError(t('searcherror'));
            return;
        }

        try {
            let modifiedSearchQuery = searchQuery;
            let endpoint = 'getusersbyname';
            let searchParam = 'name';

            if (searchQuery.startsWith('#')) {
                endpoint = 'getuserbyid';
                searchParam = 'id';
                modifiedSearchQuery = searchQuery.substring(1);
            }

            const response = await fetch(`${url}/${endpoint}?${searchParam}=${modifiedSearchQuery}`);
            const data = await response.json();
    
            if (data && data.users && data.users.success) {
                const foundUsers = data.users.users;
            
                if (Array.isArray(foundUsers) && foundUsers.length > 0) {
                    // Check if users were found by name
                    setSearchResults(foundUsers);
                    setError('');
                } else if (foundUsers && typeof foundUsers === 'object' && foundUsers.id) {
                    // Check if user was found by ID
                    setSearchResults([foundUsers]);
                    setError('');
                } else {
                    // No users found
                    setSearchResults([]);
                    setError(t('nouserwithname'));
                }
            } else {
                setSearchResults([]);
                setError(t('errorduringsearch'));
            }
        } catch (err) {
            console.error(err);
            setError(t('errorduringsearch'));
            setSearchResults([]);
        }
    }

    return (
        <div className="container">
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md mt-10">
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">{t('searchusertitle')}</h3>
                    <form onSubmit={handleSearch}>
                        <div className="mb-4">
                            <label htmlFor="search" className="block text-gray-700 mb-2">{t('accountname')}</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                id="search"
                                placeholder={t('searchforuser')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <p className="text-red-500 mb-4" id="error">{error}</p>
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {t('search')}
                        </button>
                    </form>
                </div>
                {searchResults.length > 0 && (
                    <div className="p-6 bg-gray-100">
                        <h4 className="text-lg font-bold mb-3">{t('searchresults')}</h4>
                        <ul>
                            {searchResults.map((user) => (
                                <li key={user.id} className="mb-2 border-b pb-2 flex justify-between items-center">
                                    <span className="">{user.name} #{user.id}</span>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => navigateToProfile(user.id)}
                                    >
                                        {t('viewprofile')}
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