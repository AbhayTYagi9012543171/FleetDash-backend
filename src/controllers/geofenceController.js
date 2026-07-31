"use strict";
// import { Request, Response } from "express";
// import Geofence from "../models/Geofence";
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
exports.deleteGeofence = exports.updateGeofence = exports.getGeofenceById = exports.getGeofences = exports.createGeofence = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Geofence_1 = __importDefault(require("../models/Geofence"));
// ===============================
// Create Geofence
// ===============================
const createGeofence = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, center, radius } = req.body;
        if (!name ||
            !center ||
            center.latitude === undefined ||
            center.longitude === undefined ||
            radius === undefined) {
            res.status(400).json({
                success: false,
                message: "All fields are required",
            });
            return;
        }
        const existing = yield Geofence_1.default.findOne({ name });
        if (existing) {
            res.status(400).json({
                success: false,
                message: "Geofence already exists",
            });
            return;
        }
        const geofence = yield Geofence_1.default.create({
            name,
            center,
            radius,
        });
        res.status(201).json({
            success: true,
            message: "Geofence created successfully",
            geofence,
        });
    }
    catch (error) {
        console.error("Create Geofence Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
});
exports.createGeofence = createGeofence;
// ===============================
// Get All Geofences
// ===============================
const getGeofences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const geofences = yield Geofence_1.default.find().sort({
            createdAt: -1,
        });
        res.status(200).json({
            success: true,
            count: geofences.length,
            geofences,
        });
    }
    catch (error) {
        console.error("Get Geofences Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
});
exports.getGeofences = getGeofences;
// ===============================
// Get Geofence By ID
// ===============================
const getGeofenceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid Geofence ID",
            });
            return;
        }
        const geofence = yield Geofence_1.default.findById(id);
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
    }
    catch (error) {
        console.error("Get Geofence Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
});
exports.getGeofenceById = getGeofenceById;
// ===============================
// Update Geofence
// ===============================
const updateGeofence = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid Geofence ID",
            });
            return;
        }
        const geofence = yield Geofence_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
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
    }
    catch (error) {
        console.error("Update Geofence Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
});
exports.updateGeofence = updateGeofence;
// ===============================
// Delete Geofence
// ===============================
const deleteGeofence = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid Geofence ID",
            });
            return;
        }
        const geofence = yield Geofence_1.default.findByIdAndDelete(id);
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
    }
    catch (error) {
        console.error("Delete Geofence Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
});
exports.deleteGeofence = deleteGeofence;
