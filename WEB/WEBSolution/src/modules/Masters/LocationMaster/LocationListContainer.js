import { connect } from "react-redux";
import {
  addLocation, getLocationList, updateLocation, deleteLocation
} from "../../../Saga/actions/ActionContainer";
import LocationList from './LocationList';

const mapStateToProps = state => {
  return { operationRights: state.mainReducer.currentMenu.operationRights };
};

const mapDispatchToProps = dispatch => {
  return {
    getLocationList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getLocationList({
          params,
          onSuccess,
          onFailure
        })
      ),
    addLocation: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addLocation({
          params,
          onSuccess,
          onFailure
        })
      ),

    updateLocation: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateLocation({
          params,
          onSuccess,
          onFailure
        })
      ),

    deleteLocation: ({ params, onSuccess, onFailure }) =>
      dispatch(
        deleteLocation({
          params,
          onSuccess,
          onFailure
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationList);
