import express from "express";
import { LIMIT } from "./constants.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// setting cors
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// setting middlewares
app.use(express.json({ limit: LIMIT }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

import userRouter from "./routes/user.route.js";
import lendedRouter from "./routes/lended.route.js";
import borrowedRouter from "./routes/borrowed.route.js";
// setting routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/lended", lendedRouter);
app.use("/api/v1/borrowed", borrowedRouter);

export default app;
