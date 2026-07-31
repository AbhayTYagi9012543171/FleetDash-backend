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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// ===============================
// Register User
// ===============================
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, phoneNumber, email, password } = req.body;
        // Validation
        if (!username ||
            !phoneNumber ||
            !email ||
            !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            });
            return;
        }
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = yield User_1.default.findOne({
            email: normalizedEmail
        });
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: "User already exists"
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield User_1.default.create({
            username: username.trim(),
            phoneNumber: phoneNumber.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: "Admin",
            status: "Active"
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                status: user.status
            }
        });
    }
    catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({
            success: false,
            message: error.message ||
                "Server error"
        });
    }
});
exports.register = register;
// ===============================
// Login User
// ===============================
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // ===============================
        // Validation
        // ===============================
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
            return;
        }
        // ===============================
        // Normalize Email
        // ===============================
        const normalizedEmail = email.toLowerCase().trim();
        // ===============================
        // Find User
        // ===============================
        const user = yield User_1.default.findOne({
            email: normalizedEmail,
        });
        if (!user) {
            console.log("❌ User not found:", normalizedEmail);
            res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
            return;
        }
        console.log("✅ User found:", user.email);
        // ===============================
        // Check Password
        // ===============================
        if (!user.password) {
            console.log("❌ Password missing:", user.email);
            res.status(400).json({
                success: false,
                message: "Password not stored for this user",
            });
            return;
        }
        console.log("========== PASSWORD CHECK ==========");
        console.log("Email:", user.email);
        console.log("Stored password:", user.password);
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        console.log("Password match:", passwordMatch);
        if (!passwordMatch) {
            console.log("❌ Password does not match");
            res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
            return;
        }
        console.log("✅ Password matched");
        // ===============================
        // JWT Secret
        // ===============================
        if (!process.env.JWT_SECRET) {
            console.log("❌ JWT_SECRET missing");
            res.status(500).json({
                success: false,
                message: "JWT_SECRET missing",
            });
            return;
        }
        // ===============================
        // Generate Token
        // ===============================
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        // ===============================
        // Success
        // ===============================
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                status: user.status,
            },
        });
    }
    catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server error",
        });
    }
});
exports.login = login;
