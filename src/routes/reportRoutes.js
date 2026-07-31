"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportController_1 = require("../controllers/reportController");
const router = (0, express_1.Router)();
// ===============================
// Report Routes
// ===============================
// Create Report
router.post("/", reportController_1.createReport);
// Get All Reports
router.get("/", reportController_1.getReports);
// Get Report By ID
router.get("/:id", reportController_1.getReportById);
// Update Report
router.put("/:id", reportController_1.updateReport);
// Delete Report
router.delete("/:id", reportController_1.deleteReport);
exports.default = router;
