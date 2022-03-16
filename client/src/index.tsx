import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/styles/index.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import themeReducer from './reducers/themeReducer';

const themeStore = createStore(themeReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={themeStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
const BASE_URL =
  window.location.hostname === 'localhost' ? 'http://localhost:8080' : '';
export default BASE_URL;
