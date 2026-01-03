import React, { useState, useRef } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {useNavigate} from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import LiveTracking from "../components/LiveTracking.jsx";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext.jsx";
import { useEffect, useContext } from "react";
import { UserDataContext } from "../context/UserContext.jsx";
const Home = () => {
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride,setRide]=useState(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const navigate=useNavigate();

  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);

  const passenger = user;
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);

  const token = localStorage.getItem("token"); // JWT token

  useEffect(() => {
    if (!socket || !user?._id) return;
    socket.emit("join", { userType: "user", userId: user._id });
  }, [socket, user?._id]);
  useEffect(() => {
    if (!socket) return;

    const onRideConfirmed = (ride) => {
  setRide(ride);

  setVehicleFound(false);
  setWaitingForDriver(false);

  // show the correct UI
  setVehicleFound(true);
};


    socket.on("ride-confirmed", onRideConfirmed);

    return () => {
      socket.off("ride-confirmed", onRideConfirmed);
    };
  }, [socket]);

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);

    if (value.length > 2) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setPickupSuggestions([]);
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${token}`, // send JWT here
            },
          }
        );

        // Make sure you get the predictions array
        setPickupSuggestions(
          Array.isArray(response.data)
            ? response.data
            : response.data.predictions || []
        );
      } catch (err) {
        console.error("Error fetching pickup suggestions:", err);
      }
    } else {
      setPickupSuggestions([]);
    }
  };
  socket.on("ride-started", (ride) => {
    
    navigate("/riding", { state: { ride } });
  });

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);

    if (value.length > 2) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setPickupSuggestions([]);
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDestinationSuggestions(
          Array.isArray(response.data)
            ? response.data
            : response.data.predictions || []
        );
      } catch (err) {
        console.error("Error fetching destination suggestions:", err);
      }
    } else {
      setDestinationSuggestions([]);
    }
  };

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

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);

    setFare(response.data);
  }
  async function createRide(selectedType) {
  try {
    const token = localStorage.getItem("token");

    const typeToSend = selectedType || vehicleType;

    // ✅ stop if anything missing
    if (!pickup?.trim() || !destination?.trim() || !typeToSend) {
      alert("Pickup, Destination, and Vehicle Type are required");
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      { pickup, destination, vehicleType: typeToSend },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("✅ ride created:", response.data);

    // ✅ only after success, show next panel
    setVehiclePanel(false);
    setVehicleFound(true); // or setWaitingForDriver(true) if that's your UI flow

  } catch (err) {
    console.log("❌ createRide error:", err?.response?.data || err.message);
    alert(err?.response?.data?.error || "Ride create failed");
  }
}

 
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
        <LiveTracking />
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
              type="text"
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              placeholder="Add a pick-up location"
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
            />
            <input
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              placeholder="Enter your destination"
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>

        {/* Expanding location search panel */}
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            panelRef={panelRef}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            activeField={activeField}
            setPickup={setPickup}
            setDestination={setDestination}
          />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 w-full bg-white py-10 pt-14 px-3 z-10 shadow-lg rounded-t-2xl"
      >
        <VehiclePanel
          selectVehicle={setVehicleType}
          setWaitingForDriver={setWaitingForDriver}
          createRide={createRide}
          fare={fare}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed bottom-0 w-full bg-white py-10 pt-14 px-3 z-10 shadow-lg rounded-t-2xl"
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          passenger={passenger}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          waitingForDriver={waitingForDriver}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed bottom-0 w-full bg-white  py-10 pt-14 px-3 z-10 shadow-lg rounded-t-2xl"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          ride ={ride}
          vehicleType={vehicleType}
          createRide={createRide}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed bottom-0 w-full bg-white  py-10 pt-14 px-3 z-10 shadow-lg rounded-t-2xl"
      >
        <WaitingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
