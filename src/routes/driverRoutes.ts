import express from "express";

import {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} from "../controllers/driverController";

import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// =================================
// DRIVER ROUTES
// Base URL: /api/drivers
// =================================

// Create Driver
router.post(
  "/",
  authMiddleware,
  createDriver
);

// Get All Drivers
router.get(
  "/",
  authMiddleware,
  getDrivers
);

// Get Single Driver
router.get(
  "/:id",
  authMiddleware,
  getDriverById
);

// Update Driver
router.put(
  "/:id",
  authMiddleware,
  updateDriver
);

// Delete Driver
router.delete(
  "/:id",
  authMiddleware,
  deleteDriver
);

export default router;