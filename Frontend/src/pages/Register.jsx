import { useForm } from "react-hook-form";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../Slices/UserSlices/LoginSlice";
import SignUp from "../assets/Sign_Up.svg";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    userName: "",
    phoneNumber: "",
  });

  //   const { displayName, email, password, userName, phoneNumber } = user;

  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
const redirect="/";
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [isAuthenticated, redirect]);
  const registerSubmit = (e) => {
    e.preventDefault();

    dispatch(
      register({ displayName, email, password, userName, phoneNumber, avatar })
    );
  };

  const registerDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        console.log("je;;p");
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // const roleType = ["buyer", "seller"];
  // const typeWatch = watch("type");
  return (
    <form className="flex flex-col gap-5 " onSubmit={registerSubmit}>
      <div className="gap-2 flex flex-col">
        <h2 className="text-3xl font-bold font-grotesk text-lightgreen">
          Create an Account
        </h2>
        <p className="font-poppins text-lg max-sm:text-base">
          Quick, secure account creation: Easy steps to access all features.
        </p>
        {/* Seprator */}
        <div className="h-px my-1 bg-black w-full"></div>
      </div>
      {/* Sign In Container */}
      <div className="p-4 gap-2 border border-lightgray font-grotesk rounded-lg ">
        <div className="flex max-sm:flex-col">
          <div className="w-1/2 max-sm:w-full">
            <img
              src={SignUp}
              alt="Sign Up"
              className="w-full h-full pointer-events-none"
            />
          </div>
          <div className="w-1/2 max-sm:w-full flex-col p-4 border rounded-lg">
            <div className="gap-2 flex flex-col">
              <h2 className="text-2xl font-bold font-grotesk text-black">
                Enter your details
              </h2>
              {/* Seprator */}
              <div className="h-px my-1 bg-black  w-full"></div>
            </div>

            <label className="text-gray-700 text-lg  font-semibold flex-1">
              Username
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("username", {
                  required: "Field is required",
                })}
              />
            </label>
            <label className="text-gray-700 text-lg  font-semibold flex-1">
              Name
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                type="text"
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("firstName", {
                  required: "Field is required",
                })}
              />
            </label>
            <label className="text-gray-700 text-lg  font-semibold flex-1">
              Mobile Number
              <input
                type="tel"
                val={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("mobileNumber", {
                  required: "Field is required",
                })}
              />
            </label>
            <label className="text-gray-700 text-lg  font-semibold flex-1">
              Email
              <input
                type="email"
                className="border rounded w-full py-1 px-2 font-normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="text-gray-700 text-lg  font-semibold flex-1">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("password", {
                  required: "Field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be atleast 6 characters",
                  },
                })}
              />
            </label>
            <label className="text-gray-700 text-lg  font-semibold flex-1">
              Confirm Password
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("confirmPassword", {
                  validate: (val) => {
                    if (!val) {
                      return "Field is required";
                    } else if (watch("password") !== val) {
                      return "Your passwords do not match";
                    }
                  },
                })}
              />
            </label>
            <label className="text-gray-700 text-lg  font-semibold flex-1">
              Avatar
              <input
                name="avatar"
                type="file"
                accept="image/*"
                className="border rounded w-full py-1 px-2 font-normal"
                onChange={registerDataChange}
              />
            </label>

            <span className="items-center justify-center flex mt-4">
              <button
                type="submit"
                className="text-lg bg-green-600 py-1 px-6 text-white font-semibold font-grotesk
					rounded-lg  hover:bg-green-700 hover:text-white "
              >
                Create Account
              </button>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
