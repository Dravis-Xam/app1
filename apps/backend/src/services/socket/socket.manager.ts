// socket.ts
import { Server, Socket } from "socket.io";

const handleSocketConnection = (socket: Socket, io: Server) => {
  console.log(`New client connected: ${socket.id}`);

  // Room creation
  socket.on("create-room", () => {
    const roomKey = Math.random().toString(36).substring(2, 7);
    socket.join(roomKey);
    console.log(`Client ${socket.id} created room ${roomKey}`);
    socket.emit("room-created", roomKey);
  });

  // Join room
  socket.on("join-room", (roomKey: string) => {
    const room = io.sockets.adapter.rooms.get(roomKey);
    if (room) {
      socket.join(roomKey);
      console.log(`Client ${socket.id} joined room ${roomKey}`);
      socket.emit("room-joined", roomKey);
      socket.to(roomKey).emit("user-connected", socket.id);
    } else {
      socket.emit("error", "Room does not exist");
    }
  });

  // 🔹 WebRTC signaling
  socket.on("offer", ({ roomKey, offer }) => {
    socket.to(roomKey).emit("offer", { offer, from: socket.id });
  });

  socket.on("answer", ({ roomKey, answer }) => {
    socket.to(roomKey).emit("answer", { answer, from: socket.id });
  });

  socket.on("ice-candidate", ({ roomKey, candidate }) => {
    socket.to(roomKey).emit("ice-candidate", { candidate, from: socket.id });
  });

  // Chat
  socket.on("chat-message", ({ roomKey, message }) => {
    socket.to(roomKey).emit("chat-message", { message, id: socket.id });
  });

  // Leaving
  socket.on("leave-room", (roomKey: string) => {
    socket.leave(roomKey);
    socket.to(roomKey).emit("user-disconnected", socket.id);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
};

export { handleSocketConnection };
