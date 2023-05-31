import { connect } from "react-redux";
import {
    getMemberShipDays,
} from "../../../Saga/actions/ActionContainer";
import MemberShipDays from "./MemberShipDay";

const mapStateToProps = (state) => {
  return {};
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MemberShipDays);