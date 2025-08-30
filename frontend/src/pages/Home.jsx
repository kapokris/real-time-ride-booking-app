import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);

  // set initial positions
  useGSAP(() => {
    gsap.set(panelRef.current, { height: "0%" });
    gsap.set(vehiclePanelRef.current, { y: "100%" }); // hidden below
  }, []);

  // animate location search panel
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 25,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [panelOpen]);

  // animate vehicle panel
  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        y: "0%",
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        y: "0%",
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [confirmRidePanel]);
  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        y: "0%",
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        y: "0%",
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [waitingForDriver]);

  const submitHandler = (e) => {
    e.preventDefault();
    setPanelOpen(false);
    setVehiclePanel(true); // open vehicle panel after submit
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Logo */}
      <img
        className="w-16 absolute left-5 top-5"
        src="https://www.freelogovectors.net/wp-content/uploads/2023/05/uber-logo-freelogovectors.net_.png"
        alt="Uber Logo"
      />

      {/* Background map */}
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>

      {/* Search Panel */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] relative bg-white p-5">
          <h5
            onClick={() => setPanelOpen(false)}
            className="absolute right-6 top-6 text-2xl cursor-pointer"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>

          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 rounded-full top-[45%] left-[10%] bg-black"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        {/* Expanding location search panel */}
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 w-full bg-white py-10 pt-14 px-3 z-10 shadow-lg rounded-t-2xl"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed bottom-0 w-full bg-white py-10 pt-14 px-3 z-10 shadow-lg rounded-t-2xl"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed bottom-0 w-full bg-white  py-10 pt-14 px-3 z-10 shadow-lg rounded-t-2xl"
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed bottom-0 w-full bg-white  py-10 pt-14 px-3 z-10 shadow-lg rounded-t-2xl"
      >
        <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
