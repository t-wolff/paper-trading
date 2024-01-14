import axios from 'axios';
import * as actionSnackBar from '../SnackBar/snackBarSlice';
import { createSlice } from '@reduxjs/toolkit';

export const statsSlice = createSlice({
	name: 'stats',
	initialState: {
		balance: '0',
		pnl: '0'
	},
	reducers: {
		setStats: (state, action) => {
			state.pnl = action.payload.pnl;
			// state.balance = action.payload.balance;
		},
	},
});

export const getStats = (userID) => async (dispatch) => {
	try {
		const headers = { 'Content-Type': 'application/json' };
		const res = await axios({
			method: 'GET',
			credentials: 'include',
			url: `${import.meta.env.VITE_BASE_URL}/stats/${userID}`,
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

export const { setStats } = statsSlice.actions;

export default statsSlice.reducer;
