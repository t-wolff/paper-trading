import axios from 'axios';
import * as actionSnackBar from '../SnackBar/snackBarSlice';
import { createSlice } from '@reduxjs/toolkit';

export const tradeSlice = createSlice({
	name: 'trade',
	initialState: {
		trades: [],
	},
	reducers: {
		setTrades: (state, action) => {
			state.trades = action.payload;
		},
	},
});

export const createTrade = (product, side, quantity, userID) => async (dispatch) => {
	try {
		const headers = { 'Content-Type': 'application/json' };
		const res = await axios({
			method: 'POST',
			credentials: 'include',
			url: `${import.meta.env.VITE_BASE_URL}/trade`,
			data: { userID, product, side, quantity },
			headers: headers,
		});

		if (res.status === 200) {
			dispatch(actionSnackBar.setSnackBar('success', 'Trade Successful', 2000));
			getTrades()
			// need to dipatch get trades here
		}
	} catch (error) {
		if (error?.response?.status === 403) {
			dispatch(actionSnackBar.setSnackBar('error', 'Trade rejected insufficient funds', 2000));
		} else if (error.response && error.response.data !== undefined) {
			dispatch(actionSnackBar.setSnackBar('error', 'Trade failed', 2000));
		} else {
			dispatch(actionSnackBar.setSnackBar('error', 'Server error', 2000));
		}
	}
};

export const getTrades = (userID) => async (dispatch) => {
	try {
		const headers = { 'Content-Type': 'application/json' };
		const res = await axios({
			method: 'GET',
			credentials: 'include',
			url: `${import.meta.env.VITE_BASE_URL}/trade`,
			params: { userID },
			headers: headers,
		});

		if (res.status === 200) {
			console.log(res)
			dispatch(setTrades(res));
		}
		
	} catch (error) {
		if (error?.response?.status === 401) {
			dispatch(actionSnackBar.setSnackBar('error', 'Unauthorized', 2000));
		} else if (error.response && error.response.data !== undefined) {
			dispatch(actionSnackBar.setSnackBar('error', 'Get trades failed', 2000));
		} else {
			dispatch(actionSnackBar.setSnackBar('error', 'Server error', 2000));
		}
	}
};

export const { snackBar, setDisableSnackBar, setTrades} = tradeSlice.actions;

export default tradeSlice.reducer;
