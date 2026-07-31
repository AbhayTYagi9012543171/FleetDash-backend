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
// export interface IGeofence extends Document {
//   name: string;
//   center: {
//     latitude: number;
//     longitude: number;
//   };
//   radius: number;
// }
// const GeofenceSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     center: {
//       latitude: {
//         type: Number,
//         required: true,
//       },
//       longitude: {
//         type: Number,
//         required: true,
//       },
//     },
//     radius: {
//       type: Number,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// export default mongoose.model<IGeofence>(
//   "Geofence",
//   GeofenceSchema
// );
const mongoose_1 = __importStar(require("mongoose"));
const geofenceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Geofence name is required"],
        trim: true,
        unique: true,
        maxlength: 100,
        index: true,
    },
    center: {
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
    },
    radius: {
        type: Number,
        required: true,
        min: 1,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// Index for searching by location
geofenceSchema.index({
    "center.latitude": 1,
    "center.longitude": 1,
});
const Geofence = mongoose_1.default.model("Geofence", geofenceSchema);
exports.default = Geofence;
