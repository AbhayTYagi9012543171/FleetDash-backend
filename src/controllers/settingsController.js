"use strict";
// import { Request, Response } from "express";
// import Settings from "../models/Settings";
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
exports.updateSettings = exports.getSettings = void 0;
const Settings_1 = __importDefault(require("../models/Settings"));
// ===============================
// GET SETTINGS
// ===============================
const getSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let settings = yield Settings_1.default.findOne();
        // Create default settings if not exists
        if (!settings) {
            settings = yield Settings_1.default.create({
                emailNotification: true,
                smsNotification: false,
                darkMode: false,
                language: "English",
                timezone: "Asia/Kolkata",
            });
        }
        res.status(200).json({
            success: true,
            settings,
        });
    }
    catch (error) {
        console.error("Get Settings Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to get settings",
        });
    }
});
exports.getSettings = getSettings;
// ===============================
// UPDATE SETTINGS
// ===============================
const updateSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { emailNotification, smsNotification, darkMode, language, timezone, } = req.body;
        const updatedSettings = yield Settings_1.default.findOneAndUpdate({}, {
            emailNotification,
            smsNotification,
            darkMode,
            language,
            timezone,
        }, {
            new: true,
            upsert: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            message: "Settings updated successfully",
            settings: updatedSettings,
        });
    }
    catch (error) {
        console.error("Update Settings Error:", error);
        res.status(500).json({
            success: false,
            message: error.message ||
                "Failed to update settings",
        });
    }
});
exports.updateSettings = updateSettings;
