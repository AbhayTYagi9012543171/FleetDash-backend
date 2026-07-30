import express from "express";

import {
  getLiveTracking
} from "../controllers/tracking.controller";

import authMiddleware from "../middleware/authMiddleware";


const router = express.Router();



// ===============================
// LIVE TRACKING ROUTES
// ===============================



// Get Live Vehicle Tracking
// GET /api/tracking

router.get(
  "/",
  authMiddleware,
  getLiveTracking
);




// Update Vehicle Location
// PUT /api/tracking/:id

router.put(
  "/:id",
  authMiddleware,
  (req, res) => {

    res.status(200).json({

      success: true,

      message: "Vehicle location update API ready",

      vehicleId: req.params.id,

      data: req.body

    });

  }
);



export default router;