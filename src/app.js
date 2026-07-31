"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
// Routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const testRoutes_1 = __importDefault(require("./routes/testRoutes"));
const vehicleRoutes_1 = __importDefault(require("./routes/vehicleRoutes"));
const driverRoutes_1 = __importDefault(require("./routes/driverRoutes"));
const tripRoutes_1 = __importDefault(require("./routes/tripRoutes"));
const trackingRoute_1 = __importDefault(require("./routes/trackingRoute"));
const geofenceRoutes_1 = __importDefault(require("./routes/geofenceRoutes"));
const alertRoutes_1 = __importDefault(require("./routes/alertRoutes"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
const analyticsRoutes_1 = __importDefault(require("./routes/analyticsRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const settingsRoutes_1 = __importDefault(require("./routes/settingsRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const app = (0, express_1.default)();
// ======================
// App Configuration
// ======================
app.disable("x-powered-by");
app.set("trust proxy", 1);
// ======================
// Middleware
// ======================
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)(process.env.NODE_ENV === "production"
    ? "combined"
    : "dev"));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
// ======================
// Health Check
// ======================
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "FleetDash Backend API is running 🚀",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
    });
});
// ======================
// API Routes
// ======================
app.use("/api/auth", authRoutes_1.default);
app.use("/api/test", testRoutes_1.default);
app.use("/api/vehicles", vehicleRoutes_1.default);
app.use("/api/drivers", driverRoutes_1.default);
app.use("/api/trips", tripRoutes_1.default);
app.use("/api/tracking", trackingRoute_1.default);
app.use("/api/geofences", geofenceRoutes_1.default);
app.use("/api/alerts", alertRoutes_1.default);
app.use("/api/reports", reportRoutes_1.default);
app.use("/api/analytics", analyticsRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use("/api/settings", settingsRoutes_1.default);
app.use("/api/dashboard", dashboardRoutes_1.default);
// ======================
// API Health
// ======================
app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});
// ======================
// 404 Handler
// ======================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route '${req.originalUrl}' not found`,
    });
});
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: process.env.NODE_ENV === "production"
            ? "Internal Server Error"
            : err.message,
    });
});
exports.default = app;
