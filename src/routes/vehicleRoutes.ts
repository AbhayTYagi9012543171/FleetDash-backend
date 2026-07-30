import express from "express";

import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  updateVehicleLocation,
  deleteVehicle
} from "../controllers/vehicleController";

import authMiddleware from "../middleware/authMiddleware";


const router = express.Router();


// ===============================
// CREATE VEHICLE
// POST /api/vehicles
// ===============================

router.post(
  "/",
  authMiddleware,
  createVehicle
);


// ===============================
// GET ALL VEHICLES
// GET /api/vehicles
// ===============================

router.get(
  "/",
  getVehicles
);


// ===============================
// GET SINGLE VEHICLE
// GET /api/vehicles/:id
// ===============================

router.get(
  "/:id",
  getVehicleById
);


// ===============================
// UPDATE VEHICLE
// PUT /api/vehicles/:id
// ===============================

router.put(
  "/:id",
  authMiddleware,
  updateVehicle
);


// ===============================
// UPDATE VEHICLE LOCATION
// PUT /api/vehicles/:id/location
// ===============================

router.put(
  "/:id/location",
  authMiddleware,
  updateVehicleLocation
);


// ===============================
// DELETE VEHICLE
// DELETE /api/vehicles/:id
// ===============================

router.delete(
  "/:id",
  authMiddleware,
  deleteVehicle
);


// IMPORTANT
// DEFAULT EXPORT REQUIRED

export default router;