// Server running websocket and REST API for the application

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { handleSocketConnection } from "./services/socket/socket.manager";

dotenv.config();

const app = express();
const ORIGINS = process.env.CORS_ORIGINS || "";
const PORT = process.env.PORT || 5000;

app.use(cors(ORIGINS ? { origin: ORIGINS.split(",") } : {}));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

import('./services/api/auth/auth.route').then(({ default: authRouter }) => {
  app.use("/api/auth", authRouter);
});

io.on("connection", (socket) => handleSocketConnection(socket, io));


// Example route
app.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "Kennedy Ngovi" }]);
});



app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
