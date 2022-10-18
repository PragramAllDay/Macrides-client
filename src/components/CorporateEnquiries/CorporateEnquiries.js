import React from "react";
import Header from "../reusableComponents/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Footer from "../reusableComponents/Footer";
import axios from "axios";
import { useForm } from "react-hook-form";

const CorporateEnquiries = () => {
  const [enquiry, setEnquiry] = React.useState({});
  const BASE_URL = process.env.REACT_APP_API_REQUEST_URL;
  const { register, handleSubmit, reset } = useForm();

  const handleChange = (e) => {
    setEnquiry({ ...enquiry, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        `${BASE_URL}
/api/corporate-enquiries`,
        { data: { ...data } }
      );
      console.log(resp);
      if (resp.status === 200) {
        alert("Enquiry submitted successfully, we will get back to you soon");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="flex flex-col"
            style={{ margin: "0 auto", padding: "0 50px" }}
          >
            <h1 className="font-bold text-[20px] md:text-[23px] lg:[25px] xl:text-[30px] pt-20 md:pt-30 lg:pt-40 xl:pt-50">
              CORPORATE ENQUIRIES
            </h1>
            <br />
            <h3>
              Please fill out the form below and our representatives will be in
              touch with you shortly
            </h3>

            <div className="flex flex-wrap gap-8 pt-8">
              <TextField
                id="standard-basic"
                label="Name*"
                name="Name"
                value={enquiry.Name}
                variant="standard"
                onChange={handleChange}
                type={"text"}
                sx={{ width: "35ch" }}
                {...register("Name", { required: true })}
                // fullWidth
              />
              <TextField
                id="standard-basic"
                label="Email Address*"
                value={enquiry.email}
                onChange={handleChange}
                name="email"
                variant="standard"
                type={"email"}
                sx={{ width: "35ch" }}
                {...register("email", { required: true })}
                // fullWidth
              />
            </div>
            <div className="flex flex-wrap gap-8 pt-8">
              <TextField
                id="standard-basic"
                label="Phone*"
                onChange={handleChange}
                name="phoneNo"
                value={enquiry.phoneNo}
                variant="standard"
                type={"number"}
                sx={{ width: "35ch" }}
                {...register("phoneNo", { required: true })}
                // fullWidth
              />
              <TextField
                id="standard-basic"
                label="Location*"
                onChange={handleChange}
                name="location"
                value={enquiry.location}
                variant="standard"
                type={"text"}
                sx={{ width: "35ch" }}
                {...register("location", { required: true })}
                // fullWidth
              />
            </div>
            <div className="flex flex-wrap gap-8 pt-8">
              <TextField
                id="standard-basic"
                label="No of Cars*"
                onChange={handleChange}
                name="noOfCars"
                value={enquiry.noOfCars}
                variant="standard"
                type={"number"}
                sx={{ width: "35ch" }}
                {...register("noOfCars", { required: true })}
                // fullWidth
              />
              <TextField
                id="standard-basic"
                label="No of Days*"
                onChange={handleChange}
                name="noOfDays"
                value={enquiry.noOfDays}
                variant="standard"
                type={"number"}
                sx={{ width: "35ch" }}
                {...register("noOfDays", { required: true })}
                // fullWidth
              />
            </div>
            <div className="pt-10">
              <TextField
                id="outlined-multiline-static"
                label="Purpose of enquiry"
                onChange={handleChange}
                name="purposeOfEnquiry"
                value={enquiry.purposeOfEnquiry}
                multiline
                rows={1}
                className="w-[80%] md:w-[500px] lg:w-[600px] xl:w-[550px] 2xl:w-[800px]"
                {...register("purposeOfEnquiry", { required: true })}
              />
            </div>
            <div className="pt-10">
              <TextField
                id="outlined-multiline-static"
                label="Message"
                onChange={handleChange}
                name="message"
                value={enquiry.message}
                multiline
                rows={4}
                className="w-[80%] md:w-[500px] lg:w-[600px] xl:w-[550px] 2xl:w-[800px]"
                {...register("message", { required: true })}
              />
            </div>
            <Button
              color="inherit"
              size="large"
              variant="text"
              type="submit"
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                alignSelf: "center",
                mt: "5%",
                color: "white",
                backgroundColor: "#161614",
                width: "15%",
                minWidth: "200px",
                "&:hover": { backgroundColor: "#161614" },
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>

      <div className="pt-10">
        <Footer />
      </div>
    </div>
  );
};

export default CorporateEnquiries;
