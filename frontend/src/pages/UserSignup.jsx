import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";


import  {UserDataContext}  from "../context/UserContext";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData,setUserData] = useState({})
  const navigate = useNavigate()

  const {user,setUser} = React.useContext(UserDataContext)

  const sumbmitHandler = async (e) => {
    e.preventDefault();
    const newUser={
        fullName:{
            firstname:firstName,
            lastname:lastName
        },
        email:email,
        password:password,
        
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser) 
    if(response.status===201){
        const data = response.data
        setUser(data.user)

        navigate("/home")
        
    }


    console.log(userData);
    setEmail("");
    setFirstName("")
    setLastName("")
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://www.freelogovectors.net/wp-content/uploads/2023/05/uber-logo-freelogovectors.net_.png"
          alt=""
        />
        <h3 className="text-base font-medium mb-2">What's your Name</h3>
        <div className="flex gap-4">
          <input
            type="text"
            required
            value={firstName}
            onChange={(e)=>{
                setFirstName(e.target.value)
            }}
            placeholder="First Name"
            className="bg-[#eeeeee] border-none mb-7 rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm "
          />
          <input
            type="text"
            required
            value={lastName}
            onChange={(e)=>{
                setLastName(e.target.value)
            }}
            placeholder="Last name"
            className="bg-[#eeeeee] mb-7 border-none rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm  "
          />
        </div>
        <form
          onSubmit={(e) => {
            sumbmitHandler(e);
          }}
        >
          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            type="email"
            required
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            placeholder="email@example.com"
            className="bg-[#eeeeee] border-none mb-7 rounded px-4 py-2 border w-full text-base placeholder:text-sm  "
          />
          <h3 className="text-base font-medium mb-2"> Password</h3>
          <input
            type="password"
            required
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            placeholder="password"
            className="bg-[#eeeeee] border-none mb-7 rounded px-4 py-2 border w-full text-base placeholder:text-sm  "
          />
          <button className="bg-[#111] text-white mb-3 rounded px-4 py-2  w-full text-base placeholder:text-sm  ">
            Create an Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>{" "}
        </p>
      </div>
      <div>
        <p className="text-[10px] text-gray-600 text-center mt-4">
          By proceeding, you agree to Uber’s{" "}
          <a href="/terms" className="text-blue-600">
            Terms of Service
          </a>{" "}
          and acknowledge the{" "}
          <a href="/privacy" className="text-blue-600">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
