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
// export interface IAlert extends Document {
//   vehicle: mongoose.Types.ObjectId;
//   driver?: mongoose.Types.ObjectId;
//   alertType:
//     | "Overspeed"
//     | "Fuel Low"
//     | "Geofence Exit"
//     | "Geofence Entry"
//     | "Engine Warning"
//     | "SOS";
//   severity: "Low" | "Medium" | "High" | "Critical";
//   message: string;
//   location: string;
//   latitude: number;
//   longitude: number;
//   status: "Active" | "Resolved";
//   createdAt: Date;
//   updatedAt: Date;
// }
// const alertSchema = new Schema(
//   {
//     vehicle: {
//       type: Schema.Types.ObjectId,
//       ref: "Vehicle",
//       required: true,
//     },
//     driver: {
//       type: Schema.Types.ObjectId,
//       ref: "Driver",
//       default: null,
//     },
//     alertType: {
//       type: String,
//       enum: [
//         "Overspeed",
//         "Fuel Low",
//         "Geofence Exit",
//         "Geofence Entry",
//         "Engine Warning",
//         "SOS",
//       ],
//       required: true,
//     },
//     severity: {
//       type: String,
//       enum: ["Low", "Medium", "High", "Critical"],
//       default: "Low",
//     },
//     message: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     location: {
//       type: String,
//       required: true,
//     },
//     latitude: {
//       type: Number,
//       default: 0,
//     },
//     longitude: {
//       type: Number,
//       default: 0,
//     },
//     status: {
//       type: String,
//       enum: ["Active", "Resolved"],
//       default: "Active",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// export default mongoose.model<IAlert>("Alert", alertSchema);
const mongoose_1 = __importStar(require("mongoose"));
const alertSchema = new mongoose_1.Schema({
    vehicle: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true,
        index: true,
    },
    driver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Driver",
        default: null,
        index: true,
    },
    alertType: {
        type: String,
        required: true,
        enum: [
            "Overspeed",
            "Fuel Low",
            "Geofence Exit",
            "Geofence Entry",
            "Engine Warning",
            "SOS",
        ],
        index: true,
    },
    severity: {
        type: String,
        enum: ["Low", "Medium", "High", "Critical"],
        default: "Low",
        index: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90,
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
    },
    status: {
        type: String,
        enum: ["Active", "Resolved"],
        default: "Active",
        index: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// Compound indexes
alertSchema.index({ vehicle: 1, createdAt: -1 });
alertSchema.index({ status: 1, severity: 1 });
const Alert = mongoose_1.default.model("Alert", alertSchema);
exports.default = Alert;
