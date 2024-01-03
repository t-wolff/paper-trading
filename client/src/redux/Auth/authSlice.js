import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import * as actionSnackBar from '../SnackBar/snackBarSlice';
import { setAuthToken, saveToSessionStorage } from '../../utils/constans';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: '',
		isAuthenticated: false,
		loadingIndicator: false,
		userContent: {},
		isWsConnection: false,
		wrongCredentialsError: null,
	},
	reducers: {
		setLogin: (state, action) => {
			state.isAuthenticated = true;
			state.loadingIndicator = false;
			// state.loadingIndicatorFullScreen = false;
			state.token = action.payload.token;
			state.userContent = action.payload.userContent;
		},
		setUserContent: (state, action) => {
			state.userContent = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
		setLogout: () => authSlice.initialState,
		setLoadingIndicator: (state, action) => {
			state.loadingIndicator = action.payload;
		},
		setWrongCredentialsError: (state, action) => {
			state.wrongCredentialsError = action.payload;
		},
		setWSToConnected: (state, action) => {
			state.isWsConnection = action.payload;
		},
	},
});

export const login =
	(email, password) =>
		async (dispatch) => {
			dispatch(setLoadingIndicator(true));
			try {
				const headers = { 'Content-Type': 'application/json' };

				const res = await axios({
					method: 'POST',
					url: `${import.meta.env.VITE_BASE_URL}/auth/login`,
					data: { email, password },
					headers: headers,
				});

				if (res.data.token) {
					dispatch(setInitialSettings(res.data));
					dispatch(
						actionSnackBar.setSnackBar('success', 'Login Successful', 2000)
					);
				} 
			} catch (error) {
				if (error?.response?.status === 401) {
					dispatch(setWrongCredentialsError('Wrong Username/Password'));
					dispatch(actionSnackBar.setSnackBar('error', 'Login failed', 2000));
					dispatch(setLoadingIndicator(false));
				} else if (error.response && error.response.data !== undefined) {
					dispatch(actionSnackBar.setSnackBar('error', 'Login failed', 2000));
					dispatch(setLoadingIndicator(false));
				} else {
					dispatch(actionSnackBar.setSnackBar('error', 'Server error', 2000));
					dispatch(setLoadingIndicator(false));
				}
			}
		};

const setInitialSettings = (data) => (dispatch) => {
	const userContent = {
		...data.user,
		// ...data.payload.user,
		// config: data.payload.config ? data.payload.config : data.config,
		// system: data.system,
		// profile: data.payload.profile,
		// theme: data.payload.user.config ? data.payload.user.config : {},
	};

	saveToSessionStorage('TOKEN', data.token);

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

export const logout = (actionType) => (dispatch) => {
	sessionStorage.clear();

	dispatch(setLogout());
	// dispatch(utilsActions.setLockScreenModalOpen(false)); need to add this only if LockScreenModalOpen is true
	if (actionType !== 'session_termination' && actionType !== 'anotherUser') {
		dispatch(actionSnackBar.setSnackBar('success', 'Successfully disconnected', 2000));
	}
	if (actionType !== 'session_termination' && actionType !== 'anotherUser') {
		axios
			.delete(`${import.meta.env.VITE_BASE_URL}/auth/login`)
			// .then((res) => {})
			// .catch((error) => {});
	}

};


export const {
	setLogin,
	setUserContent,
	setToken,
	setLogout,
	setLoadingIndicator,
	setWrongCredentialsError,
	setWSToConnected,
} = authSlice.actions;

export default authSlice.reducer;
