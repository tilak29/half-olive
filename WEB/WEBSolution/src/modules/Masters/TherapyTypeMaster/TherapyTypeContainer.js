import { connect } from "react-redux";

import {
  getTherapyType,
  saveTherapyType,
  deleteTherapyType,
} from "../../../Saga/actions/ActionContainer";
import TherapyTypeMaster from "./TherapyType";
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
    saveTherapyType: ({ params, onSuccess, onFailure }) =>
      dispatch(
        saveTherapyType({
          params,
          onSuccess,
          onFailure,
        })
      ),
      deleteTherapyType: ({ params, onSuccess, onFailure }) =>
      dispatch(
        deleteTherapyType({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TherapyTypeMaster);
