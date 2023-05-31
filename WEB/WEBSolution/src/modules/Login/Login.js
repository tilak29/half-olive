import React, { useState, useEffect } from "react";

import "./LoginStyle.css";
import logo from "../../Images/logohere.jpeg";
import userIcon from "../../Images/user-icon.svg";
import passwordIcon from "../../Images/password-icon.svg";
import loginArrow from "../../Images/loginArrow.svg";
import halfCircleImage from "../../Images/halfCircle.svg";
import groupImage from "../../Images/GroupImage.svg";
import circleImage from "../../Images/FullCircle.svg";

import Loading from "../../components/core/Loading";
import DisplayMessage from "../../components/core/DisplayMessage";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "../ChangePassword/ChangePasswordContainer";

/**
 * Login UI and API call
 * Note : Rendered fields from static json data
 * Calls refreshtoken saga on login success
 * @author Nirali Maradiya, Tejal Sali
 * @description In input maxlength is not working with number type  please not change type as number
 */

export default function Login(props) {
  const [loading, setLoading] = useState(false);
  const [openForgotPwdDialog, setForgotPwdDialog] = useState(false);
  const [openChangePwdDialog, setChangePwdDialog] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  // to save form data
  const [frmData, setFrmData] = useState({ userName: "", password: "" });
  const [frmDataError, setFrmDataError] = useState({
    userName: "",
    password: "",
  });

  useEffect(() => {
    if (props.isUserAuthorize) props.userLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (e) => {
    if (frmData.userName === "" || frmData.password === "") {
      if (frmData.userName === "") {
        frmDataError.userName = `User Name Required`;
        setFrmDataError({ ...frmDataError });
      }

      if (frmData.password === "") {
        frmDataError.password = `Password Required`;
        setFrmDataError({ ...frmDataError });
      }
    // } else if (
    //   frmData.userName !== "" &&
    //   frmData.userName.length !== 10
    // ) {
    //   setFrmDataError({
    //     ...frmDataError,
    //     mobileNumber: "Mobile number should be 10 digits",
    //   });
    } else {
      e.preventDefault();
      setLoading(true);

      props.userLogin({
        params: frmData,
        onSuccess: (response) => {
          debugger;
          setLoading(false);
          const { isChangePassword = 0 } = response;
          if (isChangePassword === 0) {
            //Forcefully change password on first login
            setChangePwdDialog(true);
          } else {
            props.callRefreshTokenSaga();
            // Code to redirect to the dashboard component
            const { history } = props;
            history.push("/dashboard");
          }
        },
        onFailure: ({ message: displayMessage }) => {
          setLoading(false);
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "error",
          });
        },
      });
    }
  };
  const forgotPassword = (e) => {
    e.preventDefault();
    setForgotPwdDialog(true);
  };
  function textChange(e) {
    if (e.target.id === "userName") {
      setFrmData({ ...frmData, userName: e.target.value });
      setFrmDataError({ ...frmDataError, userName: "" });
    } else {
      setFrmData({ ...frmData, password: e.target.value });
      setFrmDataError({ ...frmDataError, password: "" });
    }
  }

  function blurEvent(e) {
    // if (frmData.mobileNumber !== "" && frmData.mobileNumber.length !== 20) {
    //   setFrmDataError({
    //     ...frmDataError,
    //     mobileNumber: "User Name should be 20 digits",
    //   });
    // }
    if (e.target.id === "userName") {
      if (frmData.userName === "")
        setFrmDataError({
          ...frmDataError,
          userName: "User Name Required",
        });
    } else {
      if (frmData.password === "")
        setFrmDataError({ ...frmDataError, password: "Password Required" });
    }
  }

  return (
    <div>
      <div className="row col-md-12 mainDiv">
        {/*:: Start: First half of screen- Image */}
        <div
          className="d-none d-md-block col-md-6 imgContainer"
          style={{ height: window.innerHeight }}
        >
          <img className="fullCircle" alt="fullcircle" src={circleImage} />
          <img className="groupImage" alt="image1" src={groupImage} />
          <img
            className="halfCircleImage"
            alt="roundImage"
            src={halfCircleImage}
          />
        </div>
        {/*:: End: First half of screen- Image */}

        {/*:: Start: Second half of screen- Login Form */}
        <div
          className="col-md-6 loginContainer"
          style={{ height: window.innerHeight }}
        >
          <div className="logoContainer">
            <img className="logoContainer" src={logo} alt="" />
            <h2 className="formTitle">Welcome to [CompanyName here]!</h2>

            {/* separate TextInput component */}
            <div className="textInputMainDiv">
              <div className="textInputContainer">
                <div className="inputFieldIcon">
                  <img src={userIcon} alt={"User Name"} />
                </div>

                <div className="textInputInnerContainer">
                  <input
                    id={"userName"}
                    placeholder={"User Name"}
                    value={frmData.userName}
                    onChange={(e) => textChange(e)}
                    onBlur={(e) => {
                      blurEvent(e);
                    }}
                    // onKeyUp={(event) => {
                    //   if (event.keyCode === 13) login(event);
                    // }}
                    className="inputControl"
                    // onInput={(e) => {
                    //   e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    // }}
                    maxLength={20}
                  />
                </div>
              </div>
              {/* Display error message */}
              <div className="inputErrorMsg">
                {frmDataError.userName} &nbsp;
              </div>
            </div>

            <div className="textInputMainDiv">
              <div className="textInputContainer">
                <div className="inputFieldIcon">
                  <img src={passwordIcon} alt={"Password"} />
                </div>

                <div className="textInputInnerContainer">
                  <input
                    id={"password"}
                    type={"password"}
                    placeholder={"Password"}
                    value={frmData.password}
                    onChange={(e) => textChange(e)}
                    onBlur={(e) => {
                      blurEvent(e);
                    }}
                    onKeyUp={(event) => {
                      if (event.keyCode === 13) login(event);
                    }}
                    className="inputControl"
                    maxLength={10}
                  />
                </div>
              </div>
              {/* Display error message */}
              <div className="inputErrorMsg">
                {frmDataError.password} &nbsp;
              </div>
            </div>
            {/* separate TextInput component */}

            <div className="text-center mb-3">
              <button className="loginBtn" onClick={login}>
                Login &nbsp; <img src={loginArrow} alt={"Login"} />
              </button>
            </div>
            {/* Forgot Password */}
            <div className="text-center">
              <a
                href="http://localhost:3000/"
                onClick={(e) => forgotPassword(e)}
                className="linkStyle"
              >
                Forgot Password?
              </a>
            </div>
            {/* Forgot Password */}
          </div>
        </div>
        {/*:: End: Second half of screen- Login Form */}
      </div>
      {loading && <Loading />}
      {openForgotPwdDialog && (
        <ForgotPassword
          setForgotPwdDialog={setForgotPwdDialog}
          setDisplayMessage={setDisplayMessage}
          forgotPassword={props.forgotPassword}
        />
      )}
      {openChangePwdDialog && (
        <ChangePassword
          setChangePwdDialog={setChangePwdDialog}
          setDisplayMessage={setDisplayMessage}
        />
      )}
      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div>
  );
}
