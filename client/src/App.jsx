// import { useEffect, useRef } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { useGlobalArticleContext } from "./hooks";

import {
  Home,
  SignUp,
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
				element: <SignUp/>,
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
					element: <NewStory />,
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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
