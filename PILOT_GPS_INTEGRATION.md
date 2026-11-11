# FleetDash — Existing GPS Provider Pilot

This first integration milestone adds a provider-neutral, normalized GPS ingestion endpoint. It does **not** claim compatibility with a particular GPS vendor until that vendor's webhook/API documentation and device credentials are supplied.

## 1. Security action required before any deployment

The original uploaded backend archive contained a populated `.env` file with database and JWT credentials. That file has been removed from this delivery. Treat those credentials as exposed:
- Rotate the MongoDB database user password and revoke the old credential.
- Replace `JWT_SECRET` with a new long random secret.
- Generate a separate random `GPS_INGEST_TOKEN` of at least 32 characters.
- Never commit `.env`; use the hosting provider's secret/environment-variable manager.
- Review database access logs for unexpected access.

## 2. Configure the GPS device mapping

Add `gpsDeviceId` to each vehicle record. It must exactly match the provider's unique device identifier. Keep it unique per vehicle. Do not use the vehicle registration number as a secret.

Example vehicle fields:
```json
{
  "vehicleNumber": "UP14AB1234",
  "gpsDeviceId": "provider-device-0001"
}
```

## 3. Normalized ingestion contract

`POST /api/gps/ingest`

Headers:
- `Content-Type: application/json`
- `x-gps-token: <GPS_INGEST_TOKEN>`
- `x-device-id: <provider device identifier>`

Body:
```json
{
  "latitude": 28.7041,
  "longitude": 77.1025,
  "speed": 42,
  "recordedAt": "2026-11-11T08:30:00.000Z"
}
```

The endpoint validates credentials, coordinates, speed and timestamp; rejects stale/out-of-order fixes; updates the mapped vehicle; and emits `vehicleUpdate` over Socket.IO to the existing fleet room.

## 4. Provider adapter still required

For the actual transport company's installed GPS vendor, obtain:
- Vendor/platform name and API/webhook documentation.
- Device ID format and device-to-vehicle export.
- Authentication/signature method.
- Sample redacted webhook payload.
- Update interval and historical playback API availability.

Implement a vendor-specific adapter that translates the vendor payload into the normalized contract above. Do not send the device token through a browser.

## 5. Pilot acceptance tests

- Unmapped device returns 404.
- Missing/incorrect token returns 401.
- Invalid coordinates/speed returns 400.
- Old GPS fix is ignored.
- Newer GPS fix updates the correct vehicle.
- Socket client receives `vehicleUpdate`.
- GPS location is clearly identified as device-sourced, not simulated.
- Disconnect/offline status is determined by a scheduled stale-device monitor (not inferred from a single fix).

## 6. Known scope boundary

This milestone stores the latest location on the existing Vehicle document. A production route-history feature needs a separate time-series/location-history collection, retention policy, indexes and access controls. It is intentionally not faked by storing a single latest coordinate as a route.
