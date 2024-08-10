const catchAsyncError = (theFun) => (req, res, next) => {
  Promise.resolve(theFun(req, res, next)).catch(next);
};

export { catchAsyncError };
