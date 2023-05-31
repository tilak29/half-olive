import { connect } from "react-redux";
import MealType from "./MealType";
import {
  getMealTypeName
} from "../../../Saga/actions/ActionContainer";
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMealTypeName: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getMealTypeName({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };

};
export default connect(mapStateToProps, mapDispatchToProps)(MealType)