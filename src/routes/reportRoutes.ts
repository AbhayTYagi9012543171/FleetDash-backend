import { Router } from "express";

import {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
} from "../controllers/reportController";

const router = Router();

// ===============================
// Report Routes
// ===============================

// Create Report
router.post("/", createReport);

// Get All Reports
router.get("/", getReports);

// Get Report By ID
router.get("/:id", getReportById);

// Update Report
router.put("/:id", updateReport);

// Delete Report
router.delete("/:id", deleteReport);

export default router;