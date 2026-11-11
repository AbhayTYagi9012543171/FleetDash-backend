# FleetDash Pilot Upgrade — Delivery Status

## Included in this source package
- Original frontend and backend source retained (excluding node_modules).
- Removed committed `.env` secrets and added `.env.example`.
- Added authenticated-by-device-token normalized GPS ingestion endpoint.
- Added per-vehicle GPS device mapping and latest-fix timestamp fields.
- Added validation for coordinates, speed, timestamps and stale/out-of-order fixes.
- Emits the existing frontend `vehicleUpdate` Socket.IO event after accepted GPS fixes.
- Changed simulator event naming to align with the frontend listener.
- Added GPS integration and pilot test documentation.
- Added frontend vehicle typing for GPS timestamp/source metadata.

## Not yet production-certified
- Vendor-specific integration cannot be completed until the transport company's GPS vendor/API and sample payload are known.
- No live GPS hardware was available for end-to-end verification.
- MongoDB migration/backfill and unique-index deployment must be checked against the live database.
- Tenant/company isolation, full role permission enforcement, audit logging, GPS history, stale-device monitor, billing and backup/restore need dedicated implementation and testing.
- Dependency installation, TypeScript build, frontend build and integration tests were not executed in this environment.

## Start locally

Backend:
1. Copy `.env.example` to `.env`.
2. Set `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`, and `GPS_INGEST_TOKEN`.
3. Run `npm install`.
4. Run `npm run build`.
5. Run `npm run dev`.

Frontend:
1. Set `VITE_API_URL=http://localhost:5003/api` and `VITE_SOCKET_URL=http://localhost:5003` in a local `.env`.
2. Run `npm install`.
3. Run `npm run build`.
4. Run `npm run dev`.

Never use real customer records in a public demo environment.
