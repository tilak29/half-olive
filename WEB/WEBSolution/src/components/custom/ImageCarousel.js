import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import Carousel from 'react-material-ui-carousel';
import {Paper,IconButton,Dialog} from '@material-ui/core';
import { Close, SaveAlt } from "@material-ui/icons";

export default function ImageCarousel(props)
{
    const {
        onCancel,
        open=true,
        items = [], // Array of items to be rendered in list key-value pair
        maxWidth = "100%",
        fullWidth = "100%",
        index=0
    }={ ...props }
    const [label,setLabel] = useState(index);
    
    const downloadImg = (url,name) => {
        (async () => { 
            let names = name;
            let blob = await fetch(url[0]).then((r) => r.blob());
            saveAs(blob, names);
        })();
    }
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
            // indicatorIconButtonProps={{
            //     style: {
            //         padding: '10px',    // 1
            //     }
            // }}
            // swipe={false}
            index={index}
            autoPlay={false}
            // cycleNavigation={false}
            navButtonsAlwaysVisible={true}
            onChange={(e) => {setLabel(e)}}
            // stopAutoPlayOnHover={false}
            // next={ (next, active) => console.log(`we left ${active}, and are now at ${next}`) }
            // prev={ (prev, active) => console.log(`we left ${active}, and are now at ${prev}`) }
            // animation={"slide"}
            // NextIcon={<Edit />}
            // PrevIcon={<Edit />}
            // IndicatorIcon={<Edit/>}
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
        </Dialog>
    )
}