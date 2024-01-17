import axios from 'axios';
import * as actionSnackBar from '../SnackBar/snackBarSlice';
import { createSlice } from '@reduxjs/toolkit';

const VITE_BASE_URL = 'http://http://16.171.195.174/api/v1';

export const statsSlice = createSlice({
	name: 'stats',
	initialState: {
		productBalance: 0,
		usdtBalance: 0,
		pnl: 0,
		position: 0,
		leaderboard: [],
	},
	reducers: {
		setStats: (state, action) => {
			state.pnl = action.payload.pnl;
			state.productBalance = action.payload.productBalance;
			state.usdtBalance = action.payload.usdtBalance;
			state.position = action.payload.position;
		},
		setLeaderboard: (state, action) => {
			state.leaderboard = action.payload;
		},
	},
});

export const getStats = (userID) => async (dispatch) => {
	try {
		const headers = { 'Content-Type': 'application/json' };
		const res = await axios({
			method: 'GET',
			credentials: 'include',
			url: `${VITE_BASE_URL}/stats/${userID}`,
			headers: headers,
		});

		if (res.status === 200) {
			dispatch(setStats(res.data))
		}
	} catch (error) {
		if (error?.response?.status === 401) {
			dispatch(actionSnackBar.setSnackBar('error', 'Unauthorized', 2000));
		} else if (error.response && error.response.data !== undefined) {
			dispatch(actionSnackBar.setSnackBar('error', 'Get Stats failed', 2000));
		} else {
			dispatch(actionSnackBar.setSnackBar('error', 'Server error', 2000));
		}
	}
};


export const getLeaderboard = () => async (dispatch) => {
	try {
		const headers = { 'Content-Type': 'application/json' };
		const res = await axios({
			method: 'GET',
			credentials: 'include',
			url: `${VITE_BASE_URL}/stats`,
			headers: headers,
		});

		if (res.status === 200) {
			dispatch(setLeaderboard(res.data.users));
		}
	} catch (error) {
		if (error?.response?.status === 401) {
			dispatch(actionSnackBar.setSnackBar('error', 'Unauthorized', 2000));
		} else if (error.response && error.response.data !== undefined) {
			dispatch(actionSnackBar.setSnackBar('error', 'Get Stats failed', 2000));
		} else {
			dispatch(actionSnackBar.setSnackBar('error', 'Server error', 2000));
		}
	}
};

export const { setStats, setLeaderboard } = statsSlice.actions;

export default statsSlice.reducer;
