"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driverController_1 = require("../controllers/driverController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// =================================
// DRIVER ROUTES
// Base URL: /api/drivers
// =================================
// Create Driver
router.post("/", authMiddleware_1.default, driverController_1.createDriver);
// Get All Drivers
router.get("/", authMiddleware_1.default, driverController_1.getDrivers);
// Get Single Driver
router.get("/:id", authMiddleware_1.default, driverController_1.getDriverById);
// Update Driver
router.put("/:id", authMiddleware_1.default, driverController_1.updateDriver);
// Delete Driver
router.delete("/:id", authMiddleware_1.default, driverController_1.deleteDriver);
exports.default = router;
