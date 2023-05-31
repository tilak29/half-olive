import { connect } from "react-redux";
import {
  getTreatmentRoomMasterList,
  getAllTherapist,
  addTreatmentRoom,
  updateTreatmentRoom,
  deleteTreatmentRoom,
  getLocationList,
  getTreatmentMasterList,
} from "../../../Saga/actions/ActionContainer";
import TreatmentRoomMasterList from "./TreatmentRoomMasterScreen";

const mapStateToProps = (state) => {
  return { operationRights: state.mainReducer.currentMenu.operationRights };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTreatmentMasterList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getTreatmentMasterList({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getLocationList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getLocationList({
          params,
          onSuccess,
          onFailure,
        })
      ),
    addTreatmentRoom: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addTreatmentRoom({
          params,
          onSuccess,
          onFailure,
        })
      ),
    updateTreatmentRoom: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateTreatmentRoom({
          params,
          onSuccess,
          onFailure,
        })
      ),
    deleteTreatmentRoom: ({ params, onSuccess, onFailure }) =>
      dispatch(
        deleteTreatmentRoom({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getTreatmentRoomMasterList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getTreatmentRoomMasterList({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getAllTherapist: ({ onSuccess, onFailure }) =>
      dispatch(
        getAllTherapist({
          onSuccess,
          onFailure,
        })
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreatmentRoomMasterList);
