// // import mongoose, { Schema, Document } from "mongoose";

// // export interface ITrip extends Document {
// //   tripId: string;
// //   vehicle: mongoose.Types.ObjectId;
// //   driver: mongoose.Types.ObjectId;
// //   startLocation: string;
// //   endLocation: string;
// //   startLatitude: number;
// //   startLongitude: number;
// //   endLatitude: number;
// //   endLongitude: number;
// //   startTime: Date;
// //   endTime?: Date;
// //   distance: number;
// //   fuelUsed: number;
// //   averageSpeed: number;
// //   status: "Ongoing" | "Completed" | "Cancelled";
// // }

// // const tripSchema = new Schema(
// //   {
// //     tripId: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //       trim: true,
// //     },

// //     vehicle: {
// //       type: Schema.Types.ObjectId,
// //       ref: "Vehicle",
// //       required: true,
// //     },

// //     driver: {
// //       type: Schema.Types.ObjectId,
// //       ref: "Driver",
// //       required: true,
// //     },

// //     startLocation: {
// //       type: String,
// //       required: true,
// //     },

// //     endLocation: {
// //       type: String,
// //       required: true,
// //     },

// //     startLatitude: {
// //       type: Number,
// //       required: true,
// //     },

// //     startLongitude: {
// //       type: Number,
// //       required: true,
// //     },

// //     endLatitude: {
// //       type: Number,
// //       required: true,
// //     },

// //     endLongitude: {
// //       type: Number,
// //       required: true,
// //     },

// //     startTime: {
// //       type: Date,
// //       default: Date.now,
// //     },

// //     endTime: {
// //       type: Date,
// //     },

// //     distance: {
// //       type: Number,
// //       default: 0,
// //     },

// //     fuelUsed: {
// //       type: Number,
// //       default: 0,
// //     },

// //     averageSpeed: {
// //       type: Number,
// //       default: 0,
// //     },

// //     status: {
// //       type: String,
// //       enum: ["Ongoing", "Completed", "Cancelled"],
// //       default: "Ongoing",
// //     },
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );

// // export default mongoose.model<ITrip>("Trip", tripSchema);


// import mongoose, { Schema, Document } from "mongoose";

// export interface ITrip extends Document {
//   tripId: string;
//   vehicle: mongoose.Types.ObjectId;
//   driver: mongoose.Types.ObjectId;
//   startLocation: string;
//   endLocation: string;
//   startLatitude: number;
//   startLongitude: number;
//   endLatitude: number;
//   endLongitude: number;
//   startTime: Date;
//   endTime?: Date;
//   distance: number;
//   fuelUsed: number;
//   averageSpeed: number;
//   status: "Ongoing" | "Completed" | "Cancelled";
// }

// const tripSchema = new Schema<ITrip>(
//   {
//     tripId: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       uppercase: true,
//       index: true,
//     },

//     vehicle: {
//       type: Schema.Types.ObjectId,
//       ref: "Vehicle",
//       required: true,
//       index: true,
//     },

//     driver: {
//       type: Schema.Types.ObjectId,
//       ref: "Driver",
//       required: true,
//       index: true,
//     },

//     startLocation: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     endLocation: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     startLatitude: {
//       type: Number,
//       required: true,
//       min: -90,
//       max: 90,
//     },

//     startLongitude: {
//       type: Number,
//       required: true,
//       min: -180,
//       max: 180,
//     },

//     endLatitude: {
//       type: Number,
//       required: true,
//       min: -90,
//       max: 90,
//     },

//     endLongitude: {
//       type: Number,
//       required: true,
//       min: -180,
//       max: 180,
//     },

//     startTime: {
//       type: Date,
//       default: Date.now,
//       required: true,
//     },

//     endTime: {
//       type: Date,
//     },

//     distance: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     fuelUsed: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     averageSpeed: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     status: {
//       type: String,
//       enum: ["Ongoing", "Completed", "Cancelled"],
//       default: "Ongoing",
//       index: true,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// );

// // Compound index
// tripSchema.index({ vehicle: 1, startTime: -1 });

// const Trip = mongoose.model<ITrip>("Trip", tripSchema);

// export default Trip;




import mongoose, { Schema, Document } from "mongoose";


export interface ITrip extends Document {

  tripId: string;

  vehicle: mongoose.Types.ObjectId;

  driver: mongoose.Types.ObjectId;

  startLocation: string;

  endLocation: string;

  startLatitude: number;

  startLongitude: number;

  endLatitude: number;

  endLongitude: number;

  startTime: Date;

  endTime?: Date | null;

  distance: number;

  fuelUsed: number;

  averageSpeed: number;

  status:
    | "Ongoing"
    | "Completed"
    | "Cancelled";

  createdAt: Date;

  updatedAt: Date;

}



const tripSchema = new Schema<ITrip>(

  {

    tripId: {

      type: String,

      required: [
        true,
        "Trip ID is required"
      ],

      unique: true,

      trim: true,

      uppercase: true,

    },


    vehicle: {

      type: Schema.Types.ObjectId,

      ref: "Vehicle",

      required: true,

    },


    driver: {

      type: Schema.Types.ObjectId,

      ref: "Driver",

      required: true,

    },


    startLocation: {

      type: String,

      required: [
        true,
        "Start location is required"
      ],

      trim: true,

    },


    endLocation: {

      type: String,

      required: [
        true,
        "End location is required"
      ],

      trim: true,

    },


    startLatitude: {

      type: Number,

      required: true,

      min: -90,

      max: 90,

    },


    startLongitude: {

      type: Number,

      required: true,

      min: -180,

      max: 180,

    },


    endLatitude: {

      type: Number,

      required: true,

      min: -90,

      max: 90,

    },


    endLongitude: {

      type: Number,

      required: true,

      min: -180,

      max: 180,

    },


    startTime: {

      type: Date,

      default: Date.now,

    },


    endTime: {

      type: Date,

      default: null,

    },


    distance: {

      type: Number,

      default: 0,

      min: 0,

    },


    fuelUsed: {

      type: Number,

      default: 0,

      min: 0,

    },


    averageSpeed: {

      type: Number,

      default: 0,

      min: 0,

    },


    status: {

      type: String,

      enum: [
        "Ongoing",
        "Completed",
        "Cancelled"
      ],

      default: "Ongoing",

    },


  },

  {

    timestamps: true,

    versionKey: false,

  }

);



// ===============================
// Database Indexes
// ===============================

tripSchema.index({
  vehicle: 1,
  startTime: -1
});


tripSchema.index({
  driver: 1,
  startTime: -1
});


tripSchema.index({
  status: 1
});



const Trip = mongoose.model<ITrip>(
  "Trip",
  tripSchema
);


export default Trip;