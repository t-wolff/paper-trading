// import { useEffect, useRef } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { useGlobalArticleContext } from "./hooks";

import {
  Home,
  NotFound,
  Stories,
  NewStory
} from "./pages";

import {
  ProtectedRoute,
  SharedLayout,
  FullPageStory,
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
				path: 'stories',
				children: [
					{
						index: true,
						element: <Stories />,
					},
					{
						path: ':storyId',
						element: <FullPageStory />,
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
