"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const socket_1 = require("./socket/socket");
// ======================================
// Configuration
// ======================================
const PORT = Number(process.env.PORT) || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const NODE_ENV = process.env.NODE_ENV || "development";
// ======================================
// Create HTTP Server
// ======================================
const server = http_1.default.createServer(app_1.default);
// ======================================
// Create Socket.IO Server
// ======================================
const io = new socket_io_1.Server(server, {
    cors: {
        origin: CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
});
// Initialize Socket.IO
(0, socket_1.initSocket)(io);
// ======================================
// Start Server
// ======================================
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect MongoDB
        yield (0, db_1.default)();
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
    }
    catch (error) {
        console.error("\n==========================================");
        console.error("❌ Failed to Start Server");
        console.error(error);
        console.error("==========================================\n");
        process.exit(1);
    }
});
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
const shutdown = (signal) => {
    console.log(`\n🛑 ${signal} received.`);
    console.log("Closing server...");
    server.close(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (mongoose_1.default.connection.readyState === 1) {
                yield mongoose_1.default.connection.close();
                console.log("✅ MongoDB Connection Closed");
            }
            console.log("✅ HTTP Server Closed");
            console.log("👋 Server Shutdown Complete");
            process.exit(0);
        }
        catch (error) {
            console.error("❌ Error During Shutdown");
            console.error(error);
            process.exit(1);
        }
    }));
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
