import { takeLatest, call } from "redux-saga/effects";

import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  FORGOT_PASSWORD,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";
const CryptoJS = require("crypto-js");
//import { encrypt } from "../../Utils/CryptoUtils.js";

function* userLogin(action) {
  //const requestBody = encrypt(action.payload.params);
  const requestBody = action.payload.params;
  const encryptedText = {};
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(requestBody),
    "superUserReveation"
  ).toString();
  encryptedText["encryptedText"] = ciphertext;
  // let requestBody = {};
  // const password = action.payload.params.password;
  // requestBody["mobileNumber"] = action.payload.params.mobileNumber;
  // requestBody["password"] = CryptoJS.AES.encrypt(
  //   password,
  //   "sepecindia"
  // ).toString();

  yield call(MasterSaga, {
    action,
    apiURL: API.USER_LOGIN,
    requestBody: encryptedText,
    successAction: USER_LOGIN_SUCCESS,
  });
}

function* forgotPassword(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.FORGOT_PASSWORD,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call the login & forgot password APIs.
 * It calls callback event to save the login-response in the state on API success.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(USER_LOGIN, userLogin);
  yield takeLatest(FORGOT_PASSWORD, forgotPassword);
}

export default dataSaga;
