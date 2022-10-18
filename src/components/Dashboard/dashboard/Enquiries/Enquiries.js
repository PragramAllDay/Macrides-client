import React, { useEffect } from "react";
import SideBar from "../../SidebarForAdmin/SidebarAdmin";
import Footer from "../../Footer/Footer";
import axios from "axios";
import { setEnquiries } from "../../../../reducers/Enquiries";
import { useDispatch, useSelector } from "react-redux";

const Enquiries = () => {
  const BASE_URL = process.env.REACT_APP_API_REQUEST_URL;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.enquiries.value);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/corporate-enquiries?populate=*`
        );
        dispatch(setEnquiries(res.data));
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEnquiries();
  }, []);
  const enquiries = data.data ? data.data : [];

  return (
    <>
      <div className="h-[100vh]">
        <div>
          <SideBar />
        </div>
        <div className=" flex justify-center">
          <h1 className="font-extrabold text-4xl text-center mt-5">
            Enquiries
            {enquiries.length > 0 &&
              enquiries.map((enq, index) => {
                return (
                  <div key={index} className="flex flex-col mt-10">
                    <div className="flex gap-10">
                      <h6 className="text-[15px]">Enq#.{index}</h6>
                      <div className="flex justify-center">
                        <div className="flex gap-x-5 flex-wrap w-[150px] md:w-[400px] lg:w-[500px] xl:w-[600px]">
                          <h6 className="text-[15px] md:text-[18px] lg:text-[18px] xl:text-[18px]">
                            Name:{" "}
                            <span className="text-[15px]  md:text-[15px] lg:text-[18px] xl:text-[18px] font-thin">
                              {enq.attributes.Name}
                            </span>
                          </h6>
                          <h6 className="text-[15px] md:text-[18px] lg:text-[18px] xl:text-[18px]">
                            E-mail:{" "}
                            <span className="text-[15px]  md:text-[15px] lg:text-[18px] xl:text-[18px] font-thin">
                              {enq.attributes.email}
                            </span>
                          </h6>
                          <h6 className="text-[15px] md:text-[18px] lg:text-[18px] xl:text-[18px]">
                            Phone Number:{" "}
                            <span className="text-[15px]  md:text-[15px] lg:text-[18px] xl:text-[18px] font-thin">
                              {enq.attributes.phoneNo}
                            </span>
                          </h6>
                          <h6 className="text-[15px] md:text-[18px] lg:text-[18px] xl:text-[18px]">
                            Location:{" "}
                            <span className="text-[15px]  md:text-[15px] lg:text-[18px] xl:text-[18px] font-thin">
                              {enq.attributes.location}
                            </span>
                          </h6>
                          <h6 className="text-[15px] md:text-[18px] lg:text-[18px] xl:text-[18px]">
                            No of Cars:{" "}
                            <span className="text-[15px]  md:text-[15px] lg:text-[18px] xl:text-[18px] font-thin">
                              {enq.attributes.noOfCars}
                            </span>
                          </h6>
                          <h6 className="text-[15px] md:text-[18px] lg:text-[18px] xl:text-[18px]">
                            No of Days:{" "}
                            <span className="text-[15px]  md:text-[15px] lg:text-[18px] xl:text-[18px] font-thin">
                              {enq.attributes.noOfDays}
                            </span>
                          </h6>
                          <h6 className="text-[15px] md:text-[18px] lg:text-[18px] xl:text-[18px]">
                            Purpose Of enquiry:{" "}
                            <span className="text-[15px]  md:text-[15px] lg:text-[18px] xl:text-[18px] font-thin">
                              {enq.attributes.purposeOfEnquiry}
                            </span>
                          </h6>
                          <h6 className="text-[15px] md:text-[18px] lg:text-[18px] xl:text-[18px]">
                            Message:{" "}
                            <span className="text-[15px]  md:text-[15px] lg:text-[18px] xl:text-[18px] font-thin">
                              {enq.attributes.message}
                            </span>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <hr className="mx-auto mt-5 mb-5 " />
                  </div>
                );
              })}
          </h1>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </>
  );
};

export default Enquiries;
