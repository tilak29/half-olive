import { connect } from "react-redux";
import DailyTherapyList from "./DailyTherapyList";
import {
    getDailytherapy,
    getDailytherapyTypeName,
    updateDailytherapy,
    getDailytherapySlot
} from "../../../Saga/actions/ActionContainer";

/**
 * @author Dileep Lohar
 */

const mapStateToProps = (state) => {
    return {
        operationRights: state.mainReducer.currentMenu.operationRights,
        filterDesignation: state.mainReducer.filterDesignation,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        getDailytherapy: ({params, onSuccess, onFailure }) =>
            dispatch(
                getDailytherapy({
                    params,
                    onSuccess,
                    onFailure
                })
            ),
            getDailytherapyTypeName: ({ onSuccess, onFailure }) =>
            dispatch(
                getDailytherapyTypeName({
                    onSuccess,
                    onFailure
                })
            ),
            updateDailytherapy: ({ params,onSuccess, onFailure }) =>
            dispatch(
                updateDailytherapy({
                    params,
                    onSuccess,
                    onFailure
                })
            ),
            getDailytherapySlot: ({ onSuccess, onFailure }) =>
            dispatch(
                getDailytherapySlot({
                    onSuccess,
                    onFailure
                })
            )
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DailyTherapyList);