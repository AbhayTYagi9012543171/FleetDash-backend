// import { Request, Response } from "express";
// import Driver from "../models/Driver";

// // Get All Drivers
// export const getDrivers = async (req: Request, res: Response) => {
//   try {
//     const drivers = await Driver.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: drivers.length,
//       drivers,
//     });
//   } catch (error: any) {
//     console.error("Get Drivers Error:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Get Driver By ID
// export const getDriverById = async (req: Request, res: Response) => {
//   try {
//     const driver = await Driver.findById(req.params.id);

//     if (!driver) {
//       return res.status(404).json({
//         success: false,
//         message: "Driver not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       driver,
//     });
//   } catch (error: any) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Create Driver
// export const createDriver = async (req: Request, res: Response) => {
//   try {
//     const {
//       fullName,
//       email,
//       phoneNumber,
//       licenseNumber,
//       address,
//       experience,
//       status,
//       assignedVehicle,
//     } = req.body;

//     const driver = await Driver.create({
//       fullName,
//       email,
//       phoneNumber,
//       licenseNumber,
//       address,
//       experience,
//       status,
//       assignedVehicle,
//     });

//     res.status(201).json({
//       success: true,
//       driver,
//     });
//   } catch (error: any) {
//     console.error("Create Driver Error:", error);

//     if (error.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         message: "Email, Phone Number or License Number already exists.",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Update Driver
// export const updateDriver = async (req: Request, res:Response) => {
//   try {
//     const driver = await Driver.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!driver) {
//       return res.status(404).json({
//         success: false,
//         message: "Driver not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       driver,
//     });
//   } catch (error: any) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Delete Driver
// export const deleteDriver = async (req: Request, res: Response) => {
//   try {
//     const driver = await Driver.findByIdAndDelete(req.params.id);

//     if (!driver) {
//       return res.status(404).json({
//         success: false,
//         message: "Driver not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Driver deleted successfully",
//     });
//   } catch (error: any) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




import { Request, Response } from "express";
import Driver from "../models/Driver";


// =============================
// GET ALL DRIVERS
// =============================
export const getDrivers = async (req: Request, res: Response) => {
  try {

    const drivers = await Driver
      .find()
      .sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      count: drivers.length,
      drivers,
    });


  } catch (error: any) {

    console.error("Get Drivers Error:", error);


    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// =============================
// GET DRIVER BY ID
// =============================
export const getDriverById = async (
  req: Request,
  res: Response
) => {

  try {

    const driver = await Driver.findById(req.params.id);


    if (!driver) {

      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });

    }


    res.status(200).json({
      success: true,
      driver,
    });


  } catch (error: any) {

    console.error("Get Driver Error:", error);


    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// =============================
// CREATE DRIVER
// =============================
export const createDriver = async (
  req: Request,
  res: Response
) => {

  try {


    const {
      fullName,
      email,
      phoneNumber,
      licenseNumber,
      address,
      experience,
      status,
      assignedVehicle,

    } = req.body;



    // Required field validation

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !licenseNumber
    ) {

      return res.status(400).json({
        success:false,
        message:
        "Full name, email, phone number and license number are required",
      });

    }



    // Check duplicate data

    const existingDriver = await Driver.findOne({

      $or:[
        {email},
        {phoneNumber},
        {licenseNumber}
      ]

    });



    if(existingDriver){

      return res.status(400).json({

        success:false,

        message:
        "Driver with this email, phone number or license number already exists"

      });

    }



    // Create driver

    const driver = await Driver.create({

      fullName,
      email,
      phoneNumber,
      licenseNumber,
      address,
      experience,
      status,
      assignedVehicle,

    });



    res.status(201).json({

      success:true,

      message:
      "Driver created successfully",

      driver

    });



  } catch(error:any){


    console.error(
      "Create Driver Error:",
      error
    );



    // Mongo duplicate error fallback

    if(error.code === 11000){

      return res.status(400).json({

        success:false,

        message:
        "Email, phone number or license number already exists"

      });

    }



    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};




// =============================
// UPDATE DRIVER
// =============================
export const updateDriver = async (
  req: Request,
  res: Response
) => {

  try {


    const driver = await Driver.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new:true,
        runValidators:true
      }

    );



    if(!driver){

      return res.status(404).json({

        success:false,

        message:
        "Driver not found"

      });

    }



    res.status(200).json({

      success:true,

      message:
      "Driver updated successfully",

      driver

    });



  }catch(error:any){


    console.error(
      "Update Driver Error:",
      error
    );


    if(error.code === 11000){

      return res.status(400).json({

        success:false,

        message:
        "Email, phone number or license number already exists"

      });

    }



    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};




// =============================
// DELETE DRIVER
// =============================
export const deleteDriver = async (
  req: Request,
  res: Response
) => {


  try {


    const driver =
      await Driver.findByIdAndDelete(
        req.params.id
      );



    if(!driver){


      return res.status(404).json({

        success:false,

        message:
        "Driver not found"

      });


    }



    res.status(200).json({

      success:true,

      message:
      "Driver deleted successfully"

    });



  }catch(error:any){


    console.error(
      "Delete Driver Error:",
      error
    );



    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};