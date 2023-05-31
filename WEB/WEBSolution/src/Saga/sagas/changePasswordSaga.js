import { takeLatest, call } from "redux-saga/effects";

import { CHANGE_PASSWORD } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";
const CryptoJS = require("crypto-js");

function* fetchData(action) {
  const encryptedText = {};
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(action.payload.params),
    "superUserSpec"
  ).toString();
  encryptedText["encryptedText"] = ciphertext;
  //const requestBody = encrypt(action.payload.params);

  yield call(MasterSaga, {
    action,
    apiURL: API.CHANGE_PASSWORD,
    requestBody: encryptedText,
  });
}

/**
 * This saga is used to call the change password API.
 * Sending requestbody in encrypted format
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(CHANGE_PASSWORD, fetchData);
}

export default dataSaga;
