import React from 'react'

const RidePopUp = (props) => {
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
      <h3 className="text-2xl font-semibold mb-5">New Ride Available</h3>
      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4 '>
        <div className='flex items-center gap-3 '>
            <img  className="h-12 w-10 rounded-full object-cover" src="https://i.pinimg.com/736x/be/a3/49/bea3491915571d34a026753f4a872000.jpg" alt="" />
            <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullName.firstname + " " + props.ride?.user.fullName.lastname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>
      <div className="gap-2 flex justify-between flex-col itens-center">
        
        <div className="w-full  ">
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props.ride?.pickup}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Sheridan College, Oakville
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props.ride?.destination}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Sheridan College, Oakville
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 mb-5" >
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">${props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className='flex w-full  items-center justify-between '>
        <button onClick={()=>{
            props.setRidePopUpPanel(false);
            
        }} className="  bg-gray-200 text-gray-700 font-semibold px-8 p-3 rounded-lg ">
          Ignore
        </button>
        <button onClick={()=>{
            props.setConfirmRidePopUpPanel(true);
            props.confirmRide()
            props.setWaitingForDriver(false);
            
        }} className=" bg-green-600 text-white font-semibold px-8 p-3 rounded-lg ">
          Accept
        </button>
        
        </div>
      </div>
    </div>
  )
}

export default RidePopUp
