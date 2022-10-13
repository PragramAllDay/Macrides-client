import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import "./SearchNav.css";
import BasicDatePicker from "../reusableComponents/DatePickerForNavBar";
import ResponsiveTimePickers from "../reusableComponents/Timer";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import { useDispatch } from "react-redux";
import { setRentalServiceType } from "../../reducers/RentalServiceType";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = () => {
  const dispatch = useDispatch();
  const ariaLabel = { "aria-label": "description" };
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [selectedValue, setSelectedValue] = React.useState("a");
  const { duration, dateFrom, location, time } = useSelector(
    (state) => state.rentalType.value
  );
  console.log(duration, dateFrom, location);

  const handleChange = (event) => {
    let { name, value } = event.target;
    dispatch(setRentalServiceType({ [name]: value }));
  };

  const handleDateChange = (date) => {
    dispatch(setRentalServiceType({ dateFrom: date }));
  };
  const handleTimeChange = (time) => {
    console.log(time);
    //get the time from day js time
    // const HH = time.format("HH");
    // const mm = time.format("mm");
    // const timetosendtoapi = `${HH}:${mm}`;
    dispatch(setRentalServiceType({ time: time }));
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (!location) {
      setOpen(true);
    } else if (!dateFrom) {
      setOpen(true);
    } else if (!time) {
      setOpen(true);
    } else if (!duration) {
      setOpen(true);
    } else {
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <div className="NavBarContainerSearch">
        <div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
            noValidate
            autoComplete="off"
          >
            <Input
              placeholder="Enter Pick-Up Location *"
              inputProps={ariaLabel}
              fullWidth
              value={location}
              name="location"
              onChange={handleChange}
              variant="filled"
            />
          </Box>
        </div>
        <div className="">
          <div className="flex flex-wrap justify-center">
            <div className="flex flex-wrap gap-10 justify-center">
              <BasicDatePicker
                fullWidth={false}
                value={dateFrom}
                onChange={handleDateChange}
              />
              <ResponsiveTimePickers value={time} onChange={handleTimeChange} />
              <div className="flex flex-wrap items-center">
                <div className="flex items-center">
                  <Radio
                    checked={duration === "Full Day"}
                    onChange={handleChange}
                    value="Full Day"
                    name="duration"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <p className="text-xs">FULL DAY</p>
                </div>
                <div className="flex items-center">
                  <Radio
                    checked={duration === "Short Rental"}
                    onChange={handleChange}
                    value="Short Rental"
                    name="duration"
                    inputProps={{ "aria-label": "B" }}
                  />
                  <p className="text-xs">SHORT RENTAL</p>
                </div>
                <div className="flex items-center">
                  <Radio
                    checked={duration === "Self Drive"}
                    onChange={handleChange}
                    value="Self Drive"
                    name="duration"
                    inputProps={{ "aria-label": "C" }}
                  />
                  <p className="text-xs">SELF DRIVE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button
            color="inherit"
            onClick={handleClick}
            sx={{
              backgroundColor: "#161616",
              height: "50px",
              color: "white",
              borderRadius: "0",
              "&:hover": { backgroundColor: "#161614" },
            }}
          >
            Book Now
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Please fill all the fields"
            action={action}
          />
        </div>
      </div>
    </>
  );
};

export default NavBar;
