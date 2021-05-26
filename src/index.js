import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { Provider,  } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { ToastContainer } from "react-toastify";
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import "@mdi/font/css/materialdesignicons.min.css";
import "react-toastify/dist/ReactToastify.css";

import rootReducer from './reducers/rootReducer';
import App from './App';
import { isLocalhost } from './lib/helpers';
import rootSaga from './sagas/rootSaga';

var store;

const sagaMiddleware = createSagaMiddleware()

if (isLocalhost()) {
  store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));
}
else {
  store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
}

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
