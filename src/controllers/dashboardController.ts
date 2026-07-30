// import { Request, Response } from "express";

// import Vehicle from "../models/Vehicle";
// import Driver from "../models/Driver";
// import Alert from "../models/Alert";
// import Report from "../models/Report";


// export const getDashboard = async(
// req:Request,
// res:Response
// )=>{

// try{


// const totalVehicles =
// await Vehicle.countDocuments();


// const activeVehicles =
// await Vehicle.countDocuments({
// status:"Active"
// });


// const totalDrivers =
// await Driver.countDocuments();


// const totalAlerts =
// await Alert.countDocuments({
// status:"Active"
// });


// const totalReports =
// await Report.countDocuments();



// res.json({

// success:true,

// dashboard:{

// totalVehicles,

// activeVehicles,

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

// message:"Dashboard data failed"

// });


// }

// };



import { Request, Response } from "express";

import Vehicle from "../models/Vehicle";
import Driver from "../models/Driver";
import Alert from "../models/Alert";
import Report from "../models/Report";
import Trip from "../models/Trip";



// ===============================
// Admin Dashboard
// ===============================

export const getDashboard = async (

  req: Request,

  res: Response

): Promise<void> => {


try {



const today = new Date();


today.setHours(
  0,
  0,
  0,
  0
);





const [

totalVehicles,

activeVehicles,

idleVehicles,

offlineVehicles,

totalDrivers,

activeAlerts,

totalReports,


tripsToday,


distanceToday,


fuelUsed


] = await Promise.all([



// Vehicles

Vehicle.countDocuments(),



Vehicle.countDocuments({
status:"Active"
}),



Vehicle.countDocuments({
status:"Idle"
}),



Vehicle.countDocuments({
status:"Offline"
}),





// Drivers

Driver.countDocuments(),





// Alerts

Alert.countDocuments({
status:"Active"
}),





// Reports

Report.countDocuments(),





// Trips Today

Trip.countDocuments({

createdAt:{
$gte:today
}

}),






// Total Distance Today

Trip.aggregate([

{

$match:{

createdAt:{
$gte:today
}

}

},


{

$group:{

_id:null,

total:{
$sum:"$distance"
}

}

}


]),






// Fuel Used Today

Trip.aggregate([


{

$match:{

createdAt:{
$gte:today
}

}

},


{

$group:{

_id:null,

total:{
$sum:"$fuelUsed"
}

}

}


])



]);









const dashboard = {


totalVehicles,


activeVehicles,


idleVehicles,


offlineVehicles,



inactiveVehicles:
idleVehicles + offlineVehicles,



totalDrivers,


totalAlerts:
activeAlerts,


totalReports,




// Fleet Summary

tripsToday,


distanceToday:
distanceToday[0]?.total || 0,



fuelUsed:
fuelUsed[0]?.total || 0,






fleetHealth:

totalVehicles > 0

?

Number(
(
(activeVehicles / totalVehicles)
*
100
).toFixed(2)
)

:

0



};







res.status(200).json({

success:true,

dashboard

});




}

catch(error:any){



console.error(
"Dashboard Error:",
error
);



res.status(500).json({

success:false,

message:
error.message ||
"Dashboard data failed"

});



}


};