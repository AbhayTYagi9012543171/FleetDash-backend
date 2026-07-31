"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alertController_1 = require("../controllers/alertController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// ===============================
// ALERT ROUTES
// ===============================
// Create Alert
// POST /api/alerts
router.post("/", authMiddleware_1.default, alertController_1.createAlert);
// Get All Alerts
// GET /api/alerts
router.get("/", authMiddleware_1.default, alertController_1.getAlerts);
// Get Single Alert
// GET /api/alerts/:id
router.get("/:id", authMiddleware_1.default, alertController_1.getAlertById);
// Update Alert
// PUT /api/alerts/:id
router.put("/:id", authMiddleware_1.default, alertController_1.updateAlert);
// Delete Alert
// DELETE /api/alerts/:id
router.delete("/:id", authMiddleware_1.default, alertController_1.deleteAlert);
exports.default = router;
