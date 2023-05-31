import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from "react";
import Button from "../../../components/core/Button";
import DS from "./DailySchedule";
import HH from "./HealthHistoryScreen";
import PD from "./PersonalDetails";
import RB from "./RoomBooking";
import TM from "./Treatment";
import MP from "./MealPlan";
import TextField from "../../../components/core/TextField";

function TabPanel(props) {
  const { children, value, index, person, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

//For Patient-Name-Listing
export default function PatientList(props) {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [person, setPerson] = useState("");
  const [guestBookingStatus, setGuestBookingStatus] = useState("");
  const [personName, setPersonName] = useState("");
  const [displayMessage, setDisplayMessage] = useState({});
  const [searchGuest, setSearchGuest] = useState("");
  const [bookingStatus, setBookingStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bookingId,setBookingId] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getPatientName = () => {
    props.getPatientName({
      params: {
        searchName: searchGuest,
        checkedIn: bookingStatus
      },
      onSuccess: (response) => {
        const { patientList = [] } = response;
        const data = patientList.map((patient) => ({
          ...patient,
        }));
        setData(data);
        setLoading(false)
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
        setLoading(false)
      },
    });
  };
  useEffect(() => {
    getPatientName();
    props.closeDrawer();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setPerson(data[0].guestId)
      setGuestBookingStatus(data[0].bookingStatus)
      setPersonName(data[0].guestName)
      setBookingId(data[0].bookingId)
    }
  }, [data]);

  useEffect(() => {
    setLoading(true)
    getPatientName();
  }, [searchGuest, bookingStatus]);

  const bookingStatusFun = () => {
    if (bookingStatus) {
      setBookingStatus(false)
    } else {
      setBookingStatus(true)
    }
  }
  const SimpleList = () => (
    <div className='box-style'>

      {data.map(function (item, index) {
        return (
          <>
            <div className={item.guestId == person ? "button-active " : 'button-not-active'}>
              <Button label={item.guestName}
                onClick={() => {
                  setPerson(item.guestId)
                  setGuestBookingStatus(item.bookingStatus)
                  setPersonName(item.guestName)
                  setBookingId(item.bookingId)
                }}
              />
            </div>
          </>
        )
      })}

    </div>
  );

  return (
    <div className="card selection-card selection-card-two-columns mb-3" >
      <div style={{ display: "flex" }}>
        <div className='box-guest'>
          <TextField
            value={searchGuest}
            numeric={false}
            isAutoFocus={true}
            placeholder={bookingStatus ? "Search Guest" : "Search Others Guest"}
            onChange={(e) => {
              setSearchGuest(e.target.value);
            }}
          />
          <SimpleList />
          <h5 className='total-guest mt-1'>{bookingStatus ? 'Checked In :' : 'Others :'} {data.length}</h5>
          <Button
            disabled={loading ? true : false}
            label={bookingStatus ? "Others" : "Checked In"}
            className=""
            onClick={() => {
              bookingStatusFun()
            }}
          />
        </div>

        <Box sx={{ width: '100%' }} className="box-1">
          <Box sx={{ borderBottom: 1, borderColor: 'grey' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">

              <Tab label="Personal Details" />
              <Tab label="Booking History" />
              <Tab label="Health History" />
              <Tab label="Treatment" />
              <Tab label="Meal Plan" />
              <Tab label="Daily Schedule" />

            </Tabs>
          </Box>
          <TabPanel value={value} index={0} >
            <PD {...props} person={person} ></PD>
          </TabPanel>
          <TabPanel value={value} index={1} >
            <RB {...props} person={person} bookingStatus={guestBookingStatus} personName={personName} getPatientName={getPatientName} bookingId={bookingId}></RB>
          </TabPanel>
          <TabPanel value={value} index={2} >
            <HH {...props} person={person}></HH>
          </TabPanel>
          <TabPanel value={value} index={3} >
            <TM {...props} person={person} bookingStatus={guestBookingStatus} bookingId={bookingId}></TM>
          </TabPanel>
          <TabPanel value={value} index={4} >
            <MP {...props} person={person} bookingStatus={guestBookingStatus} bookingId={bookingId}></MP>
          </TabPanel>
          <TabPanel value={value} index={5} >
            <DS {...props} person={person}></DS>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}