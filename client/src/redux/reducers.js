import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import snackbarReducer from "./SnackBar/snackBarSlice";
import tradeReducer from './Trade/tradeSlice';

const appReducer = combineReducers({
  auth: authReducer,
  snackBar: snackbarReducer,
  trade: tradeReducer,
});

const RootReducer = (state, action) => {
  return appReducer(state, action);
};

export default RootReducer;