import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ArticleProvider } from "./context/ArticleContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ArticleProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ArticleProvider>
  </React.StrictMode>
);
