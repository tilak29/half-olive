import { connect } from "react-redux";
import {
getOccupancy,
  saveroomRate
} from "../../../Saga/actions/ActionContainer";
import Occupancy from "./Occupancy";
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    getOccupancy: ({ params, onSuccess, onFailure }) =>
    dispatch(
        getOccupancy({
        params,
        onSuccess,
        onFailure,
      })
    ),
    saveroomRate: ({ params, onSuccess, onFailure }) =>
    dispatch(
        getOccupancy({
        params,
        onSuccess,
        onFailure,
      })
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Occupancy);


