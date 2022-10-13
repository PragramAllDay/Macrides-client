import React from "react";
import Header from "../reusableComponents/Header";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import ReactReadMoreReadLess from "react-read-more-read-less";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Footer from "../reusableComponents/Footer";
import BasicDatePicker from "../reusableComponents/DatePickerForNavBar";
import TimePickers from "./DropOffTimer";
import DatePickerDropOff from "./DropOffDate";
import ResponsiveTimePickers from "../reusableComponents/Timer";
import { setRentalServiceType } from "../../reducers/RentalServiceType";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setBookedCar } from "../../reducers/Checkout";
import { useEffect } from "react";
import { Radio } from "@mui/material";
import "./checkout.css";
import { useNavigate } from "react-router-dom";
import { setDropOff } from "../../reducers/Dropoff";
import axios from "axios";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function RegisterYourCar({ handleClose }) {
  const [additionalPickup, setAdditionalPickup] = React.useState("");
  const [additionalDropOff, setAdditionalDropOff] = React.useState("");
  const [TextFieldValue, setTextFieldValue] = React.useState({});
  const theme = useTheme();
  const dispatch = useDispatch();
  const [dropOffDate, setDropOffDate] = React.useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  );
  const [dropOffTime, setDropOffTime] = React.useState(new Date());
  const dropoff = useSelector((state) => state.dropoff.value);
  const bookedCar = useSelector((state) => state?.bookedCar);
  const BASE_URL = process.env.REACT_APP_API_REQUEST_URL;
  const navigate = useNavigate();
  const { duration, dateFrom, time } = useSelector(
    (state) => state?.rentalType?.value
  );
  const rentalType = useSelector((state) => state?.rentalType);
  useEffect(() => {
    console.log(!bookedCar.value.id);
    if (!bookedCar?.value?.attributes) {
      console.log("bookedCar.value.id", bookedCar.value.id);
      navigate("/search-a-car");
    }
  }, [bookedCar.value.attributes]);
  console.log("bookedCar", bookedCar);
  // console.log(exteriorCarImage);
  const handleChangeTypes = (event) => {
    let { name, value } = event.target;
    dispatch(setRentalServiceType({ [name]: value }));
  };

  console.log(time);
  const RentalServiceType = useSelector((state) => state?.rentalType);

  const [hours, setHours] = React.useState("");
  const handleChangeMenue = (event) => {
    setHours(event.target.value);
  };

  const [value, setValue] = React.useState(0);
  const labeled = { inputProps: { "aria-label": "Switch demo" } };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [labelState, setLabelState] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTimeFrom = (time) => {
    setTextFieldValue({ ...TextFieldValue, time: time });

    dispatch(setRentalServiceType({ time: time }));
  };
  const handleTimeFromDropOff = (time) => {
    // setTextFieldValue({ ...TextFieldValue, time: time });
    setDropOffTime(time);
    dispatch(setDropOff({ DropOfftime: time }));
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleDateFrom = (date) => {
    setTextFieldValue({ ...TextFieldValue, dateFrom: date });
    dispatch(setRentalServiceType({ dateFrom: date }));
  };
  const handleDateFromDropOff = (date) => {
    // setTextFieldValue({ ...TextFieldValue, dateFrom: date });
    setDropOffDate(date);
    dispatch(setDropOff({ Dropoff: date }));
  };
  // console.log(TextFieldValue);

  const handleClick = (event) => {
    setValue(1);
    let { name, value } = event.target;
    setTextFieldValue({ ...TextFieldValue, [name]: value });
    dispatch(setRentalServiceType({ TextFieldValue }));
  };
  const handleClick2 = (event) => {
    setValue(2);
    let { name, value } = event.target;
    setTextFieldValue({ ...TextFieldValue, [name]: value });
    dispatch(setRentalServiceType({ TextFieldValue }));
  };
  const handleClickBack2 = (event) => {
    setValue(0);
  };
  const handleClick3 = (event) => {
    setValue(3);
    // let { name, value } = event.target;
    // setTextFieldValue({ ...TextFieldValue, [name]: value });
    // dispatch(setRentalServiceType({ TextFieldValue }));
  };
  const handleClickBack3 = (event) => {
    setValue(1);
  };
  const handleClickBack4 = (event) => {
    setValue(2);
  };
  const handleClick4 = async () => {
    if (labelState) {
      // get date from dropoff.value.dropoff
      // get time from dropoff.value.dropofftime
      // create new date from dropoff.value.dropoff and dropoff.value.dropofftime
      let Drop_Off_Time_Date = new Date(dropoff.Dropoff);
      Drop_Off_Time_Date.setHours(new Date(dropoff.DropOfftime).getHours());
      Drop_Off_Time_Date.setMinutes(new Date(dropoff.DropOfftime).getMinutes());
      let Pick_Up_Time_Date = new Date(dateFrom);
      Pick_Up_Time_Date.setHours(new Date(time).getHours());
      Pick_Up_Time_Date.setMinutes(new Date(time).getMinutes());
      const { TextFieldValue } = rentalType.value;
      const data = {
        Drop_Off_Time_Date,
        Pick_Up_Time_Date,
        car_id: bookedCar.value.id,
        ...TextFieldValue,
        price: bookedCar.value.attributes.price,
      };
      try {
        const response = await axios.post(`${BASE_URL}/api/bookings`, {
          data,
        });
        alert(
          "Booking Successful, Please check your email To get the booking details and take picture of the payment reciept and send it to the macrides.info@gmail.com"
        );
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message);
        }
        console.log(err);
      }
    } else {
      alert("Please Accept Terms & Conditions");
    }
  };

  // console.log(TextFieldValue);

  const handleChangeFields = (event) => {
    let { name, value } = event.target;
    setTextFieldValue({ ...TextFieldValue, [name]: value });
    // dispatch(setRentalServiceType({ [name]: value }));
  };

  return (
    <div>
      <Header />
      <Box
        sx={{ bgcolor: "background.paper", height: "100%" }}
        className="pt-40"
      >
        <AppBar position="static" sx={{ backgroundColor: "#D9EB3D" }}>
          <Tabs
            value={value}
            // onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              label="1-Pick-Up"
              {...a11yProps(0)}
              sx={{ color: "black", fontWeight: "600" }}
            />
            <Tab
              label="2-Drop-Off"
              {...a11yProps(1)}
              sx={{ color: "black", fontWeight: "600" }}
            />
            <Tab
              label="3-Base Rental"
              {...a11yProps(2)}
              sx={{ color: "black", fontWeight: "600" }}
            />
            <Tab
              label="4-Confirm"
              {...a11yProps(3)}
              sx={{ color: "black", fontWeight: "600" }}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={0} index={0} dir={theme.direction}>
            <div className="flex flex-col items-center">
              <h1 className="pb-10">
                You are using<span className="font-bold">{duration}</span>
              </h1>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <label>Enter Pick-up Date:</label>
                  <BasicDatePicker value={dateFrom} onChange={handleDateFrom} />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Enter Pick-Up Time</label>
                  <ResponsiveTimePickers
                    value={time}
                    onChange={handleTimeFrom}
                  />
                </div>

                <TextField
                  id="outlined-basic"
                  label="Pick-Up Location"
                  variant="outlined"
                  name="Pick_Up_Location"
                  onChange={handleChangeFields}
                />
                <TextField
                  id="outlined-basic"
                  label="Your name"
                  variant="outlined"
                  name="user_name"
                  onChange={handleChangeFields}
                />
                <TextField
                  id="outlined-basic"
                  label="Your email"
                  variant="outlined"
                  name="user_email"
                  onChange={handleChangeFields}
                />
                <TextField
                  id="outlined-basic"
                  label="Your phone"
                  variant="outlined"
                  name="user_phoneno"
                  type="number"
                  onChange={handleChangeFields}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Additional Pick-Up Description"
                  multiline
                  rows={2}
                  name="Additional_Pick_Up_Description"
                  className="w-[80%] md:w-[500px] lg:w-[600px] xl:w-[550px] 2xl:w-[800px]"
                  onChange={handleChangeFields}
                />
              </div>
              <Button
                color="inherit"
                size="large"
                variant="text"
                onClick={handleClick}
                sx={{
                  fontSize: "25px",
                  fontWeight: "bold",

                  mt: "5%",
                  color: "black",
                  backgroundColor: "#D9EB3D",
                  width: "12%",
                  minWidth: "160px",
                  "&:hover": { backgroundColor: "black", color: "#D9EB3D" },
                }}
              >
                Next
              </Button>
            </div>
          </TabPanel>
          <TabPanel value={1} index={1} dir={theme.direction}>
            <div className="flex flex-col items-center pt-10 gap-8">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <label>Enter Drop-Off Date:</label>
                  <DatePickerDropOff
                    value={dropOffDate}
                    onChange={handleDateFromDropOff}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Enter Drop-Off Time</label>
                  <TimePickers
                    value={dropOffTime}
                    onChange={handleTimeFromDropOff}
                  />
                </div>
                <TextField
                  id="outlined-basic"
                  label="Drop-Off Location"
                  variant="outlined"
                  name="Drop_Off_Location"
                  onChange={handleChangeFields}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Additional Drop-Off Description"
                  multiline
                  rows={2}
                  className=" w-[300px] md:w-[500px] lg:w-[600px] xl:w-[650px] 2xl:w-[800px]"
                  name="Additional_Drop_Off_Description"
                  onChange={handleChangeFields}
                />
              </div>
              <div className="flex flex-wrap gap-[20px]">
                <Button
                  color="inherit"
                  size="large"
                  variant="text"
                  onClick={handleClickBack2}
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",

                    mt: "5%",
                    color: "black",
                    backgroundColor: "#D9EB3D",
                    // width: "12%",
                    minWidth: "160px",
                    "&:hover": { backgroundColor: "black", color: "#D9EB3D" },
                  }}
                >
                  Go Back
                </Button>

                <Button
                  color="inherit"
                  size="large"
                  variant="text"
                  onClick={handleClick2}
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",

                    mt: "5%",
                    color: "black",
                    backgroundColor: "#D9EB3D",
                    // width: "12%",
                    minWidth: "160px",
                    "&:hover": { backgroundColor: "black", color: "#D9EB3D" },
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={2} index={2} dir={theme.direction}>
            <div className="flex flex-col items-center">
              <div className="flex gap-20 justify-center flex-wrap">
                <div className="flex flex-col gap-5 items-start ">
                  <div className="flex gap-20 flex-wrap">
                    <div className="flex flex-col gap-5">
                      <h1 className="font-bold"> Pick-Up </h1>
                      <p>{TextFieldValue.Pick_Up_Location}</p>
                      <br />
                      <p>{dateFrom}</p>
                      {/* <span>{time}</span> */}
                    </div>
                    <div className="flex flex-col gap-5">
                      <h1 className="font-bold"> Drop-Off </h1>
                      <p>{TextFieldValue.Drop_Off_Location}</p>
                    </div>
                  </div>
                  <div className="flex items-center flex-wrap">
                    <h1 className="font-bold text-xl">Booking Type:</h1>
                    <div className="flex items-center">
                      <Radio
                        checked={duration === "Full Day"}
                        onChange={handleChangeTypes}
                        value="Full Day"
                        name="duration"
                        inputProps={{ "aria-label": "A" }}
                      />
                      <p className="text-xs">FULL DAY</p>
                    </div>
                    <div className="flex items-center">
                      <Radio
                        checked={duration === "Short Rental"}
                        onChange={handleChangeTypes}
                        value="Short Rental"
                        name="duration"
                        inputProps={{ "aria-label": "B" }}
                      />
                      <p className="text-xs">SHORT RENTAL</p>
                    </div>
                    <div className="flex items-center">
                      <Radio
                        checked={duration === "Self Drive"}
                        onChange={handleChangeTypes}
                        value="Self Drive"
                        name="duration"
                        inputProps={{ "aria-label": "C" }}
                      />
                      <p className="text-xs">SELF DRIVE</p>
                    </div>
                  </div>
                  <div className="flex gap-20 flex-wrap">
                    <img
                      src={`${BASE_URL}${bookedCar.value?.attributes?.exteriorCarImage?.data?.attributes?.url}`}
                      alt=""
                      style={{ width: "300px", height: "200px" }}
                    />
                    <div className="flex flex-col gap-3">
                      <h1 className="font-bold text-[20px]">
                        {bookedCar?.value?.title}
                      </h1>
                      <h1>
                        {bookedCar?.value?.driver_id?.data
                          ? "(With Driver)"
                          : "Without Driver"}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="verticalLine"></div>
                <div>
                  <div className="flex flex-col gap-8 w-[200px] md:w-[300px] lg:w-[400px] xl:[500px] ">
                    <div className="flex justify-between">
                      <h1 className="">Rate /day</h1>
                      <h1> {bookedCar?.value?.attributes?.price}</h1>
                    </div>
                    <h1 className="">Fuel /Kilometer</h1>
                    <h1 className="">Base Fare</h1>
                    <h1 className="">Overtime /hour</h1>
                    <h1 className="">No. of days</h1>
                    <div className="flex justify-between">
                      <h1>Amount Payable</h1>
                      <h1> {bookedCar?.value?.attributes?.price}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-[20px]">
                <Button
                  color="inherit"
                  size="large"
                  variant="text"
                  onClick={handleClickBack3}
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",

                    mt: "5%",
                    color: "black",
                    backgroundColor: "#D9EB3D",
                    // width: "12%",
                    minWidth: "160px",
                    "&:hover": { backgroundColor: "black", color: "#D9EB3D" },
                  }}
                >
                  Go Back
                </Button>
                <Button
                  color="inherit"
                  size="large"
                  variant="text"
                  onClick={handleClick3}
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",

                    mt: "5%",
                    color: "black",
                    backgroundColor: "#D9EB3D",
                    // width: "12%",
                    minWidth: "160px",
                    "&:hover": { backgroundColor: "black", color: "#D9EB3D" },
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={3} index={3} dir={theme.direction}>
            <div className="flex flex-col items-center">
              <div className="flex justify-center mt-[10%] w-[200px] md:w-[400px] lg:w-[600px] xl:w-[700px]">
                <h1>
                  <Checkbox
                    {...label}
                    onChange={() => {
                      setLabelState(!labelState);
                    }}
                  />
                  “Kindly note that the Fuel Charges and Overtime will be
                  applied based on the mileage of the car and extra hours of the
                  services (if any).Your final invoice will be generated after
                  adding the Fuel and Overtime charges at the end of your
                  reservation. For more details please read the Fuel and
                  Overtime charges and terms of use.”
                </h1>
              </div>
              <div className="flex flex-wrap gap-[20px]">
                <Button
                  color="inherit"
                  size="large"
                  variant="text"
                  onClick={handleClickBack4}
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",

                    mt: "5%",
                    color: "black",
                    backgroundColor: "#D9EB3D",
                    // width: "12%",
                    minWidth: "160px",
                    "&:hover": { backgroundColor: "black", color: "#D9EB3D" },
                  }}
                >
                  Go Back
                </Button>
                <Button
                  color="inherit"
                  size="large"
                  variant="text"
                  onClick={handleClick4}
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",

                    mt: "5%",
                    color: "black",
                    backgroundColor: "#D9EB3D",
                    // width: "12%",
                    minWidth: "160px",
                    "&:hover": { backgroundColor: "black", color: "#D9EB3D" },
                  }}
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
      <div className="pt-10">
        <Footer />
      </div>
    </div>
  );
}
