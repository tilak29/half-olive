import { connect } from "react-redux";
import {
    guestUploadFile_DownloadFile
} from "../../../Saga/actions/ActionContainer";
import ImageCarousel from "./ImageCarousel";
const mapStateToProps = (state) => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights,
    filterDesignation: state.mainReducer.filterDesignation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    guestUploadFile_DownloadFile: ({params, onSuccess, onFailure }) =>
      dispatch(
        guestUploadFile_DownloadFile({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageCarousel);
