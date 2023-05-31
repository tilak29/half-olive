import { connect } from "react-redux";
import KeyMaster from "./KeyMasterScreen";
import {
  getKeyMaster,
  saveKeyMaster,
} from "../../../Saga/actions/ActionContainer";
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    getKeyMaster: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getKeyMaster({
          params,
          onSuccess,
          onFailure,
        })
      ),
    saveKeyMaster: ({ params, onSuccess, onFailure }) =>
      dispatch(
        saveKeyMaster({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(KeyMaster);
