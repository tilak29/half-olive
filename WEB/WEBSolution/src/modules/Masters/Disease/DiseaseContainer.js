import { connect } from "react-redux";
import DiseaseMaster from "./DiseaseList";
import {
  getDiseaseMaster,
  saveDiseaseMaster,
  deleteDiseaseMaster,
} from "../../../Saga/actions/ActionContainer";
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDiseaseMaster: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getDiseaseMaster({
          params,
          onSuccess,
          onFailure,
        })
      ),
    saveDiseaseMaster: ({ params, onSuccess, onFailure }) =>
      dispatch(
        saveDiseaseMaster({
          params,
          onSuccess,
          onFailure,
        })
      ),
      deleteDiseaseMaster: ({ params, onSuccess, onFailure }) =>
      dispatch(
        deleteDiseaseMaster({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DiseaseMaster);
