import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import Carousel from 'react-material-ui-carousel';
import {Paper,IconButton,Dialog} from '@material-ui/core';
import { Close, SaveAlt } from "@material-ui/icons";
import DisplayMessage from "../../../components/core/DisplayMessage";
export default function ImageCarousel(props)
{
    const {
        onCancel,
        open=true,
        items = [], // Array of items to be rendered in list key-value pair
        maxWidth = "100%",
        fullWidth = true,
        index=0
    }={ ...props }
    const [label,setLabel] = useState(index);
    const [downloadFile,setDownloadFile] = useState();
    const [displayMessage, setDisplayMessage] = useState({});
    const displayErrorMessage = (message) => {
      setDisplayMessage({
        open: true,
        displayMessage: message,
        severity: "error",
      });
    };
    const guestUploadFile_DownloadFile = (url,name) => {
      let params = {url:url}
      props.guestUploadFile_DownloadFile({
          params,
          onSuccess: (response) => {
            const { uploadedFiles} = response;
            setDownloadFile([uploadedFiles,name])
          },
          onFailure: ({ message }) => {
            displayErrorMessage(message);
          },
        });
    }
 const downloadImg = (url,name) => {
      let file = (url.split(',')[1]);
      if(file == undefined)
      {
        guestUploadFile_DownloadFile(url,name)
      }
      else
      {
          saveAs(url, name);
      }
    }
    useEffect(() => {
      if(downloadFile!=undefined && downloadFile.length !=0)
      {
        saveAs(downloadFile[0], downloadFile[1]);
      }
    },[downloadFile])
    return (
        <Dialog open={open} maxWidth={maxWidth} fullWidth={fullWidth}>

        <div>
                <div className="d-flex justify-content-between align-items-center">
                <h6>{items[label].label}</h6>
              <div style={{display:"flex"}}>
              <IconButton
                  aria-label="cancel"
                  onClick={() => {
                    downloadImg(items[label].value,items[label].label)
                  }}
                >
                  <SaveAlt />
                </IconButton>
                <IconButton
                  aria-label="cancel"
                  onClick={() => {
                    onCancel && onCancel("cancel");
                  }}
                >
                  <Close />
                </IconButton>
              </div>
            </div>
        <Carousel 
            indicators={false}
            index={index}
            autoPlay={false}
            navButtonsAlwaysVisible={true}
            onChange={(e) => {setLabel(e)}}
        >
            {
                items.map( (item, i) => {return(
                    <Paper>
                        <img src={item.value} width="100%" height="500px"/>
                    </Paper>
                )})
            }
        </Carousel>
        </div>
        <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
        </Dialog>
    )
}