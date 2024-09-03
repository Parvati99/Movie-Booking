import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const testUser= (req, res)=>{
    res.send("test is working");
  };

  export const signup=async(req, res)=>{
    const {username, email, phone, password} = req.body;
    const salt = 10;
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const newUser = new User({username, email, phone, password: hashedPassword,});
   try{
     await newUser.save();
    //  res.send("User Created Successfully.");
      res.status(201).json("User created Successfully")

    } catch(error){
        console.log("Sign-up error" + error );
        res.send(error);
    }
  }

  export const signin=async(req, res)=>{
    try{
      const {email, password}= req.body;
      const validUser= await User.findOne({email});
      if(!validUser)
      {
        return res.status(401).send({ message: "Invalid email." });
        // res.send("Invalid email Id");
      }
      
      const validPassword= bcryptjs.compareSync(password, validUser.password);
      if(!validPassword)
        return res.status(401).send({ message: "Invalid password." });

      res.status(200).send({ message: "User signed in successfully." });
     } catch(error){
      res.status(500).send({ message: "An error occurred during sign-in. Please try again later." + error }); 
     }
   }