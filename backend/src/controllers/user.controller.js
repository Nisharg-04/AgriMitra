import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiResponse } from "../utils/apiResponse.util.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";
import {ErrorHandler} from "../utils/errorHandler.util.js";
import { catchAsyncError } from "../middleware/catchAsyncError.middleware.js";

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

  const { email, userName, password, phoneNumber, displayName } = req.body;

  if (!email || !userName || !password || !phoneNumber || !displayName) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    return next(new ErrorHandler("User already exits", 400));
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    return next(new ErrorHandler("Please provide an avatar", 400));
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    return next(new ErrorHandler("Avatar upload failed", 500));
  }

  const user = await User.create({
    email,
    userName,
    password,
    phoneNumber,
    displayName,
    avatar: avatar.url,
  });

  const createdUser = await User
    .findById(user._id)
    .select("-password -refreshToken");

  if (!createdUser) {
    return next(new ErrorHandler("User creation failed", 500));
  }

  return res
  .status(201)
  .json(new ApiResponse(201, createdUser, "User created successfully"));
});

export { registerUser };