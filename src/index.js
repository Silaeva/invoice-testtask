import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createAPI} from "./api";
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {reducer} from "./store/reducer";
import {AuthorizationStatus} from "./const";
import {setAuthStatus} from "./store/action";

const api = createAPI(
  () => store.dispatch(setAuthStatus(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api))
  )
);

ReactDOM.render(
  <Provider store={store} >
    <div className="app-container">
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
