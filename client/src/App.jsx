// import { useEffect, useRef } from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SnackBar from './components/SnackBar/SnackBar';
// import { getFromLocalStorage } from './utils/constants';

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
	// const token = getFromLocalStorage('TOKEN');

	// if (token) {
	// 	get user
	// }

	return (
		<>
			<SnackBar />
			<RouterProvider router={router} />
		</>
	);
}

export default App;
