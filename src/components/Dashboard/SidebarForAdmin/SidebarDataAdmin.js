import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Approve Cars",
    path: "/cars-for-approval",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Confirm Booking",
    path: "/confirm-booking",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  // {
  //   title: "Team",
  //   path: "/team",
  //   icon: <IoIcons.IoMdPeople />,
  //   cName: "nav-text",
  // },
  {
    title: "Enquiries",
    path: "/enquiries",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Approved Cars",
    path: "/approved-cars",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
];
