// import { Request, Response } from "express";
// import Geofence from "../models/Geofence";

// // ===============================
// // Create Geofence
// // ===============================
// export const createGeofence = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const geofence = await Geofence.create(req.body);

//     res.status(201).json({
//       success: true,
//       message: "Geofence created successfully",
//       geofence,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ===============================
// // Get All Geofences
// // ===============================
// export const getGeofences = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const geofences = await Geofence.find();

//     res.status(200).json({
//       success: true,
//       geofences,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ===============================
// // Get Geofence By ID
// // ===============================
// export const getGeofenceById = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const geofence = await Geofence.findById(req.params.id);

//     if (!geofence) {
//       res.status(404).json({
//         success: false,
//         message: "Geofence not found",
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       geofence,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ===============================
// // Update Geofence
// // ===============================
// export const updateGeofence = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const geofence = await Geofence.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!geofence) {
//       res.status(404).json({
//         success: false,
//         message: "Geofence not found",
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       message: "Geofence updated successfully",
//       geofence,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ===============================
// // Delete Geofence
// // ===============================
// export const deleteGeofence = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const geofence = await Geofence.findByIdAndDelete(req.params.id);

//     if (!geofence) {
//       res.status(404).json({
//         success: false,
//         message: "Geofence not found",
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       message: "Geofence deleted successfully",
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




import { Request, Response } from "express";
import mongoose from "mongoose";
import Geofence from "../models/Geofence";

interface GeofenceParams {
  id: string;
}

// ===============================
// Create Geofence
// ===============================
export const createGeofence = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, center, radius } = req.body;

    if (
      !name ||
      !center ||
      center.latitude === undefined ||
      center.longitude === undefined ||
      radius === undefined
    ) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    const existing = await Geofence.findOne({ name });

    if (existing) {
      res.status(400).json({
        success: false,
        message: "Geofence already exists",
      });
      return;
    }

    const geofence = await Geofence.create({
      name,
      center,
      radius,
    });

    res.status(201).json({
      success: true,
      message: "Geofence created successfully",
      geofence,
    });
  } catch (error: any) {
    console.error("Create Geofence Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ===============================
// Get All Geofences
// ===============================
export const getGeofences = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const geofences = await Geofence.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: geofences.length,
      geofences,
    });
  } catch (error: any) {
    console.error("Get Geofences Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ===============================
// Get Geofence By ID
// ===============================
export const getGeofenceById = async (
  req: Request<GeofenceParams>,
  res: Response
): Promise<void> => {
  try {
    const id = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid Geofence ID",
      });
      return;
    }

    const geofence = await Geofence.findById(id);

    if (!geofence) {
      res.status(404).json({
        success: false,
        message: "Geofence not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      geofence,
    });
  } catch (error: any) {
    console.error("Get Geofence Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ===============================
// Update Geofence
// ===============================
export const updateGeofence = async (
  req: Request<GeofenceParams>,
  res: Response
): Promise<void> => {
  try {
    const id = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid Geofence ID",
      });
      return;
    }

    const geofence = await Geofence.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!geofence) {
      res.status(404).json({
        success: false,
        message: "Geofence not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Geofence updated successfully",
      geofence,
    });
  } catch (error: any) {
    console.error("Update Geofence Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ===============================
// Delete Geofence
// ===============================
export const deleteGeofence = async (
  req: Request<GeofenceParams>,
  res: Response
): Promise<void> => {
  try {
    const id = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid Geofence ID",
      });
      return;
    }

    const geofence = await Geofence.findByIdAndDelete(id);

    if (!geofence) {
      res.status(404).json({
        success: false,
        message: "Geofence not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Geofence deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete Geofence Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};