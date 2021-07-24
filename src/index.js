import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.js'
import 'bootstrap/dist/js/bootstrap.esm'
import './index.css';

import App from './App';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/index'
import reportWebVitals from './reportWebVitals';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
      // other store enhancers if any
  );

const store = createStore(
  rootReducer,
  enhancer
  //composeEnchancers(applyMiddleware(thunk)),
  
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
