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

export const getPost = async (postId) => {
	try {
		const response = await axios.get(`${BASE_URL}/${postId}`);
		return response.data;
	} catch (error) {
		console.error(`Error during getArticle: ${error}`);
		return null;
	}
};

export const addPost = async (data) => {
  console.log(data);
	try {
		const response = await axios.post(BASE_URL, data);
		return response.data;
	} catch (error) {
		console.error(`Error during addPost: ${error}`);
	}
};
