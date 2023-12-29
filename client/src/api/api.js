import axios from 'axios';

const BASE_URL = 'http://localhost:8888/api/v1/stories';

export const getAllStories = async () => {
	try {
		const response = await axios.get(`${BASE_URL}`);
		return response.data;
	} catch (error) {
		console.error(`Error during getAllStories: ${error}`);
		return [];
	}
};

export const getStory = async (storyId) => {
	try {
		const response = await axios.get(`${BASE_URL}/${storyId}`);
		return response.data;
	} catch (error) {
		console.error(`Error during getArticle: ${error}`);
		return null;
	}
};

export const addStory = async (data) => {
  console.log(data);
	try {
		const response = await axios.post(BASE_URL, data);
		return response.data;
	} catch (error) {
		console.error(`Error during addStory: ${error}`);
	}
};
