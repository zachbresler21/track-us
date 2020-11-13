import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from "react-router-dom";
import thunk from 'redux-thunk';

import locationsReducer from './store/reducers/locations'

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;


const rootReducer = combineReducers({
  locations: locationsReducer,
});

const appReducer = (state, action) => {
  return rootReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['locations']

}

const persistedReducer = persistReducer(persistConfig, appReducer)

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);

const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>

);

ReactDOM.render(app, document.getElementById('root'));
