import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./reducers/RentalServiceType";
import userReducer2 from "./reducers/DashboardForm";
import userReducer3 from "./reducers/Role";
import userReducer4 from "./reducers/RegisterInvestor";
import userReducer5 from "./reducers/RegisterCar";
import userReducer6 from "./reducers/RegisterCarForm2";
import userReducer7 from "./reducers/RegisterCarImages";
import userReducer8 from "./reducers/RegisterImagesDriver";
import userReducer9 from "./reducers/ResponseApproveCars";
import userReducer10 from "./reducers/Checkout";
import userReducer11 from "./reducers/Dropoff";
import userReducer12 from "./reducers/ConfirmBooking";
import userReducer13 from "./reducers/Enquiries";

const store = configureStore({
  reducer: {
    rentalType: userReducer,
    login: userReducer2,
    Role: userReducer3,
    register: userReducer4,
    registerCar: userReducer5,
    registerCarform2: userReducer6,
    registerCarform2Images: userReducer7,
    registerImagesDriver: userReducer8,
    responseApproveCars: userReducer9,
    bookedCar: userReducer10,
    dropoff: userReducer11,
    confirmBooking: userReducer12,
    enquiries: userReducer13,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
