import { connect } from "react-redux";

import Roomcategory from "./Roomcategory";
import {  listallcategoryname,getOccupancy } from "../../../Saga/actions/ActionContainer";

const mapStateToProps = (state) => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listallcategoryname: ({ params, onSuccess, onFailure }) =>
    dispatch(
      listallcategoryname({
        params,
        onSuccess,
        onFailure
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

export default connect(mapStateToProps, mapDispatchToProps)(Roomcategory);