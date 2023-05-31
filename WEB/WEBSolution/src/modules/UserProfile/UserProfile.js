import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import DialogControl from "../../components/core/Dialog";
import { getDisplayDate } from "../../Utils/DateTimeUtils.js";

export default function UserProfile(props) {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    getUserProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserProfileData = () => {
    props.getUserProfileData({
      onSuccess: (response) => {
        const { profileDetails } = response;
        setProfileData(profileDetails);
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

  return (
    <DialogControl
      dialogTitleText={`Profile`}
      dialogContent={
        <Grid container spacing={3}>
          <Grid item xs={12} md>
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{profileData.name}</td>
                </tr>
                <tr>
                  <td>Mobile Number</td>
                  <td>{profileData.mobileNumber}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{profileData.gender === 1 ? "Male" : profileData.gender === 2 ? "Female" : ""}</td>
                </tr>
                <tr>
                  <td>Father</td>
                  <td>{profileData.fatherName}</td>
                </tr>
                <tr>
                  <td>DOB</td>
                  <td>
                    {profileData.dob !== null
                      ? getDisplayDate(profileData.dob)
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>DOA</td>
                  <td>
                    {profileData.doa !== null
                      ? getDisplayDate(profileData.doa)
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{profileData.address}</td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>{profileData.countryName}</td>
                </tr>
                <tr>
                  <td>State</td>
                  <td>{profileData.stateName}</td>
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid item xs={12} md>
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <td>City</td>
                  <td>{profileData.cityName}</td>
                </tr>
                <tr>
                  <td>Pincode</td>
                  <td>{profileData.pinCode}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td style={{ whiteSpace: "break-spaces" }}>
                    {profileData.email}
                  </td>
                </tr>
                <tr>
                  <td>Designation</td>
                  <td>{profileData.designationCode}</td>
                </tr>
                <tr>
                  <td>Division</td>
                  <td>{profileData.divisionName}</td>
                </tr>
                <tr>
                  <td>Manager</td>
                  <td>{profileData.manager}</td>
                </tr>
                <tr>
                  <td>DOJ</td>
                  <td>
                    {profileData.doj !== null
                      ? getDisplayDate(profileData.doj)
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>DOC</td>
                  <td>
                    {profileData.doc !== null
                      ? getDisplayDate(profileData.doc)
                      : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
      }
      onCancel={() => {
        props.setProfileDialog(false);
      }}
      cancelAction={false}
      submitAction={false}
      maxWidth="md"
      fullWidth="true"
    />
  );
}
