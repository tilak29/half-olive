import React, { useEffect, useState } from "react";
import DatePicker from "../../../components/core/DatePicker";
import { getDBFormateDate } from "../../../Utils/DateTimeUtils.js";


export default function LWF(props) {
  const [selectedRecord, setSelectedRecord] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDayWiseData, setSelectedDayWiseData] = useState([]);
  const [content, setContent] = useState("");

  // const dayList = [
  //   {
  //     value:1,
  //     label:"Monday"

  //   },
  //   {
  //     value:2,
  //     label:"Massage",
  //     description:"Massage therapy is a manual method of treatment that helps restore movement and function of muscles and joints by improving circulation and eliminating metabolic toxins stored within muscles."  
  //   }
  // ];

  const dailyScheduleList = [
    {
      patientId: 1,
      dailyScheduleData: [
        {
          day: '2022-03-01',
          posts: [
            {
              id: 1,
              title: "6:00 AM",
              content: "Wakeup"
            },
            {
              id: 2,
              title: "7:00 AM",
              content: "Yoga"
            },
            {
              id: 3,
              title: "7:30 AM",
              content: "Laughter Therapy"
            },
            {
              id: 4,
              title: "8:30 AM",
              content: "Breakfast"
            },
            {
              id: 5,
              title: "10:00 AM",
              content: "Low Haemoglobin Therapy"
            },
            {
              id: 6,
              title: "12:00 PM",
              content: "Lunch"
            },
            {
              id: 7,
              title: "1:30 PM",
              content: "Sleep for Half Hour"
            },
            {
              id: 8,
              title: "4:30 PM",
              content: "Meditation for 15 minutes"
            }

          ]
        }
      ]
    },

    {
      patientId: 2,
      dailyScheduleData: [
        {
          day: '2022-03-01',
          posts: [
            {
              id: 1,
              title: "6:30 AM",
              content: "Wakeup"
            },
            {
              id: 2,
              title: "7:30 AM",
              content: "Yoga"
            },
            {
              id: 3,
              title: "8:00 AM",
              content: "Laughter Therapy"
            },
            {
              id: 4,
              title: "8:45 AM",
              content: "Breakfast"
            },
            {
              id: 5,
              title: "10:30 AM",
              content: "Low Haemoglobin Therapy"
            },
            {
              id: 6,
              title: "12:30 PM",
              content: "Lunch"
            },
            {
              id: 7,
              title: "2:00 PM",
              content: "Sleep for Half Hour"
            },
            {
              id: 8,
              title: "5:00 PM",
              content: "Meditation for 15 minutes"
            }

          ]
        }
      ]
    }

  ];

  useEffect(() => {
    if (props.person != null && props.person > 0) {
      setSelectedRecord(dailyScheduleList.filter(function (o) { return o.patientId == props.person; })[0]);//;personalData[props.person]);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.person]);

  useEffect(() => {
    if (selectedDate) {
      debugger;
      setSelectedDayWiseData(selectedRecord.dailyScheduleData.filter(function (o) { return o.day == getDBFormateDate(selectedDate); })[0]);


    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDayWiseData) {


      setContent(selectedDayWiseData.posts ? selectedDayWiseData.posts.map((post) =>
        <div key={post.id} style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ "width": "80px" }}><b>{post.title}</b></div>
          <div style={{ "width": "10px" }}> <b>:</b> </div>
          <p>{post.content}</p>
        </div>

      ) : "");



    }
    else {
      setContent("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDayWiseData]);

  return (
    <div style={{ display: "flex", flexDirection: "column", "margin-top": "10%" }}>
      <DatePicker
        variant="inline"
        defaultValue={selectedDate}
        margin="none"
        label="Daily Schedule of"
        onChange={(formedDate) => {

          setSelectedDate(formedDate);


        }}
        // error={
        //   validationList && validationList.formedDate
        //     ? validationList.formedDate
        //     : false
        // }
        errorMessage={"Date is Required"}
      />
      {/* {selectedDayWiseData &&   
             <Blog posts={selectedDayWiseData.posts} />
         } */}
      <div style={{ "padding-top": "5px" }}>
        {content}
      </div>
    </div>
  );
}
