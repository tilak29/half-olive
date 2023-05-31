import { connect } from "react-redux";
import {
  getTime,
  datefilter,
  listallcategoryname,
  getOccupancy,
  getMemberShipDays,
  saveroomRate,
  updateroomRate,
  deleteroomrate,
} from "../../../Saga/actions/ActionContainer";
import RoomRateMaster from "./RoomRateList";

const mapStateToProps = (state) => {
  return { operationRights: state.mainReducer.currentMenu.operationRights };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTime: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getTime({
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

    datefilter: ({ params, onSuccess, onFailure }) =>
      dispatch(
        datefilter({
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

    saveroomRate: ({ params, onSuccess, onFailure }) =>
      dispatch(
        saveroomRate({
          params,
          onSuccess,
          onFailure,
        })
      ),
    updateroomRate: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateroomRate({
          params,
          onSuccess,
          onFailure,
        })
      ),
    deleteroomrate: ({ params, onSuccess, onFailure }) =>
      dispatch(
        deleteroomrate({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomRateMaster);
