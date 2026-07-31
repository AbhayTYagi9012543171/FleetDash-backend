import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

// Routes
import authRoutes from "./routes/authRoutes";
import testRoutes from "./routes/testRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";
import driverRoutes from "./routes/driverRoutes";
import tripRoutes from "./routes/tripRoutes";
import trackingRoute from "./routes/trackingRoute";
import geofenceRoutes from "./routes/geofenceRoutes";
import alertRoutes from "./routes/alertRoutes";
import reportRoutes from "./routes/reportRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import userRoutes from "./routes/userRoutes";
import settingsRoutes from "./routes/settingsRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

const app = express();

// ======================
// App Configuration
// ======================

app.disable("x-powered-by");
app.set("trust proxy", 1);

// ======================
// Middleware
// ======================

app.use(helmet());

app.use(compression());

app.use(
  morgan(
    process.env.NODE_ENV === "production"
      ? "combined"
      : "dev"
  )
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS"
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ],
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ======================
// Health Check
// ======================

app.get("/", (_req: Request, res: Response) => {
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

app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);

app.use("/api/vehicles", vehicleRoutes);

app.use("/api/drivers", driverRoutes);

app.use("/api/trips", tripRoutes);

app.use("/api/tracking", trackingRoute);

app.use("/api/geofences", geofenceRoutes);

app.use("/api/alerts", alertRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/users", userRoutes);

app.use("/api/settings", settingsRoutes);

app.use("/api/dashboard", dashboardRoutes);

// ======================
// API Health
// ======================

app.get("/api/health", (_req: Request, res: Response) => {
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

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' not found`,
  });
});

// ======================
// Global Error Handler
// ======================

interface ApiError extends Error {
  statusCode?: number;
}

app.use(
  (
    err: ApiError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.message,
    });
  }
);

export default app;