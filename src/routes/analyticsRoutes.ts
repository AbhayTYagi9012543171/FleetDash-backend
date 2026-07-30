import express from "express";

import {
  getAnalytics
} from "../controllers/analyticsController";


const router = express.Router();


// ===============================
// Analytics Dashboard
// GET /api/analytics
// ===============================

router.get(
  "/",
  getAnalytics
);


export default router;