import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const ConfirmRidePopUp = (props) => {
    const [otp,setOtp]=useState("")
    const navigate=useNavigate();
    const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: { rideId: props.ride?._id, otp },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      props.setConfirmRidePopUpPanel(false);
      props.setRidePopUpPanel(false);
      navigate("/captain-riding", { state: { ride: props.ride } });
    }
  } catch (err) {
    console.log("❌ start-ride failed:", err?.response?.data || err.message);
    alert(err?.response?.data?.error || "Invalid OTP / Start ride failed");
  }
};

  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="ri-arrow-down-wide-line text-3xl"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to start
      </h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4 ">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-10 rounded-full object-cover"
            src="https://i.pinimg.com/736x/be/a3/49/bea3491915571d34a026753f4a872000.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">{props.ride?.user.fullName.firstname + " " + props.ride?.user.fullName.lastname}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="gap-2 flex justify-between flex-col items-center">
        <div className="w-full  ">
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">1430, Trafalgar Road</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">1430, Trafalgar Road</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 mb-5">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">${props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <form onSubmit={submitHandler}>
            <input
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
              type="text" placeholder="Enter OTP"
              className="bg-[#eee] px-6 py-4 text-base font-mono rounded-lg w-full mt-5"
            />
            <button
            type="submit"
            onClick={() => {
                props.setConfirmRidePopUpPanel(false);
                props.setRidePopUpPanel(false);
              }}

              
              className="mt-7 w-full flex justify-center   bg-green-600 text-white font-semibold p-2 rounded-lg "
            >
              Confirm
            </button>
            <button
            type="submit"
              onClick={() => {
                props.setConfirmRidePopUpPanel(false);
                props.setRidePopUpPanel(false);
              }}
              className="mt-2 w-full  bg-red-600 text-white font-semibold p-2 rounded-lg "
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
