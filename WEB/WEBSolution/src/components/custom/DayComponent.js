import React, { useEffect } from 'react'

const DayComponent = ({date,view}) => {
    console.log("props :::: ",date.getDay());

    useEffect(() => {
        if(date.getDay() == 3){
            for (let index = 0; index < document.getElementsByClassName("weekoffday").length; index++) {
                const getdate= document.getElementsByClassName("weekoffday")[index].parentElement.classList.add("weeklyoff")
                console.log("getdate :: ",getdate);
            }
            
            
            
        }
       
    },[])
    return(
        <div 
        className={date.getDay() == 3 ? "weekoffday " : ""}
        >
            {
                date.getDay() == 3  ? <span className='work-of-day'>Weekly Off</span> : ""
            }
        </div>
    )
}

export default DayComponent