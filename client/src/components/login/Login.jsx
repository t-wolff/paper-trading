// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useGlobalAuthContext } from '../../hooks';
// import './Login.css';

// const Login = () => {
// 	const [error, setError] = useState(false);
// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');

// 	const navigate = useNavigate();

// 	const { dispatch, currentUser } = useGlobalAuthContext();

// 	const handleLogin = (e) => {
// 		e.preventDefault();

// 		// signInWithEmailAndPassword(auth, email, password)
// 		// 	.then((userCredential) => {
// 		// 		const user = userCredential.user;
// 		// 		dispatch({ type: 'LOGIN', payload: user });
// 		// 		navigate('/admin/manageArticles');
// 		// 	})
// 		// 	.catch((error) => {
// 		// 		setError(error.message);
// 		// 	});
// 	};

// 	const handleLogout = (e) => {
// 		e.preventDefault();
// 		dispatch({ type: 'LOGOUT' });
// 		navigate('/');
// 	};

// 	return (
// 		<>
// 			{!currentUser ? (
// 				<>
// 					<div className="logout">
// 						<h2>ADMIN</h2>
// 					</div>
// 					<div className="login-container">
// 						<div className="login-form-container">
// 							<h2>WELCOME.</h2>
// 							<form onSubmit={handleLogin}>
// 								<label htmlFor="email">Email Address:</label>
// 								<input
// 									type="email"
// 									placeholder="jhonnyappleseeds@gmail.com"
// 									onChange={(e) => setEmail(e.target.value)}
// 								/>
// 								<label htmlFor="password">Password:</label>
// 								<input
// 									type="password"
// 									placeholder="Appleseeds123456"
// 									onChange={(e) => setPassword(e.target.value)}
// 								/>
// 								<button type="submit">Login</button>
// 								{error && <span>{error}</span>}
// 							</form>
// 						</div>
// 					</div>
// 				</>
// 			) : (
// 				<div className="logout">
// 					<h2>ADMIN</h2>
// 					<button onClick={handleLogout}>Log Out</button>
// 				</div>
// 			)}
// 		</>
// 	);
// };

// export default Login;
