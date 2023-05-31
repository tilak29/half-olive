import { connect } from "react-redux";

import QRList from "./QRList";
import {
  getQRList,
  addQR,
  updateQR,
  deleteQR,
  generateQRCode,
  printDownloadQR,
  getQRPrintHistory
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights,
    serverDate: state.mainReducer.otherInfo.serverDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQRList: ({ onSuccess, onFailure }) =>
    dispatch(getQRList({ onSuccess, onFailure })),

    addQR: ({params, onSuccess, onFailure }) =>
      dispatch(addQR({params, onSuccess, onFailure })),

    updateQR: ({ params, onSuccess, onFailure }) =>
      dispatch(updateQR({ params, onSuccess, onFailure })),

    deleteQR: ({ params, onSuccess, onFailure }) =>
      dispatch(deleteQR({ params, onSuccess, onFailure })),    

    generateQRCode: ({ params, onSuccess, onFailure }) =>
      dispatch(generateQRCode({ params, onSuccess, onFailure })),    

    printDownloadQR: ({ params, onSuccess, onFailure }) =>
      dispatch(printDownloadQR({ params, onSuccess, onFailure })),
      
    getQRPrintHistory: ({ params, onSuccess, onFailure }) =>
      dispatch(getQRPrintHistory({ params, onSuccess, onFailure }))    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QRList);