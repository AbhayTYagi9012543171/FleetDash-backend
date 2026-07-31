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
// export interface IDriver extends Document {
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   licenseNumber: string;
//   address: string;
//   experience: number;
//   status: "Available" | "Driving" | "On Leave";
//   assignedVehicle?: mongoose.Types.ObjectId;
// }
// const driverSchema = new Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     licenseNumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     experience: {
//       type: Number,
//       default: 0,
//     },
//     status: {
//       type: String,
//       enum: ["Available", "Driving", "On Leave"],
//       default: "Available",
//     },
//     assignedVehicle: {
//       type: Schema.Types.ObjectId,
//       ref: "Vehicle",
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// export default mongoose.model<IDriver>("Driver", driverSchema);
const mongoose_1 = __importStar(require("mongoose"));
const driverSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: [true, "Driver name is required"],
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please enter a valid email address",
        ],
        index: true,
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        trim: true,
        match: [
            /^[0-9]{10}$/,
            "Phone number must be exactly 10 digits",
        ],
        index: true,
    },
    licenseNumber: {
        type: String,
        required: [true, "License number is required"],
        unique: true,
        trim: true,
        uppercase: true,
        index: true,
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
        maxlength: 250,
    },
    experience: {
        type: Number,
        default: 0,
        min: 0,
        max: 50,
    },
    status: {
        type: String,
        enum: ["Available", "Driving", "On Leave"],
        default: "Available",
        index: true,
    },
    assignedVehicle: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Vehicle",
        default: null,
        index: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// Compound index
driverSchema.index({
    status: 1,
    assignedVehicle: 1,
});
const Driver = mongoose_1.default.model("Driver", driverSchema);
exports.default = Driver;
