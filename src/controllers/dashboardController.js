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
exports.getDashboard = void 0;
const Vehicle_1 = __importDefault(require("../models/Vehicle"));
const Driver_1 = __importDefault(require("../models/Driver"));
const Alert_1 = __importDefault(require("../models/Alert"));
const Report_1 = __importDefault(require("../models/Report"));
const Trip_1 = __importDefault(require("../models/Trip"));
// ===============================
// Admin Dashboard
// ===============================
const getDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [totalVehicles, activeVehicles, idleVehicles, offlineVehicles, totalDrivers, activeAlerts, totalReports, tripsToday, distanceToday, fuelUsed] = yield Promise.all([
            // Vehicles
            Vehicle_1.default.countDocuments(),
            Vehicle_1.default.countDocuments({
                status: "Active"
            }),
            Vehicle_1.default.countDocuments({
                status: "Idle"
            }),
            Vehicle_1.default.countDocuments({
                status: "Offline"
            }),
            // Drivers
            Driver_1.default.countDocuments(),
            // Alerts
            Alert_1.default.countDocuments({
                status: "Active"
            }),
            // Reports
            Report_1.default.countDocuments(),
            // Trips Today
            Trip_1.default.countDocuments({
                createdAt: {
                    $gte: today
                }
            }),
            // Total Distance Today
            Trip_1.default.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: today
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$distance"
                        }
                    }
                }
            ]),
            // Fuel Used Today
            Trip_1.default.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: today
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$fuelUsed"
                        }
                    }
                }
            ])
        ]);
        const dashboard = {
            totalVehicles,
            activeVehicles,
            idleVehicles,
            offlineVehicles,
            inactiveVehicles: idleVehicles + offlineVehicles,
            totalDrivers,
            totalAlerts: activeAlerts,
            totalReports,
            // Fleet Summary
            tripsToday,
            distanceToday: ((_a = distanceToday[0]) === null || _a === void 0 ? void 0 : _a.total) || 0,
            fuelUsed: ((_b = fuelUsed[0]) === null || _b === void 0 ? void 0 : _b.total) || 0,
            fleetHealth: totalVehicles > 0
                ?
                    Number(((activeVehicles / totalVehicles)
                        *
                            100).toFixed(2))
                :
                    0
        };
        res.status(200).json({
            success: true,
            dashboard
        });
    }
    catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({
            success: false,
            message: error.message ||
                "Dashboard data failed"
        });
    }
});
exports.getDashboard = getDashboard;
