"use strict";
// import { Request, Response } from "express";
// import Alert from "../models/Alert";
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
exports.deleteAlert = exports.updateAlert = exports.getAlertById = exports.getAlerts = exports.createAlert = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Alert_1 = __importDefault(require("../models/Alert"));
const socket_1 = require("../socket/socket");
// ===============================
// Create Alert
// ===============================
const createAlert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alert = yield Alert_1.default.create(req.body);
        // Emit socket event safely
        try {
            (0, socket_1.getIO)().emit("newAlert", alert);
        }
        catch (err) {
            console.warn("Socket.IO not initialized.");
        }
        res.status(201).json({
            success: true,
            message: "Alert created successfully",
            alert,
        });
    }
    catch (error) {
        console.error("Create Alert Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to create alert",
        });
    }
});
exports.createAlert = createAlert;
// ===============================
// Get All Alerts
// ===============================
const getAlerts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alerts = yield Alert_1.default.find()
            .populate("vehicle")
            .populate("driver")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: alerts.length,
            alerts,
        });
    }
    catch (error) {
        console.error("Get Alerts Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch alerts",
        });
    }
});
exports.getAlerts = getAlerts;
// ===============================
// Get Alert By ID
// ===============================
const getAlertById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid Alert ID",
            });
            return;
        }
        const alert = yield Alert_1.default.findById(id)
            .populate("vehicle")
            .populate("driver");
        if (!alert) {
            res.status(404).json({
                success: false,
                message: "Alert not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            alert,
        });
    }
    catch (error) {
        console.error("Get Alert Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch alert",
        });
    }
});
exports.getAlertById = getAlertById;
// ===============================
// Update Alert
// ===============================
const updateAlert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid Alert ID",
            });
            return;
        }
        const alert = yield Alert_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!alert) {
            res.status(404).json({
                success: false,
                message: "Alert not found",
            });
            return;
        }
        try {
            (0, socket_1.getIO)().emit("alertUpdated", alert);
        }
        catch (err) {
            console.warn("Socket.IO not initialized.");
        }
        res.status(200).json({
            success: true,
            message: "Alert updated successfully",
            alert,
        });
    }
    catch (error) {
        console.error("Update Alert Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to update alert",
        });
    }
});
exports.updateAlert = updateAlert;
// ===============================
// Delete Alert
// ===============================
const deleteAlert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid Alert ID",
            });
            return;
        }
        const alert = yield Alert_1.default.findByIdAndDelete(id);
        if (!alert) {
            res.status(404).json({
                success: false,
                message: "Alert not found",
            });
            return;
        }
        try {
            (0, socket_1.getIO)().emit("alertDeleted", id);
        }
        catch (err) {
            console.warn("Socket.IO not initialized.");
        }
        res.status(200).json({
            success: true,
            message: "Alert deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete Alert Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete alert",
        });
    }
});
exports.deleteAlert = deleteAlert;
