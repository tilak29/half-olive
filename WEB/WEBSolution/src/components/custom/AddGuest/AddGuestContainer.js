import { connect } from "react-redux";
import {
  addGuest,updateGuest,getCountries,kycupload
} from "../../../Saga/actions/ActionContainer";
import AddGuest from "./AddGuest";
const mapStateToProps = (state) => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights,
    filterDesignation: state.mainReducer.filterDesignation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: ({ onSuccess, onFailure }) =>
      dispatch(
        getCountries({
          onSuccess,
          onFailure,
        })
      ),
    addGuest: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addGuest({
          params,
          onSuccess,
          onFailure,
        })
      ),
    updateGuest: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateGuest({
          params,
          onSuccess,
          onFailure,
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGuest);
