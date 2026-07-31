"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicleController_1 = require("../controllers/vehicleController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// ===============================
// CREATE VEHICLE
// POST /api/vehicles
// ===============================
router.post("/", authMiddleware_1.default, vehicleController_1.createVehicle);
// ===============================
// GET ALL VEHICLES
// GET /api/vehicles
// ===============================
router.get("/", vehicleController_1.getVehicles);
// ===============================
// GET SINGLE VEHICLE
// GET /api/vehicles/:id
// ===============================
router.get("/:id", vehicleController_1.getVehicleById);
// ===============================
// UPDATE VEHICLE
// PUT /api/vehicles/:id
// ===============================
router.put("/:id", authMiddleware_1.default, vehicleController_1.updateVehicle);
// ===============================
// UPDATE VEHICLE LOCATION
// PUT /api/vehicles/:id/location
// ===============================
router.put("/:id/location", authMiddleware_1.default, vehicleController_1.updateVehicleLocation);
// ===============================
// DELETE VEHICLE
// DELETE /api/vehicles/:id
// ===============================
router.delete("/:id", authMiddleware_1.default, vehicleController_1.deleteVehicle);
// IMPORTANT
// DEFAULT EXPORT REQUIRED
exports.default = router;
