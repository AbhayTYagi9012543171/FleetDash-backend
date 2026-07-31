"use strict";
// import mongoose, { Schema, Document } from "mongoose";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// export interface IReport extends Document {
//   title: string;
//   reportType:
//     | "Daily"
//     | "Weekly"
//     | "Monthly"
//     | "Vehicle"
//     | "Driver"
//     | "Fuel";
//   vehicle?: mongoose.Types.ObjectId;
//   driver?: mongoose.Types.ObjectId;
//   description: string;
//   generatedBy: string;
//   createdAt: Date;
// }
// const reportSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     reportType: {
//       type: String,
//       enum: [
//         "Daily",
//         "Weekly",
//         "Monthly",
//         "Vehicle",
//         "Driver",
//         "Fuel",
//       ],
//       required: true,
//     },
//     vehicle: {
//       type: Schema.Types.ObjectId,
//       ref: "Vehicle",
//     },
//     driver: {
//       type: Schema.Types.ObjectId,
//       ref: "Driver",
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     generatedBy: {
//       type: String,
//       default: "Admin",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// export default mongoose.model<IReport>(
//   "Report",
//   reportSchema
// );
const mongoose_1 = __importStar(require("mongoose"));
const reportSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Report title is required"],
        trim: true,
        maxlength: 150,
        index: true,
    },
    reportType: {
        type: String,
        required: true,
        enum: [
            "Daily",
            "Weekly",
            "Monthly",
            "Vehicle",
            "Driver",
            "Fuel",
        ],
        index: true,
    },
    vehicle: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Vehicle",
        default: null,
        index: true,
    },
    driver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Driver",
        default: null,
        index: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxlength: 2000,
    },
    generatedBy: {
        type: String,
        default: "Admin",
        trim: true,
        maxlength: 100,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// Indexes for faster queries
reportSchema.index({ reportType: 1, createdAt: -1 });
reportSchema.index({ vehicle: 1, createdAt: -1 });
reportSchema.index({ driver: 1, createdAt: -1 });
const Report = mongoose_1.default.model("Report", reportSchema);
exports.default = Report;
