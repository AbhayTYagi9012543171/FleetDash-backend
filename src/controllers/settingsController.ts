// import { Request, Response } from "express";
// import Settings from "../models/Settings";



// // GET SETTINGS

// export const getSettings = async(
// req:Request,
// res:Response
// )=>{


// try{


// let settings =
// await Settings.findOne();



// if(!settings){

// settings =
// await Settings.create({});

// }



// res.json({

// success:true,

// settings

// });


// }

// catch(error){

// res.status(500).json({

// success:false,

// message:"Failed to get settings"

// });

// }


// };








// // UPDATE SETTINGS


// export const updateSettings = async(

// req:Request,

// res:Response

// )=>{


// try{


// const settings =

// await Settings.findOneAndUpdate(

// {},

// req.body,

// {
// new:true,
// upsert:true
// }

// );



// res.json({

// success:true,

// settings

// });


// }

// catch(error){


// res.status(500).json({

// success:false,

// message:"Failed to update settings"

// });


// }


// };




import { Request, Response } from "express";
import Settings from "../models/Settings";


// ===============================
// GET SETTINGS
// ===============================
export const getSettings = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    let settings = await Settings.findOne();


    // Create default settings if not exists
    if (!settings) {

      settings = await Settings.create({
        emailNotification: true,
        smsNotification: false,
        darkMode: false,
        language: "English",
        timezone: "Asia/Kolkata",
      });

    }


    res.status(200).json({

      success: true,

      settings,

    });


  } catch (error: any) {

    console.error(
      "Get Settings Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        error.message || "Failed to get settings",

    });

  }

};





// ===============================
// UPDATE SETTINGS
// ===============================
export const updateSettings = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {


    const {
      emailNotification,
      smsNotification,
      darkMode,
      language,
      timezone,
    } = req.body;



    const updatedSettings =
      await Settings.findOneAndUpdate(

        {},

        {
          emailNotification,
          smsNotification,
          darkMode,
          language,
          timezone,
        },

        {
          new: true,
          upsert: true,
          runValidators: true,
        }

      );



    res.status(200).json({

      success: true,

      message:
        "Settings updated successfully",

      settings:
        updatedSettings,

    });



  } catch (error: any) {


    console.error(
      "Update Settings Error:",
      error
    );


    res.status(500).json({

      success:false,

      message:
        error.message ||
        "Failed to update settings",

    });


  }

};