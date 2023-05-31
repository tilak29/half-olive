import { connect } from "react-redux";
import RoomMaster from "./RoomMasterScreen";
import {
  getRoomMaster,
  saveRoomMaster,
  getRoomCategories,
  getKeyList,
  getAmenityMaster,
  getStaticLookup
} from "../../../Saga/actions/ActionContainer";
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAmenityMaster: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getAmenityMaster({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getRoomMaster: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getRoomMaster({
          params,
          onSuccess,
          onFailure,
        })
      ),
    saveRoomMaster: ({ params, onSuccess, onFailure }) =>
      dispatch(
        saveRoomMaster({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getRoomCategories: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getRoomCategories({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getKeyList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getKeyList({
          params,
          onSuccess,
          onFailure,
        })
      ),
      getRoomStatus: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getStaticLookup({
          params,
          onSuccess,
          onFailure,
        })
      )
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RoomMaster);
