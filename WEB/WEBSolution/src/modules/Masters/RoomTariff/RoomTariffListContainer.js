import { connect } from "react-redux";
import {
  addGuest, getCountries, getGuestList, updateGuest
} from "../../../Saga/actions/ActionContainer";
import RoomTariffList from "./RoomTariffList";


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
    getGuestList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getGuestList({
          params,
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

export default connect(mapStateToProps, mapDispatchToProps)(RoomTariffList);
