import { Request, Response } from "express";
import mongoose from "mongoose";

import Trip from "../models/Trip";



// ===============================
// Create Trip
// ===============================

// ===============================
// Create Trip
// ===============================

export const createTrip = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    console.log("Incoming Trip Data:", req.body);


    const trip = await Trip.create(req.body);


    res.status(201).json({

      success: true,

      message: "Trip created successfully",

      trip

    });


  } catch (error: any) {


    console.error("Create Trip Error:", error);


    res.status(500).json({

      success: false,

      message: error.message

    });


  }

};





// ===============================
// Get All Trips
// ===============================

export const getTrips = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const trips = await Trip.find()

      .populate(
        "vehicle",
        "vehicleNumber"
      )

      .populate(
        "driver",
        "fullName"
      )

      .sort({
        createdAt: -1
      });



    res.status(200).json({

      success: true,

      trips

    });



  }
  catch (error: any) {


    res.status(500).json({

      success: false,

      message: error.message

    });


  }


};






// ===============================
// Recent Trips Dashboard
// ===============================

export const getRecentTrips = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const trips = await Trip.find()

      .populate(
        "vehicle",
        "vehicleNumber"
      )

      .populate(
        "driver",
        "fullName"
      )

      .sort({

        createdAt: -1

      })

      .limit(5);



    res.status(200).json({

      success: true,

      trips

    });


  }
  catch (error: any) {


    res.status(500).json({

      success: false,

      message: error.message

    });


  }


};






// ===============================
// Get Single Trip
// ===============================

export const getTripById = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const id = String(req.params.id);



    if (!mongoose.Types.ObjectId.isValid(id)) {


      res.status(400).json({

        success: false,

        message: "Invalid Trip ID"

      });


      return;

    }




    const trip =
      await Trip.findById(id)

        .populate(
          "vehicle",
          "vehicleNumber"
        )

        .populate(
          "driver",
          "fullName"
        );




    if (!trip) {


      res.status(404).json({

        success: false,

        message: "Trip not found"

      });


      return;

    }




    res.json({

      success: true,

      trip

    });



  }
  catch (error: any) {


    res.status(500).json({

      success: false,

      message: error.message

    });


  }


};







// ===============================
// Update Trip
// ===============================

export const updateTrip = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const id = String(req.params.id);



    if (!mongoose.Types.ObjectId.isValid(id)) {


      res.status(400).json({

        success: false,

        message: "Invalid Trip ID"

      });


      return;

    }




    const trip =

      await Trip.findByIdAndUpdate(

        id,

        req.body,

        {

          new: true,

          runValidators: true

        }

      );




    if (!trip) {


      res.status(404).json({

        success: false,

        message: "Trip not found"

      });


      return;

    }




    res.json({

      success: true,

      message: "Trip updated successfully",

      trip

    });


  }
  catch (error: any) {


    res.status(500).json({

      success: false,

      message: error.message

    });


  }


};








// ===============================
// Delete Trip
// ===============================

export const deleteTrip = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const id = String(req.params.id);



    if (!mongoose.Types.ObjectId.isValid(id)) {


      res.status(400).json({

        success: false,

        message: "Invalid Trip ID"

      });


      return;

    }




    const trip =

      await Trip.findByIdAndDelete(id);




    if (!trip) {


      res.status(404).json({

        success: false,

        message: "Trip not found"

      });


      return;

    }




    res.json({

      success: true,

      message: "Trip deleted successfully"

    });



  }
  catch (error: any) {


    res.status(500).json({

      success: false,

      message: error.message

    });


  }


};