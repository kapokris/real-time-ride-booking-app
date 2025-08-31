import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
      <Link to='/home' className="right-2 top-2 fixed h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-30"
            src="data:image/jpeg;base64,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"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">Krishna</h2>
            <h4 className="text-xl -mt-1 -mb-1 font-semibold">DEPK 7548</h4>
            <p className="text-sm text-gray-600">Toyota Camry</p>
          </div>
        </div>
        <div className="gap-2 flex justify-between flex-col itens-center">
          <div className="w-full  ">
            
            <div className="flex items-center gap-5 p-2 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">1430, Trafalgar Road</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  Sheridan College, Oakville
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-2 ">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">$22.54</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full  bg-green-600 text-white font-semibold p-2 rounded-lg ">Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;
