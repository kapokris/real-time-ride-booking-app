import React from 'react'
import {useContext} from 'react'
import { CaptainDataContext } from '../context/CaptainContext';

const CapatinDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  if (!captain || !captain.fullName) {
    return (
      <div className="p-4">
        <p className="text-gray-600">Loading captain details...</p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-3">
            <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt="" />
            <h4 className="text-lg capitalize font-medium">{captain.fullName.firstname +" "+ captain.fullName.lastname}</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">$45.50</h4>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex p-5 mt-6 bg-gray-100 rounded-xl items-start gap-5 justify-center " >
          <div className="text-center">
            <i className="text-3xl mb-2 font-extralight ri-timer-2-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-extralight ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center"  >
            <i className="text-3xl mb-2 font-extralight ri-booklet-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
        </div>
    </div>
  )
}

export default CapatinDetails
