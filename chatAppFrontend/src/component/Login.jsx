import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../services/loginSingupService";

const Login = () => {

    const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });




  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Connect with backend API later
    console.log("Login Data:", loginData);
    try{
        const response = await loginUser(loginData);
        console.log("Login response:", response);
        toast.success("Login successful!");
        navigate("/joinchat");
    }catch(error){
        console.log("Error during login:", error);
        toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="w-full max-w-sm bg-[#020617] p-8 rounded-xl shadow-xl border border-gray-800">

        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={loginData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#020617] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={loginData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#020617] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline cursor-pointer">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
