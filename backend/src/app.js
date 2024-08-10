import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));

app.use(cookieParser());

app.get("/hi", (req, res) => {
  res.send("Hello World");
})


import userRouter from "./routes/user.route.js";
import cropRouter from "./routes/crop.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/crop", cropRouter);

export { app };