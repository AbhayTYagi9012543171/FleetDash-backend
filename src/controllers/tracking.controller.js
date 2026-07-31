"use strict";
// import { Request, Response } from "express";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLiveTracking = void 0;
const Vehicle_1 = __importDefault(require("../models/Vehicle"));
// ===============================
// GET LIVE TRACKING
// GET /api/tracking
// ===============================
const getLiveTracking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield Vehicle_1.default.find()
            .select("vehicleNumber driver latitude longitude speed fuel status")
            .sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            count: vehicles.length,
            vehicles
        });
    }
    catch (error) {
        console.error("Live Tracking Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch live tracking data",
            error: error.message
        });
    }
});
exports.getLiveTracking = getLiveTracking;
