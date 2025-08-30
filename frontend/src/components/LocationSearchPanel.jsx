import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "1430 Trafalgar Road, Oakville, Ontario",
    "123 Main Street, Toronto, Ontario",
    "456 Queen Street, Vancouver, British Columbia",
    "789 King Street, Montreal, Quebec",
  ];
  return (
    <div>
      {locations.map((elem,idx) => {
        return (
          <div
          key={idx}
           onClick={()=>{
            props.setVehiclePanel(true);
            props.setPanelOpen(false);

          }} className="flex items-center p-3 border-gray-50 rounded-lg active:border-black border-2 my-2  gap-4 justify-start">
            <h2 className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill "></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
