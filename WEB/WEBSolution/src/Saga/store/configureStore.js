import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducers from "../reducers/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

/**
 * Store configuration by combining Reducers, Sagas and Middleware.
 * Added persistent storage to save the state when the page is refreshed/redirected
 * @author "Mihir Vyas, Tejal Sali"
 */
export default function configureStore() {
  let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  let persistor = persistStore(store);
  return { store, persistor };
}
