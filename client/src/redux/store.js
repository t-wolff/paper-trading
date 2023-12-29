// import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
// import thunkMiddleware from "redux-thunk";
// import RootReducer from "./reducers";

// export default function configureAppStore(preloadedState) {
//   const middlewares = [thunkMiddleware];
//   const middlewareEnhancer = applyMiddleware(...middlewares);

//   const enhancers = [middlewareEnhancer];

//   const store = configureStore({
//     reducer: RootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         immutableCheck: false,
//         serializableCheck: false,
//       }),
//     devTools: process.env.NODE_ENV !== "production",
//     preloadedState,
//     enhancers,
//   });

//   if (process.env.NODE_ENV !== "production" && module.hot) {
//     module.hot.accept("./reducers", () => store.replaceReducer(RootReducer));
//   }

//   return store;
// }