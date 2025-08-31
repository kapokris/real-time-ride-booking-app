import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
    const [finishRidePanel, setfinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
    useGSAP(() => {
        if (finishRidePanel) {
          gsap.to(finishRidePanelRef.current, {
            height: "70%",
            padding: 25,
            duration: 0.5,
            ease: "power3.out",
          });
        } else {
          gsap.to(finishRidePanelRef.current, {
            height: "0%",
            padding: 0,
            duration: 0.5,
            ease: "power3.in",
          });
        }
      }, [finishRidePanel]);
  return (
    <div className="h-screen">
      <div className="fixed p-4 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://www.freelogovectors.net/wp-content/uploads/2023/05/uber-logo-freelogovectors.net_.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>
      <div className="h-1/5 flex items-center justify-between relative p-6 bg-yellow-400">
        <h5
          onClick={() => {}}
          className="p-1 text-center w-[95%] p-2 absolute top-0"
        >
          <i className="ri-arrow-down-wide-line text-3xl"></i>
        </h5>
        <h4 className="text-xl font-semibold ">4 KM away</h4>
        <button onClick={()=>[setfinishRidePanel(true)]
        } className=" bg-green-600 text-white font-semibold px-8 p-3 rounded-lg ">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed bottom-0  w-full h-screen bg-white py-10 pt-14 px-3 z-10 shadow-lg rounded-t-2xl"
      >
        <FinishRide setfinishRidePanel={setfinishRidePanel} />
      </div>

    </div>
  );
};

export default CaptainRiding;
