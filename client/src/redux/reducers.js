// import { combineReducers } from "@reduxjs/toolkit";
// import { statesArray } from "../utils/constans";
// import authReducer from "./Auth/authSlice";
// import snackbarReducer from "./SnackBar/snackBarSlice";
// import exposuresSlice from './Exposures/exposuresSlice';
// import productsReducer from './Products/productsSlice';
// import userSlice from './User/userSlice';
// import apiKeysReducer from './ApiKeys/apiKeysSlice';
// import transactionsAccountsSlice from './TransactionsAccounts/transactionsAccountsSlice';

// const appReducer = combineReducers({
//   auth: authReducer,
//   snackBar: snackbarReducer,
//   exposures: exposuresSlice,
//   products: productsReducer,
//   user: userSlice,
//   api_keys: apiKeysReducer,
//   transactionsAccounts: transactionsAccountsSlice,
// });

// const RootReducer = (state, action) => {
//   if (action.type === "auth/setLogout") {
//     statesArray?.forEach((stateName) => delete state[stateName]);
//   }
//   return appReducer(state, action);
// };

// export default RootReducer;