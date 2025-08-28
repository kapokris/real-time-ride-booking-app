import React from 'react'
import { Routes , Route } from 'react-router-dom'

import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import Captainsignup from './pages/Captainsignup'
import Start from './pages/Start'
import Home from './pages/Home'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'



const App = () => {
  
  return (
    <div> 
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/captain-login' element={<Captainlogin/>} />
        <Route path='/captain-signup' element={<Captainsignup/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/user/logout' element={<UserLogout/>} />
        <Route path='/captain-home' element={<CaptainHome/>} />
      </Routes>
    </div>
  )
}

export default App
