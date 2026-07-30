import dotenv from "dotenv";
dotenv.config();

import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";

import app from "./app";
import connectDB from "./config/db";
import { initSocket } from "./socket/socket";

// ======================================
// Configuration
// ======================================

const PORT = Number(process.env.PORT) || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const NODE_ENV = process.env.NODE_ENV || "development";

// ======================================
// Create HTTP Server
// ======================================

const server = http.createServer(app);

// ======================================
// Create Socket.IO Server
// ======================================

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

// Initialize Socket.IO
initSocket(io);

// ======================================
// Start Server
// ======================================

const startServer = async (): Promise<void> => {
  try {
    // Connect MongoDB
    await connectDB();

    // Start Express Server
    server.listen(PORT, () => {
      console.log("\n==========================================");
      console.log("🚀 FleetDash Backend Started");
      console.log("==========================================");
      console.log(`📦 Environment : ${NODE_ENV}`);
      console.log(`🌐 Server      : http://localhost:${PORT}`);
      console.log(`🖥️ Client      : ${CLIENT_URL}`);
      console.log("✅ MongoDB Connected");
      console.log("✅ Socket.IO Initialized");
      console.log("==========================================\n");
    });
  } catch (error) {
    console.error("\n==========================================");
    console.error("❌ Failed to Start Server");
    console.error(error);
    console.error("==========================================\n");
    process.exit(1);
  }
};

// ======================================
// HTTP Server Error
// ======================================

server.on("error", (error) => {
  console.error("\n==========================================");
  console.error("❌ HTTP Server Error");
  console.error(error);
  console.error("==========================================\n");
});

// ======================================
// Unhandled Promise Rejection
// ======================================

process.on("unhandledRejection", (reason) => {
  console.error("\n==========================================");
  console.error("❌ Unhandled Promise Rejection");
  console.error(reason);
  console.error("==========================================\n");

  shutdown("Unhandled Promise Rejection");
});

// ======================================
// Uncaught Exception
// ======================================

process.on("uncaughtException", (error) => {
  console.error("\n==========================================");
  console.error("❌ Uncaught Exception");
  console.error(error);
  console.error("==========================================\n");

  shutdown("Uncaught Exception");
});

// ======================================
// Graceful Shutdown
// ======================================

const shutdown = (signal: string): void => {
  console.log(`\n🛑 ${signal} received.`);
  console.log("Closing server...");

  server.close(async () => {
    try {
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log("✅ MongoDB Connection Closed");
      }

      console.log("✅ HTTP Server Closed");
      console.log("👋 Server Shutdown Complete");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error During Shutdown");
      console.error(error);
      process.exit(1);
    }
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error("❌ Force Shutdown");
    process.exit(1);
  }, 10000);
};

// ======================================
// OS Signals
// ======================================

process.on("SIGINT", () => shutdown("SIGINT"));

process.on("SIGTERM", () => shutdown("SIGTERM"));

// ======================================
// Start Application
// ======================================

startServer();