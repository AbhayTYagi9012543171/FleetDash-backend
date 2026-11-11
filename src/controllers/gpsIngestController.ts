import { Request, Response } from "express";
import { timingSafeEqual } from "crypto";
import Vehicle from "../models/Vehicle";
import { getIO } from "../socket/socket";

const safeTokenMatch = (provided: string, expected: string): boolean => {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};

/**
 * GPS provider adapter endpoint.
 * Configure a unique GPS_INGEST_TOKEN and map each provider/device ID to a vehicle.
 * Provider-specific webhook payloads should be normalized by an adapter before this controller.
 */
export const ingestGpsFix = async (req: Request, res: Response): Promise<void> => {
  try {
    const expected = process.env.GPS_INGEST_TOKEN;
    const provided = req.header("x-gps-token") || "";
    if (!expected || expected.length < 32 || !safeTokenMatch(provided, expected)) {
      res.status(401).json({ success: false, message: "Invalid GPS device credentials" });
      return;
    }

    const deviceId = String(req.header("x-device-id") || req.body?.deviceId || "").trim();
    const latitude = Number(req.body?.latitude);
    const longitude = Number(req.body?.longitude);
    const speed = Number(req.body?.speed ?? 0);
    const recordedAt = req.body?.recordedAt ? new Date(req.body.recordedAt) : new Date();

    if (!deviceId || deviceId.length > 128 ||
        !Number.isFinite(latitude) || latitude < -90 || latitude > 90 ||
        !Number.isFinite(longitude) || longitude < -180 || longitude > 180 ||
        !Number.isFinite(speed) || speed < 0 || speed > 300 ||
        Number.isNaN(recordedAt.getTime())) {
      res.status(400).json({ success: false, message: "Invalid GPS payload" });
      return;
    }

    const maxAgeSeconds = Math.max(30, Number(process.env.GPS_MAX_AGE_SECONDS) || 300);
    const ageSeconds = (Date.now() - recordedAt.getTime()) / 1000;
    if (ageSeconds > maxAgeSeconds || ageSeconds < -60) {
      res.status(422).json({ success: false, message: "GPS fix is stale or timestamp is in the future" });
      return;
    }

    const vehicle = await Vehicle.findOne({ gpsDeviceId: deviceId });
    if (!vehicle) {
      res.status(404).json({ success: false, message: "No vehicle is mapped to this GPS device" });
      return;
    }

    // Ignore out-of-order fixes so an old packet cannot move the vehicle backwards.
    if (vehicle.lastGpsAt && recordedAt <= vehicle.lastGpsAt) {
      res.status(202).json({ success: true, ignored: true, message: "Older GPS fix ignored" });
      return;
    }

    vehicle.latitude = latitude;
    vehicle.longitude = longitude;
    vehicle.speed = speed;
    vehicle.status = speed > 2 ? "Active" : "Idle";
    vehicle.lastGpsAt = recordedAt;
    await vehicle.save();

    const payload = {
      _id: String(vehicle._id),
      vehicleNumber: vehicle.vehicleNumber,
      latitude,
      longitude,
      speed,
      status: vehicle.status,
      lastGpsAt: recordedAt.toISOString(),
      locationSource: "gps-device",
    };

    try {
      getIO().to("fleet").emit("vehicleUpdate", payload);
    } catch {
      // HTTP ingestion remains successful if Socket.IO has not initialized.
    }

    res.status(200).json({ success: true, vehicle: payload });
  } catch (error) {
    console.error("GPS ingestion failed:", error);
    res.status(500).json({ success: false, message: "Unable to process GPS fix" });
  }
};
