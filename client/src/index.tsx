import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './assets/styles/index.scss';

ReactDOM.hydrate(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
const BASE_URL = window.location.hostname === 'localhost' ? "http://localhost:8080" : '';
export default BASE_URL;