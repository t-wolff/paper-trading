import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import { Provider } from 'react-redux'
// import store from './redux/store'
import "./index.css";

import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ArticleProvider } from "./context/ArticleContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ArticleProvider>
      <AuthContextProvider>
        {/* <Provider store={store}> */}
          <App />
        {/* </Provider> */}
      </AuthContextProvider>
    </ArticleProvider>
  </React.StrictMode>
);
