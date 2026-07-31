"use strict";
// import Vehicle from "../models/Vehicle";
// import Driver from "../models/Driver";
// import Alert from "../models/Alert";
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
exports.getAnalytics = void 0;
const Vehicle_1 = __importDefault(require("../models/Vehicle"));
const Driver_1 = __importDefault(require("../models/Driver"));
const Alert_1 = __importDefault(require("../models/Alert"));
const Report_1 = __importDefault(require("../models/Report"));
const getAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [totalVehicles, activeVehicles, idleVehicles, offlineVehicles, totalDrivers, totalAlerts, totalReports,] = yield Promise.all([
            Vehicle_1.default.countDocuments(),
            Vehicle_1.default.countDocuments({ status: "Active" }),
            Vehicle_1.default.countDocuments({ status: "Idle" }),
            Vehicle_1.default.countDocuments({ status: "Offline" }),
            Driver_1.default.countDocuments(),
            Alert_1.default.countDocuments(),
            Report_1.default.countDocuments(),
        ]);
        const analytics = {
            totalVehicles,
            activeVehicles,
            idleVehicles,
            offlineVehicles,
            totalDrivers,
            totalAlerts,
            totalReports,
            vehicleUtilization: totalVehicles > 0
                ? Number(((activeVehicles / totalVehicles) * 100).toFixed(2))
                : 0,
            alertRate: totalVehicles > 0
                ? Number(((totalAlerts / totalVehicles) * 100).toFixed(2))
                : 0,
        };
        res.status(200).json({
            success: true,
            analytics,
        });
    }
    catch (error) {
        console.error("Analytics Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch analytics",
        });
    }
});
exports.getAnalytics = getAnalytics;
