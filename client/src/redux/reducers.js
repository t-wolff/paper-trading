// import { combineReducers } from "@reduxjs/toolkit";
// import { statesArray } from "../utils/constans";
// import utilsReducer from "./Utils/utilsSlice";
// import initialSettings from "./InitialSettings/initialSettingsSlice";
// import authReducer from "./Auth/authSlice";
// import snackbarReducer from "./SnackBar/snackBarSlice";
// import timeSlice from "./Time/timeSlice";
// import exposuresSlice from './Exposures/exposuresSlice';
// import productsReducer from './Products/productsSlice';
// import userSlice from './User/userSlice';
// import apiKeysReducer from './ApiKeys/apiKeysSlice';
// import transactionsAccountsSlice from './TransactionsAccounts/transactionsAccountsSlice';
// import settlementSlice from './Settlement/settlementSlice';

// const appReducer = combineReducers({
//   initialSettings: initialSettings,
//   utils: utilsReducer,
//   auth: authReducer,
//   snackBar: snackbarReducer,
//   time: timeSlice,
//   exposures: exposuresSlice,
//   products: productsReducer,
//   user: userSlice,
//   api_keys: apiKeysReducer,
//   transactionsAccounts: transactionsAccountsSlice,
//   settlement: settlementSlice
// });

// const RootReducer = (state, action) => {
//   if (action.type === "auth/setLogout") {
//     statesArray?.forEach((stateName) => delete state[stateName]);
//   }
//   return appReducer(state, action);
// };

// export default RootReducer;