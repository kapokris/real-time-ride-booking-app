import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CapatinDetails from "../components/CapatinDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext.jsx";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import axios from "axios";
import setWaitingForDriver from "../components/VehiclePanel.jsx";

const CaptainHome = () => {
  const [ride, setRide] = useState(null);
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  /* ===========================
     JOIN SOCKET + LOCATION
  ============================ */
  useEffect(() => {
    if (!socket || !captain?._id) return;

    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("update-location-captain", {
          userId: captain._id,
          location: {
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    };

    updateLocation();
    const interval = setInterval(updateLocation, 5000);

    return () => clearInterval(interval);
  }, [socket, captain?._id]);

  /* ===========================
     RECEIVE NEW RIDE
  ============================ */
  useEffect(() => {
    if (!socket) return;

    const onNewRide = (data) => {
      console.log("🚗 NEW RIDE:", data);
      setRide(data);
      setRidePopUpPanel(true);
    };

    socket.on("new-ride", onNewRide);

    return () => {
      socket.off("new-ride", onNewRide);
    };
  }, [socket]);

  /* ===========================
     CONFIRM RIDE
  ============================ */
  const confirmRide = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      { rideId: ride?._id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  /* ===========================
     ANIMATIONS
  ============================ */
  useGSAP(() => {
    gsap.to(ridePopUpPanelRef.current, {
      y: ridePopUpPanel ? "0%" : "100%",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [ridePopUpPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopUpPanelRef.current, {
      y: confirmRidePopUpPanel ? "0%" : "100%",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [confirmRidePopUpPanel]);

  /* ===========================
     UI
  ============================ */
  return (
    <div className="h-screen">
      <div className="fixed p-4 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://www.freelogovectors.net/wp-content/uploads/2023/05/uber-logo-freelogovectors.net_.png"
          alt=""
        />
        <Link
          to="/captain-login"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map"
        />
      </div>

      <div className="h-2/5 p-6">
        <CapatinDetails />
      </div>

      {/* RIDE POPUP */}
      <div
        ref={ridePopUpPanelRef}
        className="fixed bottom-0 w-full bg-white py-10 pt-14 px-3 z-10 rounded-t-2xl"
      >
        <RidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
          confirmRide={confirmRide}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>

      {/* CONFIRM POPUP */}
      <div
        ref={confirmRidePopUpPanelRef}
        className="fixed bottom-0 w-full h-screen bg-white py-10 pt-14 px-3 z-10 rounded-t-2xl"
      >
        <ConfirmRidePopUp
        ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
