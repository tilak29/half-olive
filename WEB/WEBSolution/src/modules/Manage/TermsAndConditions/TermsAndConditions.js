import React, { useState,useEffect } from "react";
import { Close } from "@material-ui/icons";

import FileUpload from "../../../components/core/FileUpload";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { staticImagePath } from "../../../../src/Config.json";
import Placeholder from "../../../Images/Placeholder.svg";
import TextField from "../../../components/core/TextField";
import RadioGroup from "../../../components/core/RadioGroup";
import DisplayMessage from "../../../components/core/DisplayMessage";
import Loading from "../../../components/core/Loading";
import { labels } from "../../../Config.json";
import Button from "../../../components/core/Button";
import RichTextEditor from 'react-rte';

/**
 * Text Editor for dynamic Terms and Conditions
 * @author Harsh Patel
 */
export default function TermsAndConditions(props) {
const [editorString, setEditorString] = useState(RichTextEditor.createEmptyValue());
const [loading, setLoading] = useState(false);
const [displayMessage, setDisplayMessage] = useState({});

useEffect(() => {
    getTandC()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const onChange = (value) => {
    setEditorString(value);
}

const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

const saveTandC = () => {
    setLoading(true);
    let params = {
        tandcBody: editorString.toString('html')
    };
    props.saveTandC({
      params,
      onSuccess: (response) => {
        setLoading(false);
        setDisplayMessage({
            open: true,
            displayMessage : response.message,
            severity: "success",
          });
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const getTandC = () => {
    setLoading(true);
    props.getTandC({
      onSuccess: (response) => {
        setEditorString(RichTextEditor.createValueFromString(response.tandC, 'html'))
        //RichTextEditor.createValueFromString(response.tandC, 'html')
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

return(
    <div>
        <RichTextEditor value={editorString} onChange={onChange} />
        <div className="d-flex align-items-center justify-content-end mt-3">
        <Button 
         label={"Save"}
         onClick={(e) => {
           saveTandC();
         }}
        customClass="button button-primary mr-2"
        ></Button>
        <Button 
         label={"Reset"}
         onClick={(e) => {
           getTandC();
         }}
        customClass="button button-primary mr-2"
        ></Button>
        </div>
        {loading && <Loading />}
        <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
        />
    </div>
    
  )
}
