import {Request,Response} from "express";

import User from "../models/User";




// GET USERS

export const getUsers = async(
req:Request,
res:Response
)=>{


try{


const users =
await User.find()
.sort({
createdAt:-1
});


res.json({

success:true,

users

});


}
catch(error){


res.status(500).json({

success:false,

message:"Failed to fetch users"

});


}


};







// CREATE USER


export const createUser = async(

req:Request,

res:Response

)=>{


try{


const user =
await User.create(
req.body
);



res.status(201).json({

success:true,

user

});


}
catch(error){


res.status(500).json({

success:false,

message:"User creation failed"

});


}


};







// UPDATE USER


export const updateUser = async(

req:Request,

res:Response

)=>{


try{


const user =
await User.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);



res.json({

success:true,

user

});


}
catch(error){


res.status(500).json({

success:false,

message:"Update failed"

});


}


};








// DELETE USER


export const deleteUser = async(

req:Request,

res:Response

)=>{


try{


await User.findByIdAndDelete(
req.params.id
);



res.json({

success:true,

message:"User deleted"

});


}
catch(error){


res.status(500).json({

success:false,

message:"Delete failed"

});


}


};