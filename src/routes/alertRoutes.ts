import express from "express";


import {

  createAlert,

  getAlerts,

  getAlertById,

  updateAlert,

  deleteAlert

} from "../controllers/alertController";



import authMiddleware from "../middleware/authMiddleware";



const router = express.Router();





// ===============================
// ALERT ROUTES
// ===============================



// Create Alert
// POST /api/alerts

router.post(

  "/",

  authMiddleware,

  createAlert

);






// Get All Alerts
// GET /api/alerts

router.get(

  "/",

  authMiddleware,

  getAlerts

);






// Get Single Alert
// GET /api/alerts/:id

router.get(

  "/:id",

  authMiddleware,

  getAlertById

);






// Update Alert
// PUT /api/alerts/:id

router.put(

  "/:id",

  authMiddleware,

  updateAlert

);






// Delete Alert
// DELETE /api/alerts/:id

router.delete(

  "/:id",

  authMiddleware,

  deleteAlert

);






export default router;