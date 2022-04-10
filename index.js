import { config } from "dotenv";

import express from "express";
const app = express();
import cors from "cors";

import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);

import { createServer } from "http";
const server = createServer(app);

import socketio from "socket.io";
import mongoose from "mongoose";
const io = socketio(server);
const PORT = process.env.PORT || 5000;

config();
const mongoDB = process.env.MONGODB_URL;
mongoose
  .connect(mongoDB)
  .then(() => console.log("Connected"))
  .catch((error) => {
    console.log(error.message);
  });

app.get("/set-cookies", (req, res) => {
  res.cookie("Username", "Kiran");
  res.cookie("isAuthenticated", true, {
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.send("Cookies Set successfully");
});

app.get("/get-cookies", (req, res) => {
  const cookies = req.cookies;
  res.json(cookies);
});

server.listen(PORT, () => {
  console.log(`listening on *: ${PORT}`);
});
