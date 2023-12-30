import asyncHandler from "express-async-handler"
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utility/generateToken.js"

const registerUser = asyncHandler(async(req,res) => {
 //get the data
  const { name, email, password, pic } = req.body;

//validation
  if (!name || !email || !password) {
      console.log("All fields are required!!")
      throw new Error("All fields are required!")
  }

//check if user is already exist or not
 const existingUser = await User.findOne({ email });
 if (existingUser) {
      console.log("User is already exist")
      throw new Error("User is already exist!! ")
 }

//hashed a password
 const hashedPassword = await bcrypt.hash(password,10);

 //Create a new user
 const user = User.create({
      name,
      email,
      password:hashedPassword ,
      pic
 })

 if (user) {
     res
     .status(200)
     .json({
         _id:user._id,
         name:user.name,
         email:user.email,
         pic:user.pic,
         token: generateToken(user._id)
     }) ;
     console.log("User created successfully!!")
 } else {
        res.status(400);
        throw new Error("User failed to create!")
 }

})

const loginUser = asyncHandler(async(req,res) => {
 //get the data
 const { email, password } = req.body;

//find the user in db
 const user = await User.findOne({ email });
 if (!user) {
      console.log("User not found");
      throw new Error("User not found")
 }

//check password
const isMatch = await bcrypt.compare(password,user.password)

 if (user && isMatch) {
      res
     .status(200)
     .json({
     	   success:true,
         _id:user._id,
         name:user.name,
         email:user.email,
         pic:user.pic,
         token: generateToken(user._id)
     }) ;
     console.log("User Logged successfully!!")
 }

 })

///api/user?search=unknown
 const allUser = asyncHandler(async(req,res) => {
      const keyword = req.query.search? {
            $or:[
                 { name: { $regex: req.query.search, $options: "i" } },
                 { email: { $regex: req.query.search, $options: "i" } },
            ]
      } : { };

      const users = await User.find(keyword).find({ _id:{ $ne: req.user._id } });
      res.send(users);

       });

export {
     registerUser,
     loginUser,
     allUser
}