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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
// GET USERS
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find()
            .sort({
            createdAt: -1
        });
        res.json({
            success: true,
            users
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
});
exports.getUsers = getUsers;
// CREATE USER
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.create(req.body);
        res.status(201).json({
            success: true,
            user
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User creation failed"
        });
    }
});
exports.createUser = createUser;
// UPDATE USER
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json({
            success: true,
            user
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Update failed"
        });
    }
});
exports.updateUser = updateUser;
// DELETE USER
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "User deleted"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Delete failed"
        });
    }
});
exports.deleteUser = deleteUser;
