// import mongoose, { Schema, Document } from "mongoose";

// export interface IReport extends Document {
//   title: string;
//   reportType:
//     | "Daily"
//     | "Weekly"
//     | "Monthly"
//     | "Vehicle"
//     | "Driver"
//     | "Fuel";

//   vehicle?: mongoose.Types.ObjectId;

//   driver?: mongoose.Types.ObjectId;

//   description: string;

//   generatedBy: string;

//   createdAt: Date;
// }

// const reportSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },

//     reportType: {
//       type: String,
//       enum: [
//         "Daily",
//         "Weekly",
//         "Monthly",
//         "Vehicle",
//         "Driver",
//         "Fuel",
//       ],
//       required: true,
//     },

//     vehicle: {
//       type: Schema.Types.ObjectId,
//       ref: "Vehicle",
//     },

//     driver: {
//       type: Schema.Types.ObjectId,
//       ref: "Driver",
//     },

//     description: {
//       type: String,
//       required: true,
//     },

//     generatedBy: {
//       type: String,
//       default: "Admin",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model<IReport>(
//   "Report",
//   reportSchema
// );



import mongoose, { Schema, Document } from "mongoose";

export interface IReport extends Document {
  title: string;

  reportType:
    | "Daily"
    | "Weekly"
    | "Monthly"
    | "Vehicle"
    | "Driver"
    | "Fuel";

  vehicle?: mongoose.Types.ObjectId;

  driver?: mongoose.Types.ObjectId;

  description: string;

  generatedBy: string;

  createdAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<IReport>(
  {
    title: {
      type: String,
      required: [true, "Report title is required"],
      trim: true,
      maxlength: 150,
      index: true,
    },

    reportType: {
      type: String,
      required: true,
      enum: [
        "Daily",
        "Weekly",
        "Monthly",
        "Vehicle",
        "Driver",
        "Fuel",
      ],
      index: true,
    },

    vehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null,
      index: true,
    },

    driver: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
      index: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 2000,
    },

    generatedBy: {
      type: String,
      default: "Admin",
      trim: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes for faster queries
reportSchema.index({ reportType: 1, createdAt: -1 });
reportSchema.index({ vehicle: 1, createdAt: -1 });
reportSchema.index({ driver: 1, createdAt: -1 });

const Report = mongoose.model<IReport>(
  "Report",
  reportSchema
);

export default Report;