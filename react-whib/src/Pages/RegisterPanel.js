import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPanel() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validatePasswordStrength(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    async function Register(event) {
        event.preventDefault();

        if (!validateEmail(email)) {
            setError('Nieprawidłowy adres e-mail!');
            return;
        }

        if (!validatePasswordStrength(password)) {
            setError('Hasło powinno zawierać co najmniej 8 znaków, w tym wielkie i małe litery, cyfry i znaki specjalne.');
            return;
        }
        setError('');

        const body = { name, email, password };

        try {
            let res = await fetch("http://localhost:8000/api/register", {
                method: "post",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            });
            let text = await res.text();
            let json = JSON.parse(text);
            console.log('JSON', json);

            if (json.success) {
                console.log("Użytkownik zarejestrowany!");
                navigate("/login");
            } else if (json.errors) {
                setError(json.errors);
            }

        } catch (err) {
            console.log(err);
            setError("Błąd serwera, spróbuj ponownie później");
        }

    }

    return (
        <>
            <div className="mx-auto h-screen grid content-center">
                <div className="flex flex-col items-center pb-28">
                    <h3 className="text-2xl font-bold mb-2">Rejestracja</h3>
                    <p className="mb-10">Zarejestruj nowe konto:</p>
                    <form className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 flex flex-col items-center" onSubmit={Register}>
                        <div className="mb-3 w-4/6">
                            <label htmlFor="name" className="block text-gray-700">Nazwa konta</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 w-4/6">
                            <label htmlFor="email" className="block text-gray-700">Adres e-mail</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 w-4/6">
                            <label htmlFor="password" className="block text-gray-700">Hasło</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 w-4/6">
                            <label htmlFor="confirmPassword" className="block text-gray-700">Potwierdź hasło</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <p className="text-red-500 mb-3" id="error">{error}</p>
                        <button type="submit" className="w-4/6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Zarejestruj
                        </button>
                    </form>
                    <p className="mt-3">Masz już konto? <Link className="text-blue-400 hover:text-blue-700" to="/login">Zaloguj się</Link></p>
                </div>
            </div>
        </>
    )
}