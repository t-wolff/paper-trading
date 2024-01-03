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
//     preloadedState,
//     enhancers,
//   });

//   return store;
// }

import { configureStore } from '@reduxjs/toolkit';

// import monitorReducersEnhancer from './enhancers/monitorReducers';
// import loggerMiddleware from './middleware/logger';
import rootReducer from './reducers';

export default function configureAppStore(preloadedState) {
	const store = configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
		preloadedState,
		enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
	});

	// if (process.env.NODE_ENV !== 'production' && module.hot) {
	// 	module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
	// }

	return store;
}