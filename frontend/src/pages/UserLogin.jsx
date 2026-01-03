import React,{ useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";



const UserLogin = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [userData,setUserData] = useState({})
    const {user,setUser} = useContext(UserDataContext)
    const navigate = useNavigate()
    const submitHandler = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/login`,
          { email, password }
        );
  
        console.log("Login response:", response.data);
  
        const { token, user } = response.data;

        // ✅ save token so maps routes can work
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setUser(user);
        navigate("/home");
  
        setEmail("");
        setPassword("");
      } catch (err) {
        console.error("Login Error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Login failed. Please try again.");
      }
    };
    
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://www.freelogovectors.net/wp-content/uploads/2023/05/uber-logo-freelogovectors.net_.png"
          alt=""
        />

        <form onSubmit={(e)=>{
            submitHandler(e)
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
            className="border-none bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
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
            className="bg-[#eeeeee] border-none mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
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
