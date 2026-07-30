// import { Request, Response } from "express";
// import Vehicle from "../models/Vehicle";
// import { getIO } from "../socket/socket";



// // ===============================
// // Add Vehicle
// // ===============================
// export const createVehicle = async (

//   req: Request,

//   res: Response

// ): Promise<void> => {


//   try {


//     const vehicle =
//       await Vehicle.create(req.body);



//     res.status(201).json({

//       success: true,

//       message: "Vehicle created successfully",

//       data: vehicle

//     });



//   }
//   catch (error: any) {


//     res.status(500).json({

//       success: false,

//       message: error.message

//     });


//   }


// };





// // ===============================
// // Get All Vehicles
// // ===============================
// export const getVehicles = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {

//   try {

//     console.log("GET VEHICLES API HIT");


//     const vehicles = await Vehicle.find();


//     console.log(
//       "Vehicles from MongoDB:",
//       vehicles
//     );


//     res.status(200).json({

//       success: true,

//       vehicles

//     });


//   } catch (error: any) {


//     console.log(
//       "GET VEHICLES ERROR:",
//       error
//     );


//     res.status(500).json({

//       success: false,

//       message: error.message

//     });


//   }

// };




// // ===============================
// // Get Vehicle By ID
// // ===============================
// export const getVehicleById = async (

//   req: Request,

//   res: Response

// ): Promise<void> => {


//   try {


//     const vehicle =
//       await Vehicle.findById(
//         req.params.id
//       );



//     if (!vehicle) {


//       res.status(404).json({

//         success: false,

//         message: "Vehicle not found"

//       });


//       return;

//     }



//     res.status(200).json({

//       success: true,

//       data: vehicle

//     });



//   }
//   catch (error: any) {


//     res.status(500).json({

//       success: false,

//       message: error.message

//     });


//   }


// };





// // ===============================
// // Update Vehicle
// // ===============================
// export const updateVehicle = async (

//   req: Request,

//   res: Response

// ): Promise<void> => {


//   try {


//     const vehicle =
//       await Vehicle.findByIdAndUpdate(

//         req.params.id,

//         req.body,

//         {

//           new: true,

//           runValidators: true

//         }

//       );



//     if (!vehicle) {


//       res.status(404).json({

//         success: false,

//         message: "Vehicle not found"

//       });


//       return;

//     }




//     // ===============================
//     // Socket.IO Live Update
//     // ===============================

//     getIO().emit("vehicleUpdate", vehicle);




//     res.status(200).json({

//       success: true,

//       message: "Vehicle updated successfully",

//       data: vehicle

//     });



//   }
//   catch (error: any) {


//     res.status(500).json({

//       success: false,

//       message: error.message

//     });


//   }


// };





// // ===============================
// // Update Vehicle Location
// // ===============================
// export const updateVehicleLocation = async (

//   req: Request,

//   res: Response

// ): Promise<void> => {
//   console.log("BODY:", req.body);
//   console.log("PARAMS:", req.params);


//   try {


//     const vehicle =
//       await Vehicle.findByIdAndUpdate(

//         req.params.id,

//         {

//           latitude: req.body.latitude,

//           longitude: req.body.longitude,

//           speed: req.body.speed,

//           status: req.body.status,

//           fuel: req.body.fuel

//         },

//         {

//           new: true

//         }

//       );



//     if (!vehicle) {


//       res.status(404).json({

//         success: false,

//         message: "Vehicle not found"

//       });


//       return;

//     }




//     // ===============================
//     // Socket.IO Live Update
//     // ===============================
//     getIO().emit(
//       "vehicleUpdate",
//       vehicle
//     );




//     res.status(200).json({

//       success: true,

//       data: vehicle

//     });



//   }
//   catch (error: any) {


//     res.status(500).json({

//       success: false,

//       message: error.message

//     });


//   }


// };



// // ===============================
// // Delete Vehicle
// // ===============================
// export const deleteVehicle = async (

//   req: Request,

//   res: Response

// ): Promise<void> => {


//   try {


//     const vehicle =
//       await Vehicle.findByIdAndDelete(

//         req.params.id

//       );



//     if (!vehicle) {


//       res.status(404).json({

//         success: false,

//         message: "Vehicle not found"

//       });


//       return;

//     }




//     res.status(200).json({

//       success: true,

//       message: "Vehicle deleted successfully"

//     });



//   }
//   catch (error: any) {


//     res.status(500).json({

//       success: false,

//       message: error.message

//     });


//   }


// };




import { Request, Response } from "express";
import mongoose from "mongoose";

import Vehicle from "../models/Vehicle";
import { getIO } from "../socket/socket";



// Add Vehicle
// POST /api/vehicles
// ===============================
export const createVehicle = async (
  req: Request,
  res: Response
) => {

  try {

    console.log("Request Body:", req.body);


    const {
      vehicleNumber,
      driver,
      speed,
      fuel,
      status,
      latitude,
      longitude

    } = req.body;



    // Check duplicate vehicle number

const existingVehicle =
  await Vehicle.findOne({
    vehicleNumber
  });


if (existingVehicle) {

  return res.status(400).json({
    success:false,
    message:"Vehicle number already exists"
  });

}



    const vehicle =
      await Vehicle.create({

        vehicleNumber,
        driver,
        speed,
        fuel,
        status,
        latitude,
        longitude

      });



    console.log(
      "Saved Vehicle:",
      vehicle
    );



    res.status(201).json({

      success:true,

      message:
      "Vehicle created successfully",

      data:vehicle

    });



  } catch(error:any) {


    console.error(
      "Create Vehicle Error:",
      error
    );



    // MongoDB duplicate key fallback

    if(error.code === 11000){

      return res.status(400).json({

        success:false,

        message:
        "Vehicle number already exists"

      });

    }



    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};


// ===============================
// Get All Vehicles
// GET /api/vehicles
// ===============================

export const getVehicles = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const vehicles =
      await Vehicle.find()
      .sort({
        createdAt:-1
      });



    res.status(200).json({

      success:true,

      count:vehicles.length,

      vehicles

    });



  } catch(error:any){


    console.error(
      "Get Vehicles Error:",
      error
    );


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};








// ===============================
// Get Vehicle By ID
// GET /api/vehicles/:id
// ===============================

export const getVehicleById = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const id =
      String(req.params.id);



    if(!mongoose.Types.ObjectId.isValid(id)){


      res.status(400).json({

        success:false,

        message:"Invalid vehicle ID"

      });


      return;

    }




    const vehicle =
      await Vehicle.findById(id);




    if(!vehicle){


      res.status(404).json({

        success:false,

        message:"Vehicle not found"

      });


      return;

    }





    res.status(200).json({

      success:true,

      data:vehicle

    });



  } catch(error:any){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};










// ===============================
// Update Vehicle
// PUT /api/vehicles/:id
// ===============================

export const updateVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const id =
      String(req.params.id);



    if(!mongoose.Types.ObjectId.isValid(id)){


      res.status(400).json({

        success:false,

        message:"Invalid vehicle ID"

      });


      return;

    }





    const vehicle =
      await Vehicle.findByIdAndUpdate(

        id,

        req.body,

        {

          new:true,

          runValidators:true

        }

      );




    if(!vehicle){


      res.status(404).json({

        success:false,

        message:"Vehicle not found"

      });


      return;

    }





    // Socket live update

    try {

      getIO().emit(
        "vehicleUpdate",
        vehicle
      );


    } catch(socketError){

      console.log(
        "Socket not initialized"
      );

    }







    res.status(200).json({

      success:true,

      message:"Vehicle updated successfully",

      data:vehicle

    });



  } catch(error:any){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};










// ===============================
// Update Vehicle Location
// PUT /api/vehicles/location/:id
// ===============================

export const updateVehicleLocation = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const id =
      String(req.params.id);



    if(!mongoose.Types.ObjectId.isValid(id)){


      res.status(400).json({

        success:false,

        message:"Invalid vehicle ID"

      });


      return;

    }





    const vehicle =
      await Vehicle.findByIdAndUpdate(

        id,

        {

          latitude:req.body.latitude,

          longitude:req.body.longitude,

          speed:req.body.speed,

          fuel:req.body.fuel,

          status:req.body.status

        },

        {

          new:true,

          runValidators:true

        }

      );


    if(!vehicle){


      res.status(404).json({

        success:false,

        message:"Vehicle not found"

      });


      return;

    }






    try {


      getIO().emit(

        "vehicleUpdate",

        vehicle

      );


    } catch(socketError){


      console.log(
        "Socket not initialized"
      );


    }






    res.status(200).json({

      success:true,

      data:vehicle

    });



  } catch(error:any){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};









// ===============================
// Delete Vehicle
// DELETE /api/vehicles/:id
// ===============================

export const deleteVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const id =
      String(req.params.id);



    if(!mongoose.Types.ObjectId.isValid(id)){


      res.status(400).json({

        success:false,

        message:"Invalid vehicle ID"

      });


      return;

    }






    const vehicle =
      await Vehicle.findByIdAndDelete(id);





    if(!vehicle){


      res.status(404).json({

        success:false,

        message:"Vehicle not found"

      });


      return;

    }





    res.status(200).json({

      success:true,

      message:"Vehicle deleted successfully"

    });




  } catch(error:any){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};