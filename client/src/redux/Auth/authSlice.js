import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import * as actionSnackBar from '../SnackBar/snackBarSlice';
import { setAuthToken, saveToLocalStorage } from '../../utils/constants';

const BASE_URL =
	import.meta.env.VITE_MODE === 'prod'
		? import.meta.env.VITE_BASE_URL_PROD
		: import.meta.env.VITE_BASE_URL;

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: '',
		isAuthenticated: false,
		isRegistered: false,
		userContent: {},
		isWsConnection: false,
		wrongCredentialsError: null,
	},
	reducers: {
		setLogin: (state, action) => {
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.userContent = action.payload.userContent;
		},
		setIsRegistered: (state, action) => {
			state.isRegistered = action.payload;
		},
		setUserContent: (state, action) => {
			state.userContent = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
		setLogout: (state) => {
			(state.token = ''), (state.isAuthenticated = false);
			state.isRegistered = false;
			state.userContent = {};
			state.isWsConnection = false;
			state.wrongCredentialsError = null;
		},
		setWrongCredentialsError: (state, action) => {
			state.wrongCredentialsError = action.payload;
		},
		setWSToConnected: (state, action) => {
			state.isWsConnection = action.payload;
		},
	},
});

export const login = (email, password) => async (dispatch) => {
	console.log('base url :' + BASE_URL);
	try {
		const headers = { 'Content-Type': 'application/json' };
		const res = await axios({
			method: 'POST',
			credentials: 'include',
			url: `${BASE_URL}/auth/login`,
			data: { email, password },
			headers: headers,
		});

		if (res.data.token) {
			dispatch(setInitialSettings(res.data));
			dispatch(actionSnackBar.setSnackBar('success', 'Login Successful', 2000));
		}
	} catch (error) {
		if (error?.response?.status === 401) {
			dispatch(setWrongCredentialsError('Wrong Username/Password'));
			dispatch(actionSnackBar.setSnackBar('error', 'Login failed', 2000));
		} else if (error.response && error.response.data !== undefined) {
			dispatch(actionSnackBar.setSnackBar('error', 'Login failed', 2000));
		} else {
			dispatch(actionSnackBar.setSnackBar('error', 'Server error', 2000));
		}
	}
};

export const register = (firstName, lastName, email, password) => async (dispatch) => {
	try {
		const headers = { 'Content-Type': 'application/json' };
		const res = await axios({
			method: 'POST',
			url: `${BASE_URL}/auth/register`,
			data: { firstName, lastName, email, password },
			headers: headers,
		});

		if (res.status === 200) {
			dispatch(setIsRegistered(true));
			dispatch(actionSnackBar.setSnackBar('success', 'Register Successful', 2000));
		}
	} catch (error) {
		if (error.response && error.response.data !== undefined) {
			dispatch(actionSnackBar.setSnackBar('error', 'Register failed', 2000));
		} else {
			dispatch(actionSnackBar.setSnackBar('error', 'Server error', 2000));
		}
	}
};

const setInitialSettings = (data) => (dispatch) => {
	const userContent = { ...data.user };
	saveToLocalStorage('TOKEN', data.token);
	setAuthToken(data.token);

	dispatch(
		setLogin({
			token: data.token,
			userContent,
			socket: null,
		})
	);
	dispatch(actionSnackBar.setSnackBar('success', 'Successfully connected', 2000));
};

export const uploadPic = (formData) => async (dispatch) => {
	try {
		const headers = { 'Content-Type': 'multipart/form-data' };
		const res = await axios.put(`${BASE_URL}/auth/updateUser`, formData, {
			headers,
		});
		if (res) {
			console.log(res);
			// dispatch(setInitialSettings(res.data));
			// dispatch(actionSnackBar.setSnackBar('success', 'Login Successful', 2000));
		}
	} catch (error) {
		if (error?.response?.status === 401) {
			dispatch(actionSnackBar.setSnackBar('error', 'Upload failed', 2000));
		} else if (error.response && error.response.data !== undefined) {
			dispatch(actionSnackBar.setSnackBar('error', 'Upload failed', 2000));
		} else {
			dispatch(actionSnackBar.setSnackBar('error', 'Server error', 2000));
		}
	}
};

export const logout = () => (dispatch) => {
	localStorage.clear();
	dispatch(setLogout());
	dispatch(actionSnackBar.setSnackBar('success', 'Successfully disconnected', 2000));

	axios.delete(`${BASE_URL}/auth/login`);
};

export const {
	setLogin,
	setUserContent,
	setToken,
	setIsRegistered,
	setLogout,
	setWrongCredentialsError,
	setWSToConnected,
	isAuthenticated,
} = authSlice.actions;

export default authSlice.reducer;
