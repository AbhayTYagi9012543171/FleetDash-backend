// import mongoose, { Schema, Document } from "mongoose";


// export interface ISettings extends Document {

//   emailNotification:boolean;

//   smsNotification:boolean;

//   darkMode:boolean;

//   language:string;

//   timezone:string;

// }



// const settingsSchema = new Schema<ISettings>(

// {

// emailNotification:{
//  type:Boolean,
//  default:true
// },


// smsNotification:{
//  type:Boolean,
//  default:false
// },


// darkMode:{
//  type:Boolean,
//  default:false
// },


// language:{
//  type:String,
//  default:"English"
// },


// timezone:{
//  type:String,
//  default:"Asia/Kolkata"
// }


// },

// {
// timestamps:true
// }

// );



// export default mongoose.model<ISettings>(
// "Settings",
// settingsSchema
// );




import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  emailNotification: boolean;
  smsNotification: boolean;
  darkMode: boolean;
  language: "English" | "Hindi";
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

const settingsSchema = new Schema<ISettings>(
  {
    emailNotification: {
      type: Boolean,
      default: true,
    },

    smsNotification: {
      type: Boolean,
      default: false,
    },

    darkMode: {
      type: Boolean,
      default: false,
    },

    language: {
      type: String,
      enum: ["English", "Hindi"],
      default: "English",
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Ensure only one settings document exists
settingsSchema.index({}, { unique: true });

const Settings = mongoose.model<ISettings>(
  "Settings",
  settingsSchema
);

export default Settings;