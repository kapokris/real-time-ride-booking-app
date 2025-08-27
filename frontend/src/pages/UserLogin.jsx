import React,{ useState } from "react";
import { Link } from "react-router-dom";


const UserLogin = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [userData,setUserData] = useState({})
    const sumbmitHandler = (e)=>{
        e.preventDefault()
        setUserData({
            email:email,
            password:password
        })

        console.log(userData)
        setEmail("")
        setPassword('')
    }
    
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://www.freelogovectors.net/wp-content/uploads/2023/05/uber-logo-freelogovectors.net_.png"
          alt=""
        />

        <form onSubmit={(e)=>{
            sumbmitHandler(e)
        }}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)

            }}
            required
            placeholder="email@example.com"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
          />
          <h3 className="text-lg font-medium mb-2"> Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)

            }}
            required
            placeholder="password"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
          />
          <button className="bg-[#111] text-white mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base ">
            Login
          </button>
         
          
        </form>
        <p className="text-center">New here? <Link to="/signup" className="text-blue-600">Create New Account</Link> </p>
      </div>
      <div>
        <Link to="/captain-login" className="flex items-center justify-center bg-[#10b461] text-white mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base ">Sign in as Captain</Link>
      </div>
    </div>
  );
};

export default UserLogin;
