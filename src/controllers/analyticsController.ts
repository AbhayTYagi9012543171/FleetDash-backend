// import Vehicle from "../models/Vehicle";
// import Driver from "../models/Driver";
// import Alert from "../models/Alert";
// import Report from "../models/Report";


// export const getAnalytics = async (
//   req:any,
//   res:any
// )=>{

// try{


// const totalVehicles =
// await Vehicle.countDocuments();



// const activeVehicles =
// await Vehicle.countDocuments({
//   status:"Active"
// });


// const idleVehicles =
// await Vehicle.countDocuments({
//   status:"Idle"
// });


// const offlineVehicles =
// await Vehicle.countDocuments({
//   status:"Offline"
// });



// const totalDrivers =
// await Driver.countDocuments();



// const totalAlerts =
// await Alert.countDocuments();



// const totalReports =
// await Report.countDocuments();



// res.json({

// success:true,

// analytics:{

// totalVehicles,

// activeVehicles,

// idleVehicles,

// offlineVehicles,

// totalDrivers,

// totalAlerts,

// totalReports

// }

// });


// }

// catch(error){

// console.log(error);


// res.status(500).json({

// success:false,

// message:"Analytics error"

// });


// }


// };



import { Request, Response } from "express";

import Vehicle from "../models/Vehicle";
import Driver from "../models/Driver";
import Alert from "../models/Alert";
import Report from "../models/Report";

export const getAnalytics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [
      totalVehicles,
      activeVehicles,
      idleVehicles,
      offlineVehicles,
      totalDrivers,
      totalAlerts,
      totalReports,
    ] = await Promise.all([
      Vehicle.countDocuments(),
      Vehicle.countDocuments({ status: "Active" }),
      Vehicle.countDocuments({ status: "Idle" }),
      Vehicle.countDocuments({ status: "Offline" }),
      Driver.countDocuments(),
      Alert.countDocuments(),
      Report.countDocuments(),
    ]);

    const analytics = {
      totalVehicles,
      activeVehicles,
      idleVehicles,
      offlineVehicles,
      totalDrivers,
      totalAlerts,
      totalReports,

      vehicleUtilization:
        totalVehicles > 0
          ? Number(((activeVehicles / totalVehicles) * 100).toFixed(2))
          : 0,

      alertRate:
        totalVehicles > 0
          ? Number(((totalAlerts / totalVehicles) * 100).toFixed(2))
          : 0,
    };

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error: any) {
    console.error("Analytics Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch analytics",
    });
  }
};