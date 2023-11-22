import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPanel from './Pages/LoginPanel';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPanel/>} />
			</Routes>
		</Router>
	);
}

export default App;

