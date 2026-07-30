import mongoose, { Schema, Document } from "mongoose";


// ===============================
// User Interface
// ===============================

export interface IUser extends Document {

  username: string;

  phoneNumber: string;

  email: string;

  password: string;

  role: string;

  status: string;

  createdAt: Date;

  updatedAt: Date;

}



// ===============================
// User Schema
// ===============================

const UserSchema = new Schema<IUser>(

  {

    username: {

      type: String,

      required: true,

      trim: true,

      minlength: 3,

      maxlength: 50,

    },



    phoneNumber: {

      type: String,

      required: true,

      trim: true,

    },



    email: {

      type: String,

      required: true,

      unique: true,

      lowercase: true,

      trim: true,

    },



    password: {

      type: String,

      required: true,

      select: true,

    },



    role: {

      type: String,

      enum: [

        "Admin",

        "User",

      ],

      default: "Admin",

    },



    status: {

      type: String,

      enum: [

        "Active",

        "Inactive",

      ],

      default: "Active",

    },


  },

  {

    timestamps: true,

  }

);





// ===============================
// Export Model
// ===============================

const User = mongoose.model<IUser>(
  "User",
  UserSchema
);


export default User;