import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createAPI} from "./helpers/api";
import "./styles/global.scss";
import "./styles/variables.scss";
import App from "./components/App/App.jsx";
import {reducer} from "./store/reducer";
import {AuthorizationStatus} from "./helpers/const";
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
    <App />
  </Provider>,
  document.getElementById('root')
);
