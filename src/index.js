import React from 'react';
import ReactDOM from 'react-dom';
import './Css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, compose, applyMiddleware} from 'redux'
import rootReducer from './Redux/rootReducer'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store} >

  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
