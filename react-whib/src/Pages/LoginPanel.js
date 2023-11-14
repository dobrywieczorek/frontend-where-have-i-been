import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPanel() {
  	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	async function login(event) {
		event.preventDefault();

		if (!email.includes("@")) {
			setError("błąd - niepoprawny adres e-mail!");
			return ;
		}

		if (password.length < 8) {
			setError("błąd - hasło musi mieć przynajmniej 8 znaków");
			return ;
		}

		setError('');

		const body = { email, password };

		try {
			let res = await fetch("login.php", {
				method: "post",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json; charset=UTF-8"
				}
			});
			let text = await res.text();
			let json = JSON.parse(text);
			console.log('JSON', json);

			if (json.status === 'OK') {
				console.log("Zalogowany");
			} else {
				setError("Niepoprawny adres email i/lub hasło");
			}

		} catch(err) {
			console.log(err);
			setError("Błąd serwera, spróbuj ponownie później");
		}
	}

	return (
		<>
			<div className="mx-auto h-screen grid content-center">
				<div className="flex flex-col items-center">
					<h3 className="text-2xl font-bold mb-2">
						Logowanie
					</h3>
					<form className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 flex flex-col items-center" onSubmit={login}>
						<p className="mb-10">Zaloguj się do swojego konta:</p>
						<div className="mb-3 w-4/6">
							<label htmlFor="email" className="block text-gray-700">Adres e-mail</label>
							<input
								type="email"
								className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500  focus:invalid:border-black focus:invalid:border-2 focus:invalid:ring-red-500 focus:invalid:ring-2"
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
						<p className="text-danger" id="error">{error}</p>
						<button type="submit" className="w-4/6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300">
							Zaloguj
						</button>
					</form>
					<p className="mt-3">Nie pamiętasz hasła? <Link href="/">Zresetuj hasło</Link></p>
					<p className="mt-3">Nie masz jeszcze konta? <Link href="/">Zarejestruj się</Link></p>
				</div>
			</div>
		</>
	)
}
