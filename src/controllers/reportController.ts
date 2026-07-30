// import { Request, Response } from "express";
// import Report from "../models/Report";

// // ===============================
// // Create Report
// // ===============================
// export const createReport = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const report = await Report.create(req.body);

//     res.status(201).json({
//       success: true,
//       message: "Report created successfully",
//       report,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ===============================
// // Get All Reports
// // ===============================
// export const getReports = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const reports = await Report.find()
//       .populate("vehicle")
//       .populate("driver")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       reports,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ===============================
// // Get Report By ID
// // ===============================
// export const getReportById = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const report = await Report.findById(req.params.id)
//       .populate("vehicle")
//       .populate("driver");

//     if (!report) {
//       res.status(404).json({
//         success: false,
//         message: "Report not found",
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       report,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ===============================
// // Update Report
// // ===============================
// export const updateReport = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const report = await Report.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!report) {
//       res.status(404).json({
//         success: false,
//         message: "Report not found",
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       message: "Report updated successfully",
//       report,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ===============================
// // Delete Report
// // ===============================
// export const deleteReport = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const report = await Report.findByIdAndDelete(req.params.id);

//     if (!report) {
//       res.status(404).json({
//         success: false,
//         message: "Report not found",
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       message: "Report deleted successfully",
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
import Report from "../models/Report";

interface ReportParams {
  id: string;
}

// ===============================
// Create Report
// ===============================
export const createReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      reportType,
      vehicle,
      driver,
      description,
      generatedBy,
    } = req.body;

    if (!title || !reportType || !description) {
      res.status(400).json({
        success: false,
        message: "Title, Report Type and Description are required.",
      });
      return;
    }

    const report = await Report.create({
      title,
      reportType,
      vehicle,
      driver,
      description,
      generatedBy,
    });

    res.status(201).json({
      success: true,
      message: "Report created successfully",
      report,
    });
  } catch (error: any) {
    console.error("Create Report Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ===============================
// Get All Reports
// ===============================
export const getReports = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reports = await Report.find()
      .populate("vehicle")
      .populate("driver")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error: any) {
    console.error("Get Reports Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ===============================
// Get Report By ID
// ===============================
export const getReportById = async (
  req: Request<ReportParams>,
  res: Response
): Promise<void> => {
  try {
    const id = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid Report ID",
      });
      return;
    }

    const report = await Report.findById(id)
      .populate("vehicle")
      .populate("driver");

    if (!report) {
      res.status(404).json({
        success: false,
        message: "Report not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error: any) {
    console.error("Get Report Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ===============================
// Update Report
// ===============================
export const updateReport = async (
  req: Request<ReportParams>,
  res: Response
): Promise<void> => {
  try {
    const id = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid Report ID",
      });
      return;
    }

    const report = await Report.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("vehicle")
      .populate("driver");

    if (!report) {
      res.status(404).json({
        success: false,
        message: "Report not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Report updated successfully",
      report,
    });
  } catch (error: any) {
    console.error("Update Report Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ===============================
// Delete Report
// ===============================
export const deleteReport = async (
  req: Request<ReportParams>,
  res: Response
): Promise<void> => {
  try {
    const id = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid Report ID",
      });
      return;
    }

    const report = await Report.findByIdAndDelete(id);

    if (!report) {
      res.status(404).json({
        success: false,
        message: "Report not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete Report Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};