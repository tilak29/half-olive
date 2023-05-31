import {
  FORCE_LOGOUT,
  GET_CITIES_SUCCESS,
  GET_REFRESH_TOKEN_SUCCESS,
  GET_STATES_SUCCESS,
  SET_CURRENTMENU,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  SHOW_DISPLAY_MESSAGE,
  HIDE_DISPLAY_MESSAGE,
} from "../actions/ActionType";

const initialState = {
  isUserAuthorize: false,
  userData: {},
  otherInfo: {},
  currentMenu: null,
  stateList: [],
  cityList: [],
  filterDesignation: {},
  divisionList: {},
  displayMessage: {},
};

/**
 * This reducer will perform the state changes according to the actions dispatched
 * Only put those actions which changes the state
 * @author "Mihir Vyas, Tejal Sali"
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isUserAuthorize: true,
        userData: {
          userInfo: action.data.userInfo,
          authInfo: action.data.authInfo,
          id: action.data.id,
        },
        otherInfo: action.data.otherInfo,
        filterDesignation: action.data.filterDesignation,
      };

    case USER_LOGOUT_SUCCESS:
      return { ...initialState };

    case FORCE_LOGOUT:
      return { ...initialState };

    case GET_REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        userData: { ...state.userData, authInfo: action.data },
      };

    case SET_CURRENTMENU:
      return {
        ...state,
        currentMenu: action.payload.menuDetails,
      };

    case SHOW_DISPLAY_MESSAGE:
      return {
        ...state,
        displayMessage: { open: true, ...action.payload.messageDetails },
      };

    case HIDE_DISPLAY_MESSAGE:
      return { ...state, displayMessage: { open: false } };

    case GET_STATES_SUCCESS:
      return { ...state, stateList: action.data.stateList };

    case GET_CITIES_SUCCESS:
      return { ...state, cityList: action.data.cityList };

    default:
      return state;
  }
};

export default reducer;
