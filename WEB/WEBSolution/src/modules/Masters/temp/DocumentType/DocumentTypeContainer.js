import { connect } from "react-redux";
import DocumentType from "./DocumentType";
import { getStaticLookup,addDocumentType,getDocumentTypeList,updateDocumentType} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = (state) => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    getStaticLookup: ({ params, onSuccess, onFailure }) =>
    dispatch(getStaticLookup({ params, onSuccess, onFailure })),
   
    getDocumentTypeList: ({ params, onSuccess, onFailure }) =>
    dispatch(
        getDocumentTypeList({
        params,
        onSuccess,
        onFailure,
      })
    ),

    addDocumentType: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addDocumentType({
          params,
          onSuccess,
          onFailure,
        })
      ),

    updateDocumentType: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateDocumentType({
          params,
          onSuccess,
          onFailure,
        })
      ),
  
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentType);
