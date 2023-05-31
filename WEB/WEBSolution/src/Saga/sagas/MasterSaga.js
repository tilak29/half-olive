import { put, select } from "redux-saga/effects";
import axios from "axios";

import { BASE_URL, PUBLIC_APIS } from "../../Constants";
import * as selectors from "./selectors";
import { FORCE_LOGOUT, SHOW_DISPLAY_MESSAGE } from "../actions/ActionType";
import { appConfig } from "../../Config.json";

/**
 * This master-saga is used to call any API and to validate the API-response.
 * It calls callback events for the response if provided. *
 * @author "Mihir Vyas, Tejal Sali" *
 * @param {Object} action It should include the action TYPE
 * @param {String} apiURL
 * @param {Object} requestBody
 * @param {String} successAction Optional callback function on API success
 * @param {String} validationFailureAction Optional callback function on API validation failure
 * @param {String} failureAction Optional callback function on API failure
 */

const fetchData = function* ({
  action,
  apiURL,
  requestBody = {},
  successAction,
  validationFailureAction,
  failureAction,
  isUpload = false,
}) {
  try {
    let response = {};
    const {
      APIVersion,
      APITimeout = 0,
      APITimeoutMessage = "Server not reachable. Please contact Admin.",
    } = appConfig;

    const headers = {
      "accept-version": `${APIVersion}`,
    };
    if (!PUBLIC_APIS.includes(apiURL)) {
      const { token } = yield select(selectors.authInfo);
      const Id = yield select(selectors.id);
      headers.Authorization = `${token}`;
      headers.id = Id;
    }
    if (isUpload) {
      const { file, fileList } = requestBody;
      let formData;
      if (file || fileList) {
        headers["content-type"] = "multipart/form-data";
        formData = new FormData();
        if (fileList) {
          fileList.map((file) => {
            formData.append("file", file);
            return file;
          });
          delete requestBody.fileList;
        } else {
          formData.append("file", file);
          delete requestBody.file;
        }
        let objArr = [];
        objArr.push(requestBody);
        formData.append("objArr", JSON.stringify(objArr));
      } else {
        formData = { ...requestBody };
      }
      response = yield axios
        .post(BASE_URL + apiURL, formData, {
          headers,
          timeout: APITimeout,
        })
        .catch((error) => {
          if (error.code === "ECONNABORTED") {
            action.payload.onFailure({
              message: APITimeoutMessage,
              isError: false,
            });
            return;
          } else throw error;
        });
    } else {
      response = yield axios
        .post(BASE_URL + apiURL, requestBody, {
          headers,
          timeout: APITimeout,
        })
        .catch((error) => {
          if (error.code === "ECONNABORTED") {
            action.payload.onFailure({
              message: APITimeoutMessage,
              isError: false,
            });
            return;
          } else throw error;
        });
    }

    const { data = {} } = response;

    if (data.isSuccess && data.isValidate) {
      if (successAction)
        yield put({
          type: successAction,
          data: data.data,
        });

      if (action.payload && typeof action.payload.onSuccess === "function")
        action.payload.onSuccess({ ...data.data, message: data.message });
    } else if (data.isValidate === false) {
      if (validationFailureAction)
        yield put({
          type: validationFailureAction,
          data: data,
        });
      if (
        action.payload &&
        typeof action.payload.onValidationFailure === "function"
      )
        action.payload.onValidationFailure({ ...data });
      else {
        if (action.payload && typeof action.payload.onFailure === "function") {
          if (failureAction)
            yield put({
              type: failureAction,
              data: data,
            });
          action.payload.onFailure({ message: data.message, isError: false });
        } else {
          // Handle generic validation failure here
          yield put({
            type: SHOW_DISPLAY_MESSAGE,
            messageDetails: {
              displayMessage: data.message,
              severity: "error",
            },
          });
        }
      }
    } else {
      if (action.payload && typeof action.payload.onFailure === "function") {
        if (failureAction)
          yield put({
            type: failureAction,
            data: data,
          });
        action.payload.onFailure({ message: data.message, isError: false });
      } else {
        // Handle generic API failure here
        yield put({
          type: SHOW_DISPLAY_MESSAGE,
          messageDetails: {
            displayMessage: data.message,
            severity: "error",
          },
        });
      }
    }
  } catch (e) {
    // Handle error here or in callbcak
    if (e.response && e.response.data) {
      const data = e.response.data;
      if (action.payload && typeof action.payload.onFailure === "function")
        action.payload.onFailure({
          message: data.message,
          isError: true,
          statusCode: data.statusCode,
        });
      else {
        // Handle generic Error here
        yield put({
          type: SHOW_DISPLAY_MESSAGE,
          messageDetails: {
            displayMessage: data.message,
            severity: "error",
          },
        });
      }
      //Force to logout on 440
      if (data.statusCode === 440) {
        yield put({
          type: FORCE_LOGOUT,
        });

        window.history.go("/");
      }
    }
  }
};

export default fetchData;
