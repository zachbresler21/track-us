import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
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
  // when a logout action is dispatched it will reset redux state
  // if (action.type === 'AUTH_LOGOUT_SUCCESS') {
  //   // we keep a reference of the keys we want to maintain
  //   // other keys will be passed as undefined and this will call
  //   // reducers with an initial state
  //   storage.removeItem('persist:root');
  //   state = undefined;
  // }

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
