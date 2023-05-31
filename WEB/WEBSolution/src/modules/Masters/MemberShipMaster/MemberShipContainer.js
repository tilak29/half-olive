import { connect } from "react-redux";
import MemberShipMaster from "./MemberShip";
import {
  getMemberShip,
  getOccupancy,
  getMemberShipDays,
  listallcategoryname,
  insertMemberShipData,
  updateMemberShipData,
  getMemberShipMasterEffectiveDate,
  deleteMemberShipData
} from "../../../Saga/actions/ActionContainer";
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteMemberShipData: ({ params, onSuccess, onFailure }) =>
    dispatch(
      deleteMemberShipData({
        params,
        onSuccess,
        onFailure,
      })
    ),
    getMemberShipMasterEffectiveDate: ({ params, onSuccess, onFailure }) =>
    dispatch(
      getMemberShipMasterEffectiveDate({
        params,
        onSuccess,
        onFailure,
      })
    ),
    insertMemberShipData: ({ params, onSuccess, onFailure }) =>
    dispatch(
      insertMemberShipData({
        params,
        onSuccess,
        onFailure,
      })
    ),
    updateMemberShipData: ({ params, onSuccess, onFailure }) =>
    dispatch(
      updateMemberShipData({
        params,
        onSuccess,
        onFailure,
      })
    ),
    listallcategoryname: ({ params, onSuccess, onFailure }) =>
    dispatch(
      listallcategoryname({
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
    getMemberShipDays: ({ params, onSuccess, onFailure }) =>
    dispatch(
        getMemberShipDays({
        params,
        onSuccess,
        onFailure,
      })
    ),
    getMemberShip: ({ params, onSuccess, onFailure }) =>
    dispatch(
      getMemberShip({
        params,
        onSuccess,
        onFailure,
      })
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MemberShipMaster);
