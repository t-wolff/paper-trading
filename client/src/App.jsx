// import { useEffect, useRef } from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SnackBar from './components/SnackBar/SnackBar';
// import { useDispatch } from 'react-redux';
// import { getFromLocalStorage } from './utils/constants';
// import * as actionAuth from './redux/Auth/authSlice';
// import { useSelector } from 'react-redux';

import {
	LandingPage,
	SignUp,
	Login,
	Dashboard,
	Trade,
	Leaderboard,
	NotFound,
	//   Posts,
	//   NewPost
} from './pages';

import { ProtectedRoute, SharedLayout } from './components';
// import { useEffect, useState } from 'react';

const routes = [
	{
		path: '/',
		element: <SharedLayout />,
		children: [
			{
				index: true,
				element: <LandingPage />,
			},
			{
				path: 'signUp',
				element: <SignUp />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'dashboard',
				element: (
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				),
			},
			{
				path: 'trade',
				element: (
					<ProtectedRoute>
						<Trade />
					</ProtectedRoute>
				),
			},
			{
				path: 'leaderboard',
				element: (
					<ProtectedRoute>
						<Leaderboard />
					</ProtectedRoute>
				),
			},
			// {
			// 	path: 'posts',
			// 	children: [
			// 		{
			// 			index: true,
			// 			element: <Posts />,
			// 		},
			// 		{
			// 			path: ':postId',
			// 			element: <SingleTrade />,
			// 		},
			// 	],
			// },
			// {
			// 	path: 'newPost',
			// 	element: (
			// 		<ProtectedRoute>
			// 			<NewPost />
			// 		</ProtectedRoute>
			// 	),
			// },
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
];

function App() {
	const router = createBrowserRouter(routes);
	// const dispatch = useDispatch();
	// const [isToken, setIsToken] = useState(true)
	// const userContent = useSelector((state) => state.auth.userContent);

	// useEffect(() => {
	// 	const token = getFromLocalStorage('TOKEN');
	// 	if (token) {
	// 		dispatch(actionAuth.getUserContent(token));
	// 		setIsToken(true);
	// 	} else {setIsToken(false);}
	// }, [dispatch]);

	return (
		<>
			<SnackBar />
			{/* { ((isToken && userContent) || !isToken) &&  */}
			<RouterProvider router={router} />
			{/* } */}
		</>
	);
}

export default App;
