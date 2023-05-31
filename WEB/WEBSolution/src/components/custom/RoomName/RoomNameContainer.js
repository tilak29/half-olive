import { connect } from "react-redux";
import {
    getMemberShipDays,
  getOccupancy,
  getRoom
} from "../../../Saga/actions/ActionContainer";
import RoomName from "./RoomName";
const mapStateToProps = (state) => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMemberShipDays: ({ params, onSuccess, onFailure }) =>
    dispatch(
        getMemberShipDays({
        params,
        onSuccess,
        onFailure,
      })
    ),
    getRoom: ({ params, onSuccess, onFailure }) =>
    dispatch(
        getRoom({
        params,
        onSuccess,
        onFailure,
      })
    ),
    getOccupancy: ({ params, onSuccess, onFailure }) =>
    dispatch(
        getOccupancy({
        params,
        onSuccess,
        onFailure,
      })
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RoomName);


