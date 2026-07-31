"use strict";
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
exports.deleteTrip = exports.updateTrip = exports.getTripById = exports.getRecentTrips = exports.getTrips = exports.createTrip = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Trip_1 = __importDefault(require("../models/Trip"));
// ===============================
// Create Trip
// ===============================
// ===============================
// Create Trip
// ===============================
const createTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Incoming Trip Data:", req.body);
        const trip = yield Trip_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: "Trip created successfully",
            trip
        });
    }
    catch (error) {
        console.error("Create Trip Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.createTrip = createTrip;
// ===============================
// Get All Trips
// ===============================
const getTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trips = yield Trip_1.default.find()
            .populate("vehicle", "vehicleNumber")
            .populate("driver", "fullName")
            .sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            trips
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.getTrips = getTrips;
// ===============================
// Recent Trips Dashboard
// ===============================
const getRecentTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trips = yield Trip_1.default.find()
            .populate("vehicle", "vehicleNumber")
            .populate("driver", "fullName")
            .sort({
            createdAt: -1
        })
            .limit(5);
        res.status(200).json({
            success: true,
            trips
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.getRecentTrips = getRecentTrips;
// ===============================
// Get Single Trip
// ===============================
const getTripById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid Trip ID"
            });
            return;
        }
        const trip = yield Trip_1.default.findById(id)
            .populate("vehicle", "vehicleNumber")
            .populate("driver", "fullName");
        if (!trip) {
            res.status(404).json({
                success: false,
                message: "Trip not found"
            });
            return;
        }
        res.json({
            success: true,
            trip
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.getTripById = getTripById;
// ===============================
// Update Trip
// ===============================
const updateTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid Trip ID"
            });
            return;
        }
        const trip = yield Trip_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!trip) {
            res.status(404).json({
                success: false,
                message: "Trip not found"
            });
            return;
        }
        res.json({
            success: true,
            message: "Trip updated successfully",
            trip
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.updateTrip = updateTrip;
// ===============================
// Delete Trip
// ===============================
const deleteTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid Trip ID"
            });
            return;
        }
        const trip = yield Trip_1.default.findByIdAndDelete(id);
        if (!trip) {
            res.status(404).json({
                success: false,
                message: "Trip not found"
            });
            return;
        }
        res.json({
            success: true,
            message: "Trip deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.deleteTrip = deleteTrip;
