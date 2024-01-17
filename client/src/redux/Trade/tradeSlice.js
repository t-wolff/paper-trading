import axios from 'axios';
import * as actionSnackBar from '../SnackBar/snackBarSlice';
import { createSlice } from '@reduxjs/toolkit';

const VITE_BASE_URL = 'http://16.171.195.174/api/v1';

export const tradeSlice = createSlice({
	name: 'trade',
	initialState: {
		trades: [],
		candles: [{ open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 }],
	},
	reducers: {
		setTrades: (state, action) => {
			state.trades = action.payload;
		},
		setCandles: (state, action) => {
			state.candles = action.payload;
		},
	},
});

export const createTrade = (product, side, quantity, userID) => async (dispatch) => {
	try {
		const headers = { 'Content-Type': 'application/json' };
		const res = await axios({
			method: 'POST',
			credentials: 'include',
			url: `${VITE_BASE_URL}/trade`,
			data: { userID, product, side, quantity },
			headers: headers,
		});

		if (res.status === 200) {
			dispatch(actionSnackBar.setSnackBar('success', 'Trade Successful', 2000));
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
			url: `${VITE_BASE_URL}/trade/${userID}`,
			headers: headers,
		});

		if (res.status === 200) {
			const trades = res.data.trades;
			dispatch(setTrades(trades));
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


export const getCandles = (params) => async (dispatch) => {
	try {
		const headers = { 'Content-Type': 'application/json' };
		const res = await axios({
			method: 'GET',
			credentials: 'include',
			url: `${VITE_BASE_URL}/trade/candles`,
			params: params,
			headers: headers,
		});

		if (res.status === 200) {
			const candles = res.data.candles;
			dispatch(setCandles(candles));
		}
	} catch (error) {
		if (error?.response?.status === 401) {
			dispatch(actionSnackBar.setSnackBar('error', 'Unauthorized', 2000));
		} else if (error.response && error.response.data !== undefined) {
			dispatch(actionSnackBar.setSnackBar('error', 'Get candles failed', 2000));
		} else {
			dispatch(actionSnackBar.setSnackBar('error', 'Server error', 2000));
		}
	}
};


export const { snackBar, setDisableSnackBar, setTrades, setCandles} = tradeSlice.actions;

export default tradeSlice.reducer;
