/**
 * This is a selector file created to access the store/central-state from saga directly. *
 * @author Tejal Sali
 */

export const userInfo = state => state.mainReducer.userData.userInfo;
export const authInfo = state => state.mainReducer.userData.authInfo;
export const id = state => state.mainReducer.userData.id;
