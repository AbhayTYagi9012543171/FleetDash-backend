"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocket = void 0;
let io;
const initSocket = (server) => {
    io = server;
    io.on("connection", (socket) => {
        console.log("✅ Client Connected:", socket.id);
        socket.on("disconnect", () => {
            console.log("❌ Client Disconnected:", socket.id);
        });
    });
};
exports.initSocket = initSocket;
const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized");
    }
    return io;
};
exports.getIO = getIO;
