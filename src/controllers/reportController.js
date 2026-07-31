"use strict";
// import { Request, Response } from "express";
// import Report from "../models/Report";
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
exports.deleteReport = exports.updateReport = exports.getReportById = exports.getReports = exports.createReport = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Report_1 = __importDefault(require("../models/Report"));
// ===============================
// Create Report
// ===============================
const createReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, reportType, vehicle, driver, description, generatedBy, } = req.body;
        if (!title || !reportType || !description) {
            res.status(400).json({
                success: false,
                message: "Title, Report Type and Description are required.",
            });
            return;
        }
        const report = yield Report_1.default.create({
            title,
            reportType,
            vehicle,
            driver,
            description,
            generatedBy,
        });
        res.status(201).json({
            success: true,
            message: "Report created successfully",
            report,
        });
    }
    catch (error) {
        console.error("Create Report Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
});
exports.createReport = createReport;
// ===============================
// Get All Reports
// ===============================
const getReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield Report_1.default.find()
            .populate("vehicle")
            .populate("driver")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: reports.length,
            reports,
        });
    }
    catch (error) {
        console.error("Get Reports Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
});
exports.getReports = getReports;
// ===============================
// Get Report By ID
// ===============================
const getReportById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid Report ID",
            });
            return;
        }
        const report = yield Report_1.default.findById(id)
            .populate("vehicle")
            .populate("driver");
        if (!report) {
            res.status(404).json({
                success: false,
                message: "Report not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            report,
        });
    }
    catch (error) {
        console.error("Get Report Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
});
exports.getReportById = getReportById;
// ===============================
// Update Report
// ===============================
const updateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid Report ID",
            });
            return;
        }
        const report = yield Report_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        })
            .populate("vehicle")
            .populate("driver");
        if (!report) {
            res.status(404).json({
                success: false,
                message: "Report not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Report updated successfully",
            report,
        });
    }
    catch (error) {
        console.error("Update Report Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
});
exports.updateReport = updateReport;
// ===============================
// Delete Report
// ===============================
const deleteReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid Report ID",
            });
            return;
        }
        const report = yield Report_1.default.findByIdAndDelete(id);
        if (!report) {
            res.status(404).json({
                success: false,
                message: "Report not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Report deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete Report Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
});
exports.deleteReport = deleteReport;
