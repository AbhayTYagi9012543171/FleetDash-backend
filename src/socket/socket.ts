import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: Server) => {
  io = server;

  io.on("connection", (socket) => {
    console.log("✅ Client Connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("❌ Client Disconnected:", socket.id);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }

  return io;
};