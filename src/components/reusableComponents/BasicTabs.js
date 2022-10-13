import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../../reducers/DashboardForm";
import { useNavigate } from "react-router-dom";
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

export default function FullWidthTabs({ handleClose }) {
  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_API_REQUEST_URL;
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState({
    identifier: "",
    password: "",
  });
  const [investorData, setInvestorData] = React.useState({
    role: "Investor",
    identifier: "",
    password: "",
  });
  const { jwt } = useSelector((state) => state.login.value);
  // const { role } = useSelector((state) => state.Role.value);

  // if (data) {
  //   navigate("/admin-panel");
  // }

  //admin REQUEST
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.identifier === "" || data.password === "") {
      alert("Please fill all the fields");
    } else {
      try {
        const response = await axios.post(`${BASE_URL}/api/auth/local`, data);
        dispatch(setLogin(response.data));
        console.log(response);
        if (response.data.user.confirmed === false) {
          alert("Please confirm your email address");
        } else {
          navigate("/dashboard");
        }
        window.localStorage.setItem("jwt", response.data.jwt);
        window.localStorage.setItem("username", response.data.user.username);
        window.localStorage.setItem("user", response.data.user.id);
        handleClose();
      } catch (error) {
        console.log(error);
        alert("Invalid Credentials");
      }
    }
  };

  const handleChangeTextField = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeTextFieldInvestor = (e) => {
    setInvestorData({ ...investorData, [e.target.name]: e.target.value });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  // console.log(role);

  return (
    <div sx={{ bgcolor: "background.paper", height: "100%" }}>
      <AppBar position="static" sx={{ backgroundColor: "#161614" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Investor" {...a11yProps(0)} />
          <Tab label="Admin" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={0} index={0} dir={theme.direction}>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              name="identifier"
              fullWidth
              variant="outlined"
              onChange={handleChangeTextField}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              name="password"
              fullWidth
              variant="outlined"
              onChange={handleChangeTextField}
            />
            <Button
              color="inherit"
              size="large"
              variant="text"
              type="submit"
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                ml: "25%",
                mt: "5%",
                color: "white",
                backgroundColor: "#161614",
                width: "50%",
                "&:hover": { backgroundColor: "#161614" },
              }}
            >
              LOGIN
            </Button>
            <h3 className="font-thin text-center mt-5">
              Don't have an account?
              <Link to="/sign-up">
                <span className="text-purple-600"> Sign Up</span>
              </Link>
            </h3>
          </form>
        </TabPanel>
        <TabPanel value={1} index={1} dir={theme.direction}>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              name="identifier"
              onChange={handleChangeTextField}
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              name="password"
              onChange={handleChangeTextField}
              fullWidth
              variant="outlined"
            />

            <Button
              color="inherit"
              size="large"
              variant="text"
              type="submit"
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                ml: "25%",
                mt: "5%",
                color: "white",
                backgroundColor: "#161614",
                width: "50%",
                "&:hover": { backgroundColor: "#161614" },
              }}
            >
              LOGIN
            </Button>
          </form>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
