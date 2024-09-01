import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const testUser= (req, res)=>{
    res.send("test is working");
  };

  export const signup=async(req, res)=>{
    const {username, email, phone, password} = req.body;
    const salt = 10;
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const newUser = new User({username, email, phone, password: hashedPassword});
   try{
    await newUser.save();
    //  res.send("User Created Successfully.");
    res.status(201).json("User created Successfully")

    } catch(error){
        console.log("Signup error" +error);
        res.send(error);
    }
  }

  export const signin=async(req, res)=>{
    try{
      res.send("User login Successfully.");
     } catch(error){
         console.log("Login error" +error);
     }
   }