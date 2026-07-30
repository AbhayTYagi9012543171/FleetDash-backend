import { Router } from "express";

import {
  createGeofence,
  getGeofences,
  getGeofenceById,
  updateGeofence,
  deleteGeofence,
} from "../controllers/geofenceController";

const router = Router();

// Create Geofence
router.post("/", createGeofence);

// Get All Geofences
router.get("/", getGeofences);

// Get Single Geofence
router.get("/:id", getGeofenceById);

// Update Geofence
router.put("/:id", updateGeofence);

// Delete Geofence
router.delete("/:id", deleteGeofence);

export default router;