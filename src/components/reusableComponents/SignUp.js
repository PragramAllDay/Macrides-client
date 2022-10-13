import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Header from "../reusableComponents/Header";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MaterialUIPickers from "./DatePicker";
import Button from "@mui/material/Button";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { setRegister, resetForm } from "../../reducers/RegisterInvestor";
import BasicDatePicker from "./DatePickerForNavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function BasicTextFields() {
  const BASE_URL = process.env.REACT_APP_API_REQUEST_URL;
  const labeled = { inputProps: { "aria-label": "Switch demo" } };
  const [valued, setValued] = React.useState(0);
  const { value } = useSelector((state) => state.register);
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobilenumber: "",
    role: "3",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValued(newValue);
  };

  const { register, handleSubmit, reset } = useForm();
  const handleDate = (date) => {
    dispatch(setRegister({ dateFrom: date }));
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      console.log(data);
      const response = await axios.post(`${BASE_URL}/api/auth/local/register`, {
        ...data,
        DOB: value.dateFrom,
      });
      const resp = await axios.get(
        `${BASE_URL}/api/users/${response.data.user.id}?populate=*`
      );
      console.log(resp);
      window.localStorage.setItem("jwt", response.data.jwt);
      window.localStorage.setItem("role", resp.data.role.name);
      window.localStorage.setItem("id", resp.data.id);
      window.localStorage.setItem("username", resp.data.username);
      dispatch(setRegister(resp.data));

      alert(
        "Registration Successful, an email has been sent to your mail. Please verify your email"
      );
      reset();
    } catch (error) {
      console.log(error);
      const res = await axios.get(`${BASE_URL}/api/users`);
      res.data.map((item) => {
        if (item.email === data.email) {
          alert("Email already exists");
        }
      });
      // if (data.email === res.data[0].email) {
      //   alert("Email already exists");
      // }
    }
  };

  const handleChangeTextField = (event) => {
    let { name, value } = event.target;
    setData({ ...data, [name]: value });
    dispatch(setRegister({ [name]: value }));
  };

  return (
    <>
      <Header />
      <h1
        className=" font-bold text-xl text-center #161614	 text-[30px] pt-40"
        sx={{ color: "#161614" }}
      >
        SIGNUP
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="form"
          sx={{
            // "& > :not(style)": { m: 1, width: "25ch" },

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
            columnGap: "20px",
          }}
          noValidate
          autoComplete="off"
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15%",
              width: "78%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              id="standard-basic"
              label="First Name*"
              name="firstName"
              variant="standard"
              sx={{ width: "35ch" }}
              onChange={handleChangeTextField}
              {...register("firstName", { required: true })}
              // fullWidth
            />
            <TextField
              id="standard-basic"
              label="Last Name*"
              name="lastName"
              variant="standard"
              sx={{ width: "35ch" }}
              onChange={handleChangeTextField}
              {...register("lastName", { required: true })}
              // fullWidth
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "15%",
              flexWrap: "wrap",
              width: "78%",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <TextField
              id="standard-basic"
              label="Mobile No*"
              name="mobilenumber"
              variant="standard"
              type={"number"}
              sx={{ width: "35ch" }}
              onChange={handleChangeTextField}
              {...register("mobilenumber", { required: true })}
              // fullWidth
            />
            <TextField
              id="standard-basic"
              label="Email Address*"
              name="email"
              variant="standard"
              type={"email"}
              sx={{ width: "35ch" }}
              onChange={handleChangeTextField}
              {...register("email", { required: true })}
              // fullWidth
            />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15%",
              width: "78%",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <TextField
              id="standard-basic"
              label="Password*"
              name="password"
              type={"password"}
              variant="standard"
              sx={{ width: "35ch" }}
              onChange={handleChangeTextField}
              {...register("password", { required: true })}
              // fullWidth
            />
            <TextField
              id="standard-basic"
              label="Confirm Password*"
              name="confirmPassword"
              type={"password"}
              variant="standard"
              sx={{ width: "35ch" }}
              onChange={handleChangeTextField}
              {...register("confirmPassword", { required: true })}
              // fullWidth
            />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "23%",
              width: "78%",
              justifyContent: "center",
              // marginLeft: "8%",
              marginTop: "20px",
            }}
          >
            <TextField
              id="standard-basic"
              label="username*"
              name="username"
              type={"text"}
              variant="standard"
              sx={{ width: "35ch" }}
              onChange={handleChangeTextField}
              {...register("username", { required: true })}
              // fullWidth
            />

            {/* <div className="pt-5">
            <h1>Gender:</h1>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={valued}
              onChange={handleChange}
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </div> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Date of Birth:</h1>
              <BasicDatePicker
                value={value.dateFrom}
                onChange={handleDate}
                sx={{ width: "35ch", marginRight: "1000px" }}
              />
            </div>
          </div>
          <div className="max-w-[800px] px-10">
            <p className="mt-5">
              <Switch sx={{ width: "70px" }} {...labeled} defaultChecked />I
              understand and agree that the use of this Website, Mobile Apps, AI
              and ALL other related Technology Platforms are subject to the
              Terms of Use and Privacy Policy.
            </p>
          </div>
        </Box>
        <div className="w-[100%] flex justify-center">
          <Button
            color="inherit"
            size="large"
            variant="text"
            type="submit"
            sx={{
              fontSize: "25px",
              fontWeight: "bold",

              mt: "5%",
              color: "white",
              backgroundColor: "#161614",
              minWidth: "20%",

              "&:hover": { backgroundColor: "#161614" },
            }}
          >
            <h1 className="text-white">SIGNUP</h1>
          </Button>
        </div>
      </form>
      <Footer />
    </>
  );
}
