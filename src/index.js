import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as ReactRedux from "react-redux";
import * as Bootstrap from "react-bootstrap";
import "bootstrap/dist/css//bootstrap.css";
import "roboto-fontface/css/roboto/sass/roboto-fontface.scss";
import { createStore } from "redux";
import reducer from "./Reducer";
import ThemeProvider from "./theme/ThemeProvider";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ReactRedux.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
