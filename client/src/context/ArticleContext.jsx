import React, { createContext, useState, useEffect } from 'react';
import {
	addStory,
	getAllStories,
	getStory,
} from '../api/api';

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
	const [stories, setStories] = useState([]);
	const [story, setStory] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchAllStories = async () => {
		try {  const response = await getAllStories();

		if (response.status === 304) {
			console.log('Not Modified: Using the existing state.');
			setIsLoading(false);
			return;
		}
			const storiesData = response;
			setStories(storiesData.data);
			setIsLoading(false);
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchAllStories();
		console.log('fetched data on empty dependency arr');
	}, []);

	const addNewStory = async (articleData) => {
		try {
			await addStory(articleData);
			fetchAllStories();
		} catch (err) {
			setError(err.message);
		}
	};

	const getStoryById = async (storyId) => {
		try {
			const story = await getStory(storyId);
			setStory(story.data);
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	const clearError = () => {
		setError(null);
	};

	return (
		<ArticleContext.Provider
			value={{
				stories,
				story,
				isLoading,
				error,
				addNewStory,
				getStoryById,
				clearError,
			}}>
			{children}
		</ArticleContext.Provider>
	);
};
