import { connect } from "react-redux";
import AmenityMaster from "./AmenityMasterScreen";
import {
  getAmenityMaster,
  saveAmenityMaster,
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
    saveAmenityMaster: ({ params, onSuccess, onFailure }) =>
      dispatch(
        saveAmenityMaster({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AmenityMaster);
