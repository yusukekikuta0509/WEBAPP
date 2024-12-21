import React from "react";
import ReactDOM from "react-dom/client"; // React 18以降では "react-dom/client" を使用
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
