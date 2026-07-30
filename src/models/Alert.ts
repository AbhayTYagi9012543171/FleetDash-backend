// import mongoose, { Schema, Document } from "mongoose";

// export interface IAlert extends Document {
//   vehicle: mongoose.Types.ObjectId;
//   driver?: mongoose.Types.ObjectId;

//   alertType:
//     | "Overspeed"
//     | "Fuel Low"
//     | "Geofence Exit"
//     | "Geofence Entry"
//     | "Engine Warning"
//     | "SOS";

//   severity: "Low" | "Medium" | "High" | "Critical";

//   message: string;

//   location: string;

//   latitude: number;

//   longitude: number;

//   status: "Active" | "Resolved";

//   createdAt: Date;
//   updatedAt: Date;
// }

// const alertSchema = new Schema(
//   {
//     vehicle: {
//       type: Schema.Types.ObjectId,
//       ref: "Vehicle",
//       required: true,
//     },

//     driver: {
//       type: Schema.Types.ObjectId,
//       ref: "Driver",
//       default: null,
//     },

//     alertType: {
//       type: String,
//       enum: [
//         "Overspeed",
//         "Fuel Low",
//         "Geofence Exit",
//         "Geofence Entry",
//         "Engine Warning",
//         "SOS",
//       ],
//       required: true,
//     },

//     severity: {
//       type: String,
//       enum: ["Low", "Medium", "High", "Critical"],
//       default: "Low",
//     },

//     message: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     location: {
//       type: String,
//       required: true,
//     },

//     latitude: {
//       type: Number,
//       default: 0,
//     },

//     longitude: {
//       type: Number,
//       default: 0,
//     },

//     status: {
//       type: String,
//       enum: ["Active", "Resolved"],
//       default: "Active",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model<IAlert>("Alert", alertSchema);




import mongoose, { Schema, Document } from "mongoose";

export interface IAlert extends Document {
  vehicle: mongoose.Types.ObjectId;
  driver?: mongoose.Types.ObjectId;

  alertType:
    | "Overspeed"
    | "Fuel Low"
    | "Geofence Exit"
    | "Geofence Entry"
    | "Engine Warning"
    | "SOS";

  severity: "Low" | "Medium" | "High" | "Critical";

  message: string;

  location: string;

  latitude: number;

  longitude: number;

  status: "Active" | "Resolved";

  createdAt: Date;
  updatedAt: Date;
}

const alertSchema = new Schema<IAlert>(
  {
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },

    driver: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
      index: true,
    },

    alertType: {
      type: String,
      required: true,
      enum: [
        "Overspeed",
        "Fuel Low",
        "Geofence Exit",
        "Geofence Entry",
        "Engine Warning",
        "SOS",
      ],
      index: true,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Low",
      index: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },

    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },

    status: {
      type: String,
      enum: ["Active", "Resolved"],
      default: "Active",
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Compound indexes
alertSchema.index({ vehicle: 1, createdAt: -1 });
alertSchema.index({ status: 1, severity: 1 });

const Alert = mongoose.model<IAlert>("Alert", alertSchema);

export default Alert;