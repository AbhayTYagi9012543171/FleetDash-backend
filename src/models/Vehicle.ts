// import mongoose from "mongoose";


// const vehicleSchema = new mongoose.Schema(

//   {

//     vehicleNumber: {
//       type: String,
//       required: true,
//       unique: true
//     },


//     driver: {
//       type: String,
//       required: true
//     },


//     speed: {
//       type: Number,
//       default: 0
//     },


//     fuel: {
//       type: Number,
//       default: 100
//     },


//     status: {
//       type: String,
//       enum: [
//         "Active",
//         "Idle",
//         "Offline"
//       ],
//       default: "Idle"
//     },


//     latitude: {
//       type: Number,
//       required: true
//     },


//     longitude: {
//       type: Number,
//       required: true
//     },


//   },

//   {
//     timestamps: true
//   }

// );



// const Vehicle = mongoose.model(
//   "Vehicle",
//   vehicleSchema
// );


// export default Vehicle;/



import mongoose, { Schema, Document } from "mongoose";

export interface IVehicle extends Document {
  vehicleNumber: string;
  driver?: mongoose.Types.ObjectId;
  speed: number;
  fuel: number;
  status: "Active" | "Idle" | "Offline";
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
}

const vehicleSchema = new Schema<IVehicle>(
  {
    vehicleNumber: {
      type: String,
      required: [true, "Vehicle number is required"],
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },

    driver: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
      index: true,
    },

    speed: {
      type: Number,
      default: 0,
      min: 0,
      max: 300,
    },

    fuel: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["Active", "Idle", "Offline"],
      default: "Idle",
      index: true,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Compound index for map queries
vehicleSchema.index({
  status: 1,
  latitude: 1,
  longitude: 1,
});

const Vehicle = mongoose.model<IVehicle>(
  "Vehicle",
  vehicleSchema
);

export default Vehicle;