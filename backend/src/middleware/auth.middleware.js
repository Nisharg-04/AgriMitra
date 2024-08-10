import {ErrorHandler} from "../utils/errorHandler.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return next(new ErrorHandler("Accesstoken not found", 401));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(new ErrorHandler("Not authorized to access this route", 401));
  }
});
