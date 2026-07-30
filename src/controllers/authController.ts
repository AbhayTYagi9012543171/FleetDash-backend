import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User";


// ===============================
// Register User
// ===============================

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      username,
      phoneNumber,
      email,
      password
    } = req.body;



    // Validation

    if(
      !username ||
      !phoneNumber ||
      !email ||
      !password
    ){

      res.status(400).json({

        success:false,

        message:"All fields are required"

      });

      return;

    }




    const normalizedEmail =
      email.toLowerCase().trim();




    const existingUser =
      await User.findOne({
        email:normalizedEmail
      });



    if(existingUser){

      res.status(409).json({

        success:false,

        message:"User already exists"

      });

      return;

    }





    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );





    const user =
      await User.create({

        username:
        username.trim(),

        phoneNumber:
        phoneNumber.trim(),

        email:
        normalizedEmail,

        password:
        hashedPassword,


        role:"Admin",

        status:"Active"

      });







    res.status(201).json({

      success:true,

      message:
      "User registered successfully",


      user:{

        _id:user._id,

        username:user.username,

        email:user.email,

        phoneNumber:user.phoneNumber,

        role:user.role,

        status:user.status

      }


    });



  }
  catch(error:any){


    console.error(
      "Register Error:",
      error
    );


    res.status(500).json({

      success:false,

      message:
      error.message ||
      "Server error"

    });


  }


};







// ===============================
// Login User
// ===============================


export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    const user = await User.findOne({
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

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

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
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

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

  } catch (error: any) {
    console.error("❌ Login Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};