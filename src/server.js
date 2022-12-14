import express from "express";
import http from "http";
import morgan from "morgan";
import mongoose from 'mongoose'
import apiRouter from "./routes/indexRoutes.js";
import cors from "cors";
import { Server as ioServer} from "socket.io";
import chat from "./websocket/chat.js";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 8080 || process.env.PORT;

const httpServer = http.createServer(app);

const io = new ioServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
chat(io);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
  })
);

app.use("/api", apiRouter);

const server = app.listen(PORT, () =>
  console.log(
    `Server Online! http:/localhost:${PORT}. 
        at ${new Date().toLocaleString()}`
  )
);
server.on("error", (err) => console.log(err));

function onInit() {
  console.log("PRIMERA BASE DE DATOS CON MYSQL");
}

onInit();
