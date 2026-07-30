// import mongoose from "mongoose";


// const connectDB = async (): Promise<void> => {

//     try {

//         await mongoose.connect(
//             process.env.MONGO_URI as string
//         );


//         console.log(
//             "MongoDB Connected"
//         );


//     } catch (error) {

//         console.log(
//             "MongoDB Connection Failed",
//             error
//         );

//         process.exit(1);

//     }

// };


// export default connectDB;




import mongoose from "mongoose";


const connectDB = async (): Promise<void> => {

  try {

    const mongoURI = process.env.MONGO_URI;


    if (!mongoURI) {

      console.error(
        "❌ MONGO_URI is missing in environment variables"
      );

      process.exit(1);

    }


    await mongoose.connect(
      mongoURI
    );


    console.log(
      "✅ MongoDB Connected"
    );


  } catch (error: any) {


    console.error(
      "❌ MongoDB Connection Failed:",
      error.message
    );


    process.exit(1);

  }

};


export default connectDB;