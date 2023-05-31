import React, { useEffect, useState } from "react";

import { getDisplayDate } from "../../Utils/DateTimeUtils.js";
import { Typography } from "@material-ui/core";

import CakeIcon from "../../Images/cakeIcon.svg";
import EmailIcon from "../../Images/sms.svg";

/**
 * Display Birthdays of Chemists on Dashboard
 * @author Tejal Sali
 */
export default function DashboardChemistBirthdayList(props) {
  const [birthdayList, setBirthdayList] = useState([]);

  useEffect(() => {
    getDashboardChemistBirthdayList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDashboardChemistBirthdayList = () => {
    props.getDashboardChemistBirthdayList({
      onSuccess: (response) => {
        const { birthdayList = [] } = response;
        setBirthdayList(birthdayList);
      },
      onFailure: ({ message }) => {
        props.setDisplayMessage({
          open: true,
          displayMessage: message,
          severity: "error",
        });
      },
    });
  };

  const sendSms = (mobileNumber) => {
    const params = {
      code: "ChemistBirthday",
      mobileNumber: mobileNumber,
    };

    props.sendSms({
      params,
      onSuccess: (response) => {
        // const {} = response;
        props.setDisplayMessage({
          open: true,
          displayMessage: "SMS has been sent !!",
          severity: "success",
        });
      },
      onFailure: ({ message }) => {
        props.setDisplayMessage({
          open: true,
          displayMessage: message,
          severity: "error",
        });
      },
    });
  };

  // const getInitials = name => {
  //   let initials = "";
  //   name.split(" ").map(subName => (initials = initials + subName[0]));
  //   return initials;
  // };

  return (
    <div className="card">
      <Typography variant="h6" element="h6">
        Chemist Birthdays
      </Typography>
      {birthdayList.length === 0 ? (
        <div className="alert mt-3 bg-light alert-secondary">
          No records to display
        </div>
      ) : (
          <div className="birthday-container">
            {birthdayList.map((record, index) => (
              <div
                className="birthday-wrapper d-flex justify-content-between align-items-center"
                key={index}
              >
                <div className="d-flex align-items-center">
                  {/* <div className="birthday-image-wrapper">
              <div className="birthday-initials-icon">
                {getInitials(record.chemistName)}
              </div>
            </div> */}
                  <div className="birthday-text-block">
                    <div>{record.chemistName}</div>
                    <div className="align-items-center d-flex">
                      <img
                        src={CakeIcon}
                        className="birthday-icon"
                        alt={"Birthday Icon"}
                      />
                      <span className="birthday-date">
                        {getDisplayDate(record.dob)}
                      </span>
                    </div>
                  </div>
                </div>
                {props.isAdmin && (
                  <div className="d-flex">
                    <a
                      href="#/dashboard"
                      className="mr-3"
                      onClick={() => sendSms(record.mobile)}
                    >
                      <img src={EmailIcon} alt="Email Icon" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
