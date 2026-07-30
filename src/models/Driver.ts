// import mongoose, { Schema, Document } from "mongoose";

// export interface IDriver extends Document {
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   licenseNumber: string;
//   address: string;
//   experience: number;
//   status: "Available" | "Driving" | "On Leave";
//   assignedVehicle?: mongoose.Types.ObjectId;
// }

// const driverSchema = new Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },

//     phoneNumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     licenseNumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     address: {
//       type: String,
//       required: true,
//     },

//     experience: {
//       type: Number,
//       default: 0,
//     },

//     status: {
//       type: String,
//       enum: ["Available", "Driving", "On Leave"],
//       default: "Available",
//     },

//     assignedVehicle: {
//       type: Schema.Types.ObjectId,
//       ref: "Vehicle",
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model<IDriver>("Driver", driverSchema);




import mongoose, { Schema, Document } from "mongoose";

export interface IDriver extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  address: string;
  experience: number;
  status: "Available" | "Driving" | "On Leave";
  assignedVehicle?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const driverSchema = new Schema<IDriver>(
  {
    fullName: {
      type: String,
      required: [true, "Driver name is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
      index: true,
    },

    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [
        /^[0-9]{10}$/,
        "Phone number must be exactly 10 digits",
      ],
      index: true,
    },

    licenseNumber: {
      type: String,
      required: [true, "License number is required"],
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      maxlength: 250,
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
      max: 50,
    },

    status: {
      type: String,
      enum: ["Available", "Driving", "On Leave"],
      default: "Available",
      index: true,
    },

    assignedVehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Compound index
driverSchema.index({
  status: 1,
  assignedVehicle: 1,
});

const Driver = mongoose.model<IDriver>("Driver", driverSchema);

export default Driver;