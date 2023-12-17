import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPanel() {
  	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	async function Login(event) {
		event.preventDefault();

		if (!email.includes("@")) {
			setError("błąd - niepoprawny adres e-mail!");
			return ;
		}

		setError('');

		const body = { email, password };

		try {
			let res = await fetch("http://localhost:8000/api/login", {
				method: "post",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json; charset=UTF-8"
				}
			});
			let text = await res.text();
			let json = JSON.parse(text);
			console.log('JSON', json);

			if (json.access_token) {
				console.log("Zalogowany, token dostępu: ", json.access_token);
				console.log("Zalogowany, typ tokenu: ", json.token_type);
				localStorage.setItem("access_token", json.access_token);
				localStorage.setItem("token_type", json.token_type);
				
				navigate("/map");
			} else if(json.errors === "Invalid login details") {
				setError("Niepoprawny adres email lub hasło");
			}

		} catch(err) {
			console.log(err);
			setError("Błąd serwera, spróbuj ponownie później");
		}
	}

	return (
		<>
			<div className="mx-auto h-screen grid content-center">
				<div className="flex flex-col items-center pb-28">
					<h3 className="text-2xl font-bold mb-2">
						Logowanie
					</h3>
					
					<p className="mb-10">Zaloguj się do swojego konta:</p>
					<form className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 flex flex-col items-center" onSubmit={Login}>
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
						<p className="text-red-500 mb-3" id="error">{error}</p>
						<button type="submit" className="w-4/6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
							Zaloguj
						</button>
					</form>
					<p className="mt-3">Nie pamiętasz hasła? <Link className="text-blue-400 hover:text-blue-700" to="/">Zresetuj hasło</Link></p>
					<p className="mt-3">Nie masz jeszcze konta? <Link className="text-blue-400 hover:text-blue-700" to="/register">Zarejestruj się</Link></p>
				</div>
			</div>
		</>
	)
}
