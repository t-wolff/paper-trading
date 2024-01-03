import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import snackbarReducer from "./SnackBar/snackBarSlice";
// import exposuresSlice from './Exposures/exposuresSlice';
// import productsReducer from './Products/productsSlice';
// import userSlice from './User/userSlice';
// import apiKeysReducer from './ApiKeys/apiKeysSlice';
// import transactionsAccountsSlice from './TransactionsAccounts/transactionsAccountsSlice';

const appReducer = combineReducers({
  auth: authReducer,
  snackBar: snackbarReducer,
//   exposures: exposuresSlice,
//   products: productsReducer,
//   user: userSlice,
//   api_keys: apiKeysReducer,
//   transactionsAccounts: transactionsAccountsSlice,
});

const RootReducer = (state, action) => {
  return appReducer(state, action);
};

export default RootReducer;