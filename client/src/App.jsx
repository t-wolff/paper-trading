// import { useEffect, useRef } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SnackBar from './components/SnackBar/SnackBar';
// import { useGlobalArticleContext } from "./hooks";

import {
  Home,
  SignUp,
  Login,
  Dashboard,
  NotFound,
  Stories,
  NewStory
} from "./pages";

import {
  ProtectedRoute,
  SharedLayout,
  SingleTrade,
  // NewArticle,
} from "./components";

const routes = [
	{
		path: '/',
		element: <SharedLayout />,
		children: [
			{
				index: true,
				element: <Home />,
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
				path: 'stories',
				children: [
					{
						index: true,
						element: <Stories />,
					},
					{
						path: ':storyId',
						element: <SingleTrade />,
					},
				],
			},
			{
				path: 'newStory',
				element: (
					<ProtectedRoute>
						{' '}
						<NewStory />
					</ProtectedRoute>
				),
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
];

function App() {
  const router = createBrowserRouter(routes);
  // const { error, clearError } = useGlobalArticleContext();

  // useEffect(() => {
  //   if (error) {
  //   }
  // }, [error, clearError]);

  return (
		<>
			<SnackBar />
			<RouterProvider router={router} />
		</>
	);
}

export default App;
