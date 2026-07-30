// import { Request, Response } from "express";


// // GET LIVE TRACKING
// // GET /api/tracking

// export const getLiveTracking = async (
//   req: Request,
//   res: Response
// ) => {

//   try {

//     const vehicles = [

//       {
//         id: 1,
//         vehicleNumber: "UP14 AB 1234",
//         driver: "Rahul Sharma",
//         latitude: 28.6139,
//         longitude: 77.2090,
//         speed: 62,
//         fuel: 72,
//         status: "Active",
//       },

//       {
//         id: 2,
//         vehicleNumber: "DL01 XY 5678",
//         driver: "Amit Kumar",
//         latitude: 28.5355,
//         longitude: 77.3910,
//         speed: 0,
//         fuel: 45,
//         status: "Idle",
//       },

//       {
//         id: 3,
//         vehicleNumber: "HR26 CD 9876",
//         driver: "Rohit Singh",
//         latitude: 28.4595,
//         longitude: 77.0266,
//         speed: 0,
//         fuel: 30,
//         status: "Offline",
//       }

//     ];


//     return res.status(200).json({

//       success:true,

//       vehicles

//     });


//   } catch(error:any) {


//     return res.status(500).json({

//       success:false,

//       message:"Failed to fetch live tracking data",

//       error:error.message

//     });


//   }

// };




import { Request, Response } from "express";
import Vehicle from "../models/Vehicle";


// ===============================
// GET LIVE TRACKING
// GET /api/tracking
// ===============================

export const getLiveTracking = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {


    const vehicles = await Vehicle.find()
      .select(
        "vehicleNumber driver latitude longitude speed fuel status"
      )
      .sort({
        createdAt: -1
      });



    res.status(200).json({

      success:true,

      count:vehicles.length,

      vehicles

    });



  } catch(error:any){


    console.error(
      "Live Tracking Error:",
      error
    );


    res.status(500).json({

      success:false,

      message:
      "Failed to fetch live tracking data",

      error:error.message

    });


  }

};