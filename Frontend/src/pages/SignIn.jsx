import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "../context/AppContext";
import { API_URL } from "../api";
import { login } from "../Slices/UserSlices/LoginSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const redirect = "/";
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
    if(error){
      {
        // alert(error);
      }
    }
  }, [isAuthenticated, error]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  const onSubmit = (e) => {
    e.preventDefault();
    const args = { loginEmail, loginPassword };
    console.log(args);
    dispatch(login(args));
  };
  return (
    <div className="h-screen flex items-center ">
      <div></div>
      <form
        className="flex flex-col gap-5 max-w-md mx-auto border border-lightgray shadow- p-16 rounded-xl"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl text-lightred font-bold font-grotesk mx-auto">
          Sign In
        </h2>
        {/* Seprator */}
        <div className="h-px my-1 bg-black bg-opacity-50 border-0 w-full"></div>
        <label className="text-lightgray font-grotesk text-md font-bold flex-1">
          Username
          <input
            type="text"
            onChange={(e) => setLoginEmail(e.target.value)}
            className="border rounded w-full py-1 px-2 font-normal"
          />
        </label>
        <label className="text-lightgray font-grotesk text-md font-bold flex-1">
          Password
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </label>
        <span className="flex mx-auto">
          <button
            type="submit"
            className="text-lg bg-green-600 py-1 px-6 text-black font-semibold font-grotesk
					rounded-lg  hover:bg-green-700  hover:text-white"
          >
            Login
          </button>
        </span>
        <span className="flex max-sm:flex-col max-sm:items-center text-sm font-poppins mx-auto">
          Not Registered?{" "}
          <Link to="/register" className="font-semibold underline">
            Create an account here.
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
