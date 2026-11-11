import { Router } from "express";
import { ingestGpsFix } from "../controllers/gpsIngestController";

const router = Router();

// POST /api/gps/ingest — provider/device-to-FleetDash normalized GPS payload
router.post("/ingest", ingestGpsFix);

export default router;
