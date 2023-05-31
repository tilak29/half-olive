import { connect } from "react-redux";

import {
  getTherapySlot,
  saveTherapySlot,
  deleteTherapySlot,
  getTherapyType,
  getTherapyCategory,
} from "../../../Saga/actions/ActionContainer";
import TherapySlotMaster from "./TherapySlot";
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTherapyType: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getTherapyType({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getTherapyCategory: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getTherapyCategory({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getTherapySlot: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getTherapySlot({
          params,
          onSuccess,
          onFailure,
        })
      ),
    saveTherapySlot: ({ params, onSuccess, onFailure }) =>
      dispatch(
        saveTherapySlot({
          params,
          onSuccess,
          onFailure,
        })
      ),
      deleteTherapySlot: ({ params, onSuccess, onFailure }) =>
      dispatch(
        deleteTherapySlot({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TherapySlotMaster);
