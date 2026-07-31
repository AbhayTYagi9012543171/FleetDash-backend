"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const geofenceController_1 = require("../controllers/geofenceController");
const router = (0, express_1.Router)();
// Create Geofence
router.post("/", geofenceController_1.createGeofence);
// Get All Geofences
router.get("/", geofenceController_1.getGeofences);
// Get Single Geofence
router.get("/:id", geofenceController_1.getGeofenceById);
// Update Geofence
router.put("/:id", geofenceController_1.updateGeofence);
// Delete Geofence
router.delete("/:id", geofenceController_1.deleteGeofence);
exports.default = router;
