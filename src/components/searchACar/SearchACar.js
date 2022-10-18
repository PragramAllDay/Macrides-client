import React from "react";
import Header from "../reusableComponents/Header";
import { Cars } from "./SearchACarData";

import NavBar from "./SearcACarNav";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setResponseApproveCars } from "../../reducers/ResponseApproveCars";
import Footer from "../reusableComponents/Footer";
import { setBookedCar } from "../../reducers/Checkout";

const SearchACar = () => {
  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_API_REQUEST_URL;
  const data = useSelector((state) => state.responseApproveCars.value);

  const handleClick = (id, attributes) => {
    dispatch(setBookedCar({ attributes, id }));
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/cars?populate=*&filters[status][$eq]=1&filters[booking_status][$eq]=0&pagination[pageSize]=25&pagination[page]=1`
        );
        dispatch(setResponseApproveCars(res.data));
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCars();
  }, []);
  const cars = data.data ? data.data : [];
  const id = data.data ? data.data : [];

  return (
    <div className="flex flex-col h-[100vh]">
      <Header />
      <div className="pt-40 ">
        <NavBar />
      </div>
      <div className="pt-10 pl-10">
        <h1 className="font-bold pb-5">Search A Car</h1>
        <TextField
          id="standard-basic"
          label="Name of the Car"
          variant="outlined"
          sx={{ pt: "10px" }}
          // fullWidth
        />
      </div>
      <div className=" pt-10 flex flex-col space-y-20 items-center">
        {cars.length > 0 &&
          cars.map((car, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <div className="displayContainer">
                  <img
                    src={`${car.attributes.exteriorCarImage.data.attributes.url}`}
                    // src="http://localhost:1337/uploads/admin_505e43c0fd.png"
                    alt=""
                    className="h-40 w-[50vh] md:h-50 md:w-[60vh] lg:h-60 lg:w-[70vh] "
                  />
                  <div className="flex flex-col items-center flex-wrap max-w-[500px] ">
                    <div className="flex gap-5 flex-wrap">
                      <h1 className="font-black">
                        Name:
                        <span className="font-medium ">
                          {car.attributes.title}
                        </span>
                      </h1>
                      <h1 className="font-black ">
                        Price:{" "}
                        <span className="font-medium ">
                          {car.attributes.price ? car.attributes.price : 0}
                        </span>
                      </h1>

                      <h3 className="font-black ">
                        With Driver:{" "}
                        <span className="font-medium text-[18px]">
                          {car.attributes.driver_id.data
                            ? "Available"
                            : "No Driver"}
                        </span>
                      </h3>
                      <h3 className="font-black ">
                        Driver Name:{" "}
                        <span className="font-medium ">
                          {car.attributes.driver_id.data
                            ? car.attributes.driver_id.data.attributes.name
                            : "No Driver"}
                        </span>
                      </h3>
                      <h3 className="font-black">
                        Driver Number:{" "}
                        <span className="font-medium ">
                          {car.attributes.driver_id.data &&
                            car.attributes.driver_id.data.attributes.phoneNo}
                        </span>
                      </h3>
                      <h3 className="font-black ">
                        Driver CNIC:{" "}
                        <span className="font-medium ">
                          {car.attributes.driver_id.data &&
                            car.attributes.driver_id.data.attributes.CNIC}
                        </span>
                      </h3>
                    </div>
                    <div>
                      <Link to="/check-out">
                        <Button
                          color="inherit"
                          size="large"
                          variant="text"
                          onClick={() => handleClick(car.id, car.attributes)}
                          sx={{
                            fontWeight: "bold",
                            alignSelf: "center",
                            fontSize: "20px",
                            mt: "50%",
                            color: "black",
                            backgroundColor: "#D9EB3D",
                            "&:hover": {
                              backgroundColor: "black",
                              color: "#D9EB3D",
                            },
                          }}
                          className="w-30 md:w-40 lg:w-89 xl:w-100 text-[10px] md:text-[15px] lg:text-[20px] xl:text-[30px]"
                        >
                          Book Now
                        </Button>
                      </Link>
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

export default SearchACar;
