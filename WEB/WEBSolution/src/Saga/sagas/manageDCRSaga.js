import { takeLatest, call } from "redux-saga/effects";

import { MANAGE_DCR } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";
const CryptoJS = require("crypto-js");

function* manageDCR(action) {
  const requestBody = action.payload.params;
  const encryptedText = {};
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(requestBody),
    "superUserSpec"
  ).toString();
  encryptedText["encryptedText"] = ciphertext;

  yield call(MasterSaga, {
    action,
    apiURL: API.MANAGE_DCR,
    requestBody: encryptedText,
  });
}

/**
 * This saga is used to call manage DCR (clear DCR data of employee) API.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(MANAGE_DCR, manageDCR);
}

export default dataSaga;
