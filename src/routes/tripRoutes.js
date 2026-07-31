"use strict";
// import express from "express";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import {
//   createTrip,
//   getTrips,
//   getRecentTrips
// } from "../controllers/tripController";
// const router = express.Router();
// router.post(
//   "/",
//   createTrip
// );
// router.get(
//   "/",
//   getTrips
// );
// router.get(
//   "/recent",
//   getRecentTrips
// );
// export default router;
const express_1 = __importDefault(require("express"));
const tripController_1 = require("../controllers/tripController");
const router = express_1.default.Router();
// ===============================
// Create Trip
// POST /api/trips
// ===============================
router.post("/", tripController_1.createTrip);
// ===============================
// Get All Trips
// GET /api/trips
// ===============================
router.get("/", tripController_1.getTrips);
// ===============================
// Recent Trips Dashboard
// GET /api/trips/recent
// ===============================
router.get("/recent", tripController_1.getRecentTrips);
// ===============================
// Get Trip By ID
// GET /api/trips/:id
// ===============================
router.get("/:id", tripController_1.getTripById);
// ===============================
// Update Trip
// PUT /api/trips/:id
// ===============================
router.put("/:id", tripController_1.updateTrip);
// ===============================
// Delete Trip
// DELETE /api/trips/:id
// ===============================
router.delete("/:id", tripController_1.deleteTrip);
exports.default = router;
