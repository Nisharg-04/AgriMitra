import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiResponse } from "../utils/apiResponse.util.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";
import { ErrorHandler } from "../utils/errorHandler.util.js";
import { catchAsyncError } from "../middleware/catchAsyncError.middleware.js";
import { sendEmail } from "../utils/sendEmail.util.js";
import crypto from "crypto";
import cloudinary from "cloudinary";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Token generation failed", error);
  }
};

const registerUser = catchAsyncError(async (req, res, next) => {
  // get user data from request body
  // validation not empty
  // check if user already exists
  // check for avatar
  // upload avatar to cloudinary
  // create user
  // remove password, refreshToken from response
  // check for userCreation
  // return response
  // console.log(req.body);
  const { email, userName, password, phoneNumber, displayName } = req.body;

  if (!email || !userName || !password || !phoneNumber || !displayName) {
    return next(new ErrorHandler("Please Provide All The Feilds", 400));
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    return next(new ErrorHandler("User already exits", 400));
  }
  // const myCloud = await uploadOnCloudinary(req.body.avatar);
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "home",
    width: 150,
    crop: "scale",
  });

  if (!myCloud) {
    return next(new ErrorHandler("Avatar upload failed", 500));
  }

  const user = await User.create({
    email,
    userName,
    password,
    phoneNumber,
    displayName,
    avatar: myCloud.url,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return next(new ErrorHandler("User creation failed", 500));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
  //get user data from request body
  //validation not empty
  //check if user exists
  //check password
  //generate access and refresh token
  //return response
  // console.log(req.body);

  const { userName, password } = req.body;

  if (!userName || !password) {
    return next(new ErrorHandler("Please provide username and password", 400));
  }

  const user = await User.findOne({ userName });

  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  const isPasswordMatch = await user.isPasswordCorrect(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  user.refreshToken = refreshToken;

  await user.save({
    validateBeforeSave: false,
  });

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res, next) => {
  // get user from request
  // delete refreshToken
  // clear cookies
  // return response

  res.cookie("refreshToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Succesfully",
  });

  // const user = req.user;

  // if (!user) {
  //   return next(new ErrorHandler("User not found", 404));
  // }

  // user.refreshToken = null;

  // await user.save({
  //   validateBeforeSave: false,
  // });

  // res
  //   .clearCookie("refreshToken")
  //   .clearCookie("accessToken")
  //   .status(200)
  //   .json(new ApiResponse(200, null, "User logged out successfully"));
});

const changePassword = asyncHandler(async (req, res, next) => {
  // get user from request
  // get old and new password from request body
  // check if old password matches
  // update password
  // return response

  let user = req.user;

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  user = await User.findById(user._id);

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new ErrorHandler("Please provide old and new password", 400));
  }

  const isPasswordMatch = await user.isPasswordCorrect(oldPassword);
  console.log("Here");

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  user.password = newPassword;

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, user, "Password changed successfully"));
});

const changeDisplayName = asyncHandler(async (req, res, next) => {
  // get user from request
  // get display name from request body
  // update display name
  // return response

  const user = req.user;
  const { displayName } = req.body;

  if (!displayName) {
    return next(new ErrorHandler("Please provide a display name", 400));
  }

  user.displayName = displayName;

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, user, "Display name changed successfully"));
});

const changeAvatar = asyncHandler(async (req, res, next) => {
  // get user from request
  // check for avatar
  // upload avatar to cloudinary
  // update avatar
  // return response

  const user = req.user;

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    return next(new ErrorHandler("Please provide an avatar", 400));
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    return next(new ErrorHandler("Avatar upload failed", 500));
  }

  user.avatar = avatar.url;

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar changed successfully"));
});

const getProfile = asyncHandler(async (req, res, next) => {
  // get user from request
  // return response

  const user = req.user;

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res
    .status(200)
    .json(new ApiResponse(200, user, "User profile retrieved successfully"));
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const email = req?.body?.email;

  if (!email) {
    return next(new ErrorHandler("email is required", 404));
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler(`User Not Found`, 404));
  }
  // Get Reset Password Token
  const resetToken = user.getResetPasswordToken();
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n If You Have Not Requested This Email Then,Please Ignore It `;
  try {
    await sendEmail({
      email: user.email,
      subject: `User Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email Sent To ${user.email} succesfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

const resetPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash

  const resetPasswordToken = req.params.token;
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        `Reset Password Token is Invalid or Has Been Expired`,
        404
      )
    );
  }
  if (!req?.body?.password || !req?.body?.confirmPassword) {
    return next(new ErrorHandler(`Please Provide Password`, 404));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(`Password Dosen't Matched`, 404));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: `Password Updated Successfully`,
  });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  changeDisplayName,
  changeAvatar,
  getProfile,
  forgotPassword,
  resetPassword,
};
