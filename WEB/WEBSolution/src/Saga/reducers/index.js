import { combineReducers } from "redux";
import mainReducer from "./mainReducer";
import secondReducer from "./secondReducer";

/**
 * The rootReducer calls every child reducer, and gathers their results into a single state object.
 * The state produced by combineReducers() namespaces the states of each reducer under their keys as passed to combineReducers().
 * E.g. If you want to access 'userData' from mainReducer's state then it will be retrieved as "state.mainReducer.userData". *
 * @author "Mihir Vyas, Tejal Sali"
 */

const rootReducer = combineReducers({
  mainReducer,
  secondReducer
});

export default rootReducer;
