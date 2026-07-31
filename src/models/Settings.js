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
// export interface ISettings extends Document {
//   emailNotification:boolean;
//   smsNotification:boolean;
//   darkMode:boolean;
//   language:string;
//   timezone:string;
// }
// const settingsSchema = new Schema<ISettings>(
// {
// emailNotification:{
//  type:Boolean,
//  default:true
// },
// smsNotification:{
//  type:Boolean,
//  default:false
// },
// darkMode:{
//  type:Boolean,
//  default:false
// },
// language:{
//  type:String,
//  default:"English"
// },
// timezone:{
//  type:String,
//  default:"Asia/Kolkata"
// }
// },
// {
// timestamps:true
// }
// );
// export default mongoose.model<ISettings>(
// "Settings",
// settingsSchema
// );
const mongoose_1 = __importStar(require("mongoose"));
const settingsSchema = new mongoose_1.Schema({
    emailNotification: {
        type: Boolean,
        default: true,
    },
    smsNotification: {
        type: Boolean,
        default: false,
    },
    darkMode: {
        type: Boolean,
        default: false,
    },
    language: {
        type: String,
        enum: ["English", "Hindi"],
        default: "English",
    },
    timezone: {
        type: String,
        default: "Asia/Kolkata",
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// Ensure only one settings document exists
settingsSchema.index({}, { unique: true });
const Settings = mongoose_1.default.model("Settings", settingsSchema);
exports.default = Settings;
