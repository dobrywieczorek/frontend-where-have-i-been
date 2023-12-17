import { useState, useEffect } from 'react';

function validatePasswordStrength(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

function EditUserPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [error, setError] = useState('');

    const url = 'http://localhost:8000/api';
    const token = "10|NJbXucIu4xcKfHbzopO85kdTRSPwBx8ogDsOQOi8ff801ea1";
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            "Content-Type": "application/json; charset=UTF-8"
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${url}/whoami`, requestOptions);
                const data = await response.json();
                console.log(data);
                setName(data.name || '');
                setDescription(data.description || '');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validatePasswordStrength(password)) {
            setPasswordError('Hasło powinno zawierać co najmniej 8 znaków, w tym wielkie i małe litery, cyfry i znaki specjalne');
            return;
        }
        setPasswordError('');

        if (name.trim() === '' || name.includes('#')) {
            setNameError('Nazwa nie może być pusta i zawierać symbol "#"');
            return;
        }
        setNameError('');

        try {
            const response = await fetch(`${url}/edituser`, {
                ...requestOptions,
                body: JSON.stringify({
                    name: name,
                    password: password,
                    description: description
                })
            });

            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas zapisywania zmian.');
            }

        } catch (error) {
            setError(error.message);
            console.error('Fetch error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full px-6 py-10 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl mb-8 font-semibold text-gray-800 text-center">Ustawienia użytkownika</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg font-semibold mb-3" htmlFor="name">
                            Nowa nazwa konta:
                            <input
                                className="border rounded-lg font-normal px-4 py-3 mt-2 w-full focus:outline-none focus:border-blue-500"
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        {nameError && (
                            <p className="text-red-500 text-sm italic">{nameError}</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg font-semibold mb-3" htmlFor="password">
                            Nowe hasło:
                            <input
                                className="border rounded-lg font-normal px-4 py-3 mt-2 w-full focus:outline-none focus:border-blue-500"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        {passwordError && (
                            <p className="text-red-500 text-sm italic">{passwordError}</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg font-semibold mb-3" htmlFor="description">
                            Opis:
                            <textarea
                                className="border rounded-lg font-normal px-4 py-3 mt-2 w-full h-28 resize-none focus:outline-none focus:border-blue-500"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Zapisz zmiany
                    </button>
                </form>
            </div>
        </div>
    );         
}

export default EditUserPage;
