import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import snackbarReducer from "./SnackBar/snackBarSlice";
// import productsReducer from './Products/productsSlice';
// import userSlice from './User/userSlice';

const appReducer = combineReducers({
  auth: authReducer,
  snackBar: snackbarReducer,
  
//   products: productsReducer,
//   user: userSlice,
});

const RootReducer = (state, action) => {
  return appReducer(state, action);
};

export default RootReducer;