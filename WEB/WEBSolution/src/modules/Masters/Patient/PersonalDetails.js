import React, { useEffect, useState } from "react";
import MaleImage from "../../../Images/malegreen.jpeg";

//For Patient-Details-Listing

export default function EPF(props) {

  const [data, setData] = useState([]);
  const [displayMessage, setDisplayMessage] = useState({});

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  let GuestId = props.person;
  const getPersonalDetails = () => {
    const params = {
      GuestId,
    };
    props.getPersonalDetails({
      params,
      onSuccess: (response) => {
        const { patientDetailList = [] } = response;
        const data = patientDetailList.map((details) => ({
          ...details,
        }));
        setData(data);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };
  useEffect(() => {
    if (props.person != null && props.person > 0) {
      getPersonalDetails();
    }
  }, [props.person]);

  return (
    <div>
      {data != "" &&
        <div style={{ display: "flex", flexDirection: "row", "margin-top": "10%" }}>
          <div style={{ display: "flex", flexDirection: "column", "width": "350px" }}>
            <div>
              Name : {data[0].guestName}
            </div>
            <div style={{ "padding-top": "20px" }}>
              Address : {data[0].address}
            </div>
            <div style={{ "padding-top": "20px" }}>
              City : {data[0].cityName}
            </div>
            <div style={{ "padding-top": "20px" }}>
              State : {data[0].stateName}
            </div>
            <div style={{ "padding-top": "20px" }}>
              Country : {data[0].countryName}
            </div>
            <div style={{ "padding-top": "20px" }}>
              Phone : {data[0].mobileNumber}
            </div>
            <div style={{ "padding-top": "20px" }}>
              Email : {data[0].email}
            </div>
          </div>
          <div style={{ "padding-left": "200px" }}>
            <img height="200" width="200" src={MaleImage} alt="new" />
          </div>
        </div>
      }
    </div>
  );
}