import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./InvestorsCars.css";
import SideBar from "../SideBarInvestor/Sidebar";
import Footer from "../Footer/Footer";
import { setResponseApproveCars } from "../../../reducers/ResponseApproveCars";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
const CarsForApproval = () => {
  const data = useSelector((state) => state.responseApproveCars.value);
  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_API_REQUEST_URL;
  useEffect(() => {
    const fetchCars = async () => {
      const investor_id = window.localStorage.getItem("user");
      try {
        const res = await axios.get(
          `${BASE_URL}/api/cars?populate=*&pagination[pageSize]=25&pagination[page]=1&filters[investor_id]=${investor_id}`
        );
        console.log(res);

        dispatch(setResponseApproveCars(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchCars();
  }, [dispatch]);

  console.log(data);
  const cars = data.data ? data.data : [];
  const id = data.data ? data.data : [];
  const status = data.data ? data.data : [];

  console.log(id);

  const handleClick = async (id) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/cars/${id}`, {
        data: {
          status: "1",
        },
      });
      console.log(cars);
      console.log(cars.filter((car) => car.id !== id));
      dispatch(setResponseApproveCars(cars.filter((car) => car.id !== id)));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-between h-[100vh]">
      <SideBar />
      {/* <div className="pt-40 ">
        <NavBar />
      </div> */}
      {/* <div className="pt-10 pl-10">
        <h1 className="font-bold pb-5">Search A Car</h1>
        <TextField
          id="standard-basic"
          label="Name of the Car"
          variant="outlined"
          sx={{ pt: "10px" }}
          // fullWidth
        /> */}
      {/* </div> */}
      <div className=" pt-10 flex flex-col space-y-20 items-center">
        {cars.length > 0 &&
          cars.map((car, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-between"
              >
                <div className="Carscontainer">
                  <img
                    src={`${BASE_URL}${car.attributes.exteriorCarImage.data.attributes.url}`}
                    // src="http://localhost:1337/uploads/admin_505e43c0fd.png"
                    alt=""
                    className="h-40 w-[50vh] md:h-50 md:w-[60vh] lg:h-60 lg:w-[70vh] "
                  />
                  <div className="flex flex-col items-center justify-between max-w-[600px]">
                    <div className="flex gap-5 flex-wrap">
                      <h1 className="font-black">
                        Name:
                        <span className="font-medium">
                          {car.attributes.title}
                        </span>
                      </h1>
                      <h1 className="font-black">
                        Price:{" "}
                        <span className="font-medium">
                          {car.attributes.price ? car.attributes.price : 0}
                        </span>
                      </h1>

                      <h3 className="font-black">
                        With Driver:{" "}
                        <span className="font-medium">
                          {car.attributes.driver_id.data
                            ? "Available"
                            : "No Driver"}
                        </span>
                      </h3>
                      <h3 className="font-black ">
                        Driver Name:{" "}
                        <span className="font-medium">
                          {car.attributes.driver_id.data
                            ? car.attributes.driver_id.data.attributes.firstName
                            : "No Driver"}
                        </span>
                      </h3>
                      <h3 className="font-black ">
                        Driver Number:{" "}
                        <span className="font-medium">
                          {car.attributes.driver_id.data &&
                            car.attributes.driver_id.data.attributes.phoneNo}
                        </span>
                      </h3>
                      <h3 className="font-black ">
                        Driver CNIC:{" "}
                        <span className="font-medium">
                          {car.attributes.driver_id.data &&
                            car.attributes.driver_id.data.attributes.CNIC}
                        </span>
                      </h3>
                    </div>
                    <div>
                      {/* <Button
                        color="inherit"
                        size="large"
                        variant="text"
                        onClick={() => handleClick(car.id)}
                        sx={{
                          fontSize: "25px",
                          fontWeight: "bold",
                          alignSelf: "center",
                          mt: "10%",
                          color: "white",
                          backgroundColor: "#060B26",
                          "&:hover": {
                            backgroundColor: "gray",
                            color: "#060B26",
                          },
                        }}
                        className="w-60 md:w-80 lg:w-96 xl:w-[100%]"
                      >
                        Approve
                      </Button> */}
                    </div>
                  </div>
                </div>
                <hr className="w-[100%] h-[20px]" />
              </div>
            );
          })}
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default CarsForApproval;
