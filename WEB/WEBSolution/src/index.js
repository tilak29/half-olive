import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import ParentErrorBoundary from "./ParentErrorBoundary";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./Saga/store/configureStore";
const { store, persistor } = configureStore();
/**
 * This file renders our components inside the root div in index.html
 */
ReactDOM.render(
  <Provider store={store}>
    {/* Persisting store when the page is refreshed/redirected */}
    <PersistGate loading={null} persistor={persistor}>
      {/* Wrapping the main component inside error boundary to handle all
    application errors */}
      <ParentErrorBoundary>
        <App />
      </ParentErrorBoundary>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
