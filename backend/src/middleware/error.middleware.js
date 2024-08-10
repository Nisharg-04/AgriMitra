import { ErrorHandler } from "../utils/errorHandler.util.js";

module.exports = (err, req, res, next) => {
  (err.statusCode = err.statusCode || 500),
    (err.message = err.message || "Internal Server Error");

  // Wrong Mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT Token
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token Is Invalid Please Try Again`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token Is Expired Please Try Again`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    errorMessage: err.message,
    errorLocation: err.stack,
  });
};
