import React, { useCallback, useEffect } from "react";
// import Header from "../reusableComponents/Header";
// import NavBar from "./SearcACarNav";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./confirmBooking.css";
import SideBar from "../../SidebarForAdmin/SidebarAdmin";
import Footer from "../../Footer/Footer";
import { setConfirmBooking } from "../../../../reducers/ConfirmBooking";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const ConfirmBooking = () => {
  const BASE_URL = process.env.REACT_APP_API_REQUEST_URL;
  const data = useSelector((state) => state.confirmBooking.value);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/bookings?populate=*&pagination[pageSize]=25&pagination[page]=1&filters[booking_status][$eq]=false`
        );
        console.log(res);

        dispatch(setConfirmBooking(res.data));
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
  // const handleClick = useCallback(
  //   async (id) => {
  //     try {
  //       const res = await axios.put(`http://localhost:1337/api/cars/${id}`, {
  //         data: {
  //           status: "1",
  //         },
  //       });
  //       console.log(cars);
  //       console.log(cars.filter((car) => car.id !== id));
  //       dispatch(setResponseApproveCars(cars.filter((car) => car.id !== id)));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   [dispatch]
  // );

  const handleClick = async (id, attributes, carData) => {
    const CAR_ID = carData.id;
    try {
      const res = await axios.put(`${BASE_URL}/api/bookings/${id}`, {
        data: {
          booking_status: true,
        },
      });

      dispatch(
        setConfirmBooking({
          ...data,
          data: cars.filter((car) => car.id !== id),
        })
      );

      const response = await axios.put(`${BASE_URL}/api/cars/${CAR_ID}`, {
        data: {
          booking_status: "1",
        },
      });
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
                className="flex flex-col items-center justify-center"
              >
                <div className="displayContainer">
                  <div className="flex flex-col items-center flex-wrap max-w-[500px] ">
                    <div className="flex gap-5 flex-wrap">
                      <h1 className="font-black">
                        Invoice ID:
                        <span className="font-medium ">{car.id}</span>
                      </h1>
                      <h1 className="font-black">
                        Name:
                        <span className="font-medium ">
                          {car.attributes.car_id.data.attributes.title}
                        </span>
                      </h1>
                      <h1 className="font-black ">
                        Price:{" "}
                        <span className="font-medium ">
                          {car.attributes.price ? car.attributes.price : 0}
                        </span>
                      </h1>

                      <h3 className="font-black ">
                        Pick Up Location:{" "}
                        <span className="font-medium text-[18px]">
                          {car.attributes.Pick_Up_Location}
                        </span>
                      </h3>
                      <h3 className="font-black ">
                        Drop off Location:{" "}
                        <span className="font-medium ">
                          {car.attributes.Drop_Off_Location}
                        </span>
                      </h3>
                      <h3 className="font-black">
                        Customer Name:{" "}
                        <span className="font-medium ">
                          {car.attributes.user_name}
                        </span>
                      </h3>
                      <h3 className="font-black ">
                        Customer Phone No.:{" "}
                        <span className="font-medium ">
                          {car.attributes.user_phoneno}
                        </span>
                      </h3>
                    </div>
                    <div>
                      <Button
                        color="inherit"
                        size="large"
                        variant="text"
                        onClick={() =>
                          handleClick(
                            car.id,
                            car.attributes,
                            car.attributes.car_id.data
                          )
                        }
                        sx={{
                          fontWeight: "bold",
                          alignSelf: "center",
                          fontSize: "15px",
                          mt: "80%",
                          color: "black",
                          maxWidth: "200px",
                          backgroundColor: "#D9EB3D",
                          "&:hover": {
                            backgroundColor: "black",
                            color: "#D9EB3D",
                          },
                        }}
                      >
                        Confirm Booking
                      </Button>
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

export default ConfirmBooking;
