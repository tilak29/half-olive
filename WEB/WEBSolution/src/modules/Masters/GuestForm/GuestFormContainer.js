import { connect } from "react-redux";
import GuestFormScreen from "./GuestFormScreen";
import {
  getDiseaseMaster,
  updateDiseaseList
} from "../../../Saga/actions/ActionContainer";

/**
 * @author Dileep Lohar
 */

const mapStateToProps = (state) => {
  return {
    filterDesignation: state.mainReducer.filterDesignation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDiseaseMaster: ({ params,onSuccess, onFailure }) =>
        dispatch(
          getDiseaseMaster({
            params,
            onSuccess,
            onFailure
          })
        ),
        updateDiseaseList: ({ params,onSuccess, onFailure }) =>
        dispatch(
          updateDiseaseList({
            params,
            onSuccess,
            onFailure
          })
        )
       };
};
export default connect(mapStateToProps, mapDispatchToProps)(GuestFormScreen);