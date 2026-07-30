// import { Request, Response } from "express";
// import Alert from "../models/Alert";
// import { getIO } from "../socket/socket";

// // ===============================
// // Create Alert
// // ===============================
// export const createAlert = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const alert = await Alert.create(req.body);

//     // Send live alert
//     getIO().emit("newAlert", alert);

//     res.status(201).json({
//       success: true,
//       message: "Alert created successfully",
//       alert,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ===============================
// // Get All Alerts
// // ===============================
// export const getAlerts = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const alerts = await Alert.find()
//       .populate("vehicle")
//       .populate("driver")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       alerts,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ===============================
// // Get Alert By ID
// // ===============================
// export const getAlertById = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const alert = await Alert.findById(req.params.id)
//       .populate("vehicle")
//       .populate("driver");

//     if (!alert) {
//       res.status(404).json({
//         success: false,
//         message: "Alert not found",
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       alert,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ===============================
// // Update Alert
// // ===============================
// export const updateAlert = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const alert = await Alert.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!alert) {
//       res.status(404).json({
//         success: false,
//         message: "Alert not found",
//       });
//       return;
//     }

//     getIO().emit("alertUpdated", alert);

//     res.status(200).json({
//       success: true,
//       message: "Alert updated successfully",
//       alert,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ===============================
// // Delete Alert
// // ===============================
// export const deleteAlert = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const alert = await Alert.findByIdAndDelete(req.params.id);

//     if (!alert) {
//       res.status(404).json({
//         success: false,
//         message: "Alert not found",
//       });
//       return;
//     }

//     getIO().emit("alertDeleted", req.params.id);

//     res.status(200).json({
//       success: true,
//       message: "Alert deleted successfully",
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

import Alert from "../models/Alert";
import { getIO } from "../socket/socket";

// ===============================
// Create Alert
// ===============================
export const createAlert = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const alert = await Alert.create(req.body);

    // Emit socket event safely
    try {
      getIO().emit("newAlert", alert);
    } catch (err) {
      console.warn("Socket.IO not initialized.");
    }

    res.status(201).json({
      success: true,
      message: "Alert created successfully",
      alert,
    });
  } catch (error: any) {
    console.error("Create Alert Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create alert",
    });
  }
};

// ===============================
// Get All Alerts
// ===============================
export const getAlerts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const alerts = await Alert.find()
      .populate("vehicle")
      .populate("driver")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: alerts.length,
      alerts,
    });
  } catch (error: any) {
    console.error("Get Alerts Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch alerts",
    });
  }
};

// ===============================
// Get Alert By ID
// ===============================
export const getAlertById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid Alert ID",
      });
      return;
    }

    const alert = await Alert.findById(id)
      .populate("vehicle")
      .populate("driver");

    if (!alert) {
      res.status(404).json({
        success: false,
        message: "Alert not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      alert,
    });
  } catch (error: any) {
    console.error("Get Alert Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch alert",
    });
  }
};

// ===============================
// Update Alert
// ===============================
export const updateAlert = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid Alert ID",
      });
      return;
    }

    const alert = await Alert.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!alert) {
      res.status(404).json({
        success: false,
        message: "Alert not found",
      });
      return;
    }

    try {
      getIO().emit("alertUpdated", alert);
    } catch (err) {
      console.warn("Socket.IO not initialized.");
    }

    res.status(200).json({
      success: true,
      message: "Alert updated successfully",
      alert,
    });
  } catch (error: any) {
    console.error("Update Alert Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to update alert",
    });
  }
};

// ===============================
// Delete Alert
// ===============================
export const deleteAlert = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid Alert ID",
      });
      return;
    }

    const alert = await Alert.findByIdAndDelete(id);

    if (!alert) {
      res.status(404).json({
        success: false,
        message: "Alert not found",
      });
      return;
    }

    try {
      getIO().emit("alertDeleted", id);
    } catch (err) {
      console.warn("Socket.IO not initialized.");
    }

    res.status(200).json({
      success: true,
      message: "Alert deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete Alert Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete alert",
    });
  }
};