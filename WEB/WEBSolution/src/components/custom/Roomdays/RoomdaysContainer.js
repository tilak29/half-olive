import { connect } from "react-redux";
import {
  getMemberShipDays,
  getOccupancy
} from "../../../Saga/actions/ActionContainer";
import Roomdays from "./Roomdays";
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
export default connect(mapStateToProps, mapDispatchToProps)(Roomdays);