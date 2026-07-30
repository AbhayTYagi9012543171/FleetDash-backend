// import mongoose, { Schema, Document } from "mongoose";

// export interface IGeofence extends Document {
//   name: string;
//   center: {
//     latitude: number;
//     longitude: number;
//   };
//   radius: number;
// }

// const GeofenceSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     center: {
//       latitude: {
//         type: Number,
//         required: true,
//       },

//       longitude: {
//         type: Number,
//         required: true,
//       },
//     },

//     radius: {
//       type: Number,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model<IGeofence>(
//   "Geofence",
//   GeofenceSchema
// );



import mongoose, { Schema, Document } from "mongoose";

export interface IGeofence extends Document {
  name: string;
  center: {
    latitude: number;
    longitude: number;
  };
  radius: number;
  createdAt: Date;
  updatedAt: Date;
}

const geofenceSchema = new Schema<IGeofence>(
  {
    name: {
      type: String,
      required: [true, "Geofence name is required"],
      trim: true,
      unique: true,
      maxlength: 100,
      index: true,
    },

    center: {
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

    radius: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for searching by location
geofenceSchema.index({
  "center.latitude": 1,
  "center.longitude": 1,
});

const Geofence = mongoose.model<IGeofence>(
  "Geofence",
  geofenceSchema
);

export default Geofence;