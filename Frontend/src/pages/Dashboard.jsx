import React, { useEffect, useState } from "react";
import { API_URL } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate(); 
  const { user, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const fetchUserData = async () => {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    setUserData(data.user);
    console.log(data.user);
  };
  if (!isAuthenticated) {
    
    return   <h1 className="text-3xl font-bold font-grotesk text-lightgreen max-sm:text-3xl">
    Please Login To Continue
  </h1>
  }

  return (
    <div className="flex flex-col gap-10 mt-5  mb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-grotesk text-lightred max-sm:text-3xl">
          Dashboard Page
        </h1>
        <p className="font-poppins text-lg max-sm:text-base">
          Central hub displaying registered content details for efficient
          access, tracking, and management by authorized users.
        </p>
        {/* Seprator */}
        <div className="h-px my-1 bg-black border-[1px] w-full"></div>
      </div>

      <div className="flex flex-col items-start max-sm:items-center gap-5 p-10 border border-lightgray rounded-lg">
        {/* Heading */}
        <h2 className="text-xl font-grotesk text-black font-semibold">
          User Information
        </h2>
        {/* Seprator */}
        <div className="h-px my-1 bg-lightgray bg-opacity-50 border-0 w-full"></div>
        <div className="flex max-sm:flex-col gap-10 items-start ">
          {/* User Profile */}
          <div className="flex flex-col gap-1 items-start">
            <img
              className="bg-gray-300 h-40 rounded-xl w-40 object-cover object-center "
              src={user.avatar}
            />
            <p className="text-sm font-grotesk text-red-600">*user avatar</p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-start">
            <p className="text-xl capitalize ">
              <span className="capitalize text-lightgray font-grotesk font-bold text-xl">
                Username:
              </span>{" "}
              {user.displayName}
            </p>
            <p className="text-xl">
              <span className="capitalize text-lightgray font-grotesk font-bold text-xl">
                Email:
              </span>{" "}
              {user.email}
            </p>
            <p className="text-xl">
              <span className="capitalize text-lightgray font-grotesk font-bold text-xl">
                Phone Number:
              </span>{" "}
              {user.phoneNumber}
            </p>
            <p className="text-xl">
              <span className="capitalize text-lightgray font-grotesk font-bold text-xl">
                Role:
              </span>{" "}
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
