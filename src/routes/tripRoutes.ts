// import express from "express";

// import {
//   createTrip,
//   getTrips,
//   getRecentTrips
// } from "../controllers/tripController";


// const router = express.Router();


// router.post(
//   "/",
//   createTrip
// );


// router.get(
//   "/",
//   getTrips
// );


// router.get(
//   "/recent",
//   getRecentTrips
// );


// export default router;



import express from "express";

import {
  createTrip,
  getTrips,
  getRecentTrips,
  getTripById,
  updateTrip,
  deleteTrip
} from "../controllers/tripController";


const router = express.Router();



// ===============================
// Create Trip
// POST /api/trips
// ===============================

router.post(
  "/",
  createTrip
);




// ===============================
// Get All Trips
// GET /api/trips
// ===============================

router.get(
  "/",
  getTrips
);




// ===============================
// Recent Trips Dashboard
// GET /api/trips/recent
// ===============================

router.get(
  "/recent",
  getRecentTrips
);




// ===============================
// Get Trip By ID
// GET /api/trips/:id
// ===============================

router.get(
  "/:id",
  getTripById
);




// ===============================
// Update Trip
// PUT /api/trips/:id
// ===============================

router.put(
  "/:id",
  updateTrip
);




// ===============================
// Delete Trip
// DELETE /api/trips/:id
// ===============================

router.delete(
  "/:id",
  deleteTrip
);



export default router;