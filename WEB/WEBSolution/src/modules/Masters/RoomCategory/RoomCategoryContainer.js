import { connect } from "react-redux";
import RoomCategory from "./RoomCategoryScreen";
import {
  getRoomCategory,
  insertRoomCategory,
  getAmenityMaster
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
    getRoomCategory: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getRoomCategory({
          params,
          onSuccess,
          onFailure,
        })
      ),
    insertRoomCategory: ({ params, onSuccess, onFailure }) =>
      dispatch(
        insertRoomCategory({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RoomCategory);
