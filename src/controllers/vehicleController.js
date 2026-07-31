"use strict";
// import { Request, Response } from "express";
// import Vehicle from "../models/Vehicle";
// import { getIO } from "../socket/socket";
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
exports.deleteVehicle = exports.updateVehicleLocation = exports.updateVehicle = exports.getVehicleById = exports.getVehicles = exports.createVehicle = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Vehicle_1 = __importDefault(require("../models/Vehicle"));
const socket_1 = require("../socket/socket");
// Add Vehicle
// POST /api/vehicles
// ===============================
const createVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request Body:", req.body);
        const { vehicleNumber, driver, speed, fuel, status, latitude, longitude } = req.body;
        // Check duplicate vehicle number
        const existingVehicle = yield Vehicle_1.default.findOne({
            vehicleNumber
        });
        if (existingVehicle) {
            return res.status(400).json({
                success: false,
                message: "Vehicle number already exists"
            });
        }
        const vehicle = yield Vehicle_1.default.create({
            vehicleNumber,
            driver,
            speed,
            fuel,
            status,
            latitude,
            longitude
        });
        console.log("Saved Vehicle:", vehicle);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: vehicle
        });
    }
    catch (error) {
        console.error("Create Vehicle Error:", error);
        // MongoDB duplicate key fallback
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Vehicle number already exists"
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.createVehicle = createVehicle;
// ===============================
// Get All Vehicles
// GET /api/vehicles
// ===============================
const getVehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield Vehicle_1.default.find()
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
        console.error("Get Vehicles Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.getVehicles = getVehicles;
// ===============================
// Get Vehicle By ID
// GET /api/vehicles/:id
// ===============================
const getVehicleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid vehicle ID"
            });
            return;
        }
        const vehicle = yield Vehicle_1.default.findById(id);
        if (!vehicle) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: vehicle
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.getVehicleById = getVehicleById;
// ===============================
// Update Vehicle
// PUT /api/vehicles/:id
// ===============================
const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid vehicle ID"
            });
            return;
        }
        const vehicle = yield Vehicle_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!vehicle) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
            return;
        }
        // Socket live update
        try {
            (0, socket_1.getIO)().emit("vehicleUpdate", vehicle);
        }
        catch (socketError) {
            console.log("Socket not initialized");
        }
        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: vehicle
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.updateVehicle = updateVehicle;
// ===============================
// Update Vehicle Location
// PUT /api/vehicles/location/:id
// ===============================
const updateVehicleLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid vehicle ID"
            });
            return;
        }
        const vehicle = yield Vehicle_1.default.findByIdAndUpdate(id, {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            speed: req.body.speed,
            fuel: req.body.fuel,
            status: req.body.status
        }, {
            new: true,
            runValidators: true
        });
        if (!vehicle) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
            return;
        }
        try {
            (0, socket_1.getIO)().emit("vehicleUpdate", vehicle);
        }
        catch (socketError) {
            console.log("Socket not initialized");
        }
        res.status(200).json({
            success: true,
            data: vehicle
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.updateVehicleLocation = updateVehicleLocation;
// ===============================
// Delete Vehicle
// DELETE /api/vehicles/:id
// ===============================
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid vehicle ID"
            });
            return;
        }
        const vehicle = yield Vehicle_1.default.findByIdAndDelete(id);
        if (!vehicle) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.deleteVehicle = deleteVehicle;
