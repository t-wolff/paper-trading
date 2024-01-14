import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import snackbarReducer from "./SnackBar/snackBarSlice";
import tradeReducer from './Trade/tradeSlice';
import statsReducer from "./Stats/statsSlice";

const appReducer = combineReducers({
  auth: authReducer,
  snackBar: snackbarReducer,
  trade: tradeReducer,
  stats: statsReducer,
});

const RootReducer = (state, action) => {
  return appReducer(state, action);
};

export default RootReducer;