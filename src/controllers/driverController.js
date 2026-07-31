"use strict";
// import { Request, Response } from "express";
// import Driver from "../models/Driver";
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
exports.deleteDriver = exports.updateDriver = exports.createDriver = exports.getDriverById = exports.getDrivers = void 0;
const Driver_1 = __importDefault(require("../models/Driver"));
// =============================
// GET ALL DRIVERS
// =============================
const getDrivers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drivers = yield Driver_1.default
            .find()
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: drivers.length,
            drivers,
        });
    }
    catch (error) {
        console.error("Get Drivers Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getDrivers = getDrivers;
// =============================
// GET DRIVER BY ID
// =============================
const getDriverById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driver = yield Driver_1.default.findById(req.params.id);
        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found",
            });
        }
        res.status(200).json({
            success: true,
            driver,
        });
    }
    catch (error) {
        console.error("Get Driver Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getDriverById = getDriverById;
// =============================
// CREATE DRIVER
// =============================
const createDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, phoneNumber, licenseNumber, address, experience, status, assignedVehicle, } = req.body;
        // Required field validation
        if (!fullName ||
            !email ||
            !phoneNumber ||
            !licenseNumber) {
            return res.status(400).json({
                success: false,
                message: "Full name, email, phone number and license number are required",
            });
        }
        // Check duplicate data
        const existingDriver = yield Driver_1.default.findOne({
            $or: [
                { email },
                { phoneNumber },
                { licenseNumber }
            ]
        });
        if (existingDriver) {
            return res.status(400).json({
                success: false,
                message: "Driver with this email, phone number or license number already exists"
            });
        }
        // Create driver
        const driver = yield Driver_1.default.create({
            fullName,
            email,
            phoneNumber,
            licenseNumber,
            address,
            experience,
            status,
            assignedVehicle,
        });
        res.status(201).json({
            success: true,
            message: "Driver created successfully",
            driver
        });
    }
    catch (error) {
        console.error("Create Driver Error:", error);
        // Mongo duplicate error fallback
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email, phone number or license number already exists"
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.createDriver = createDriver;
// =============================
// UPDATE DRIVER
// =============================
const updateDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driver = yield Driver_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Driver updated successfully",
            driver
        });
    }
    catch (error) {
        console.error("Update Driver Error:", error);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email, phone number or license number already exists"
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.updateDriver = updateDriver;
// =============================
// DELETE DRIVER
// =============================
const deleteDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driver = yield Driver_1.default.findByIdAndDelete(req.params.id);
        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Driver deleted successfully"
        });
    }
    catch (error) {
        console.error("Delete Driver Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.deleteDriver = deleteDriver;
