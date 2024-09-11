import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

// export const testUser= (req, res)=>{
//     res.send("test is working");
//   };

  //User Signup
  export const usersignup=async(req, res)=>{
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


  // User Signin
  export const usersignin=async(req, res)=>{
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

      // const token= jwt.sign(
      //   {id:validUser._id, email:validUser.email},
      //   process.env.JWT_SECRET,
      //   {expiresIn: '1h'}
      // );

      const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).send({ message: "JWT secret is not defined." });
    }

    const token = jwt.sign({ id: validUser._id }, jwtSecret, { expiresIn: '1h' });
    const { password: pass, ...userWithoutPassword } = validUser._doc;
    console.log(userWithoutPassword);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  
      sameSite: "strict",  
      maxAge: 3600000,  
    })
    .status(200)
    .json(userWithoutPassword);

      // res.status(200).send({ message: "User signed in successfully." , token});
     } catch(error){
      res.status(500).send({ message: "An error occurred during sign-in. Please try again later." + error }); 
     }
   }

   //Admin Signup
   export const adminsignup=async(req, res)=>{
    const 
    {adminname,
     email,
     phone, 
     password, 
     theatername, 
     address}=req.body;

     const salt=10;
     const hashedPassword= bcryptjs.hashSync(password, salt); 
     const newAdmin = new Admin({
      adminname, 
      email, 
      phone, 
      password: hashedPassword,
      theatername,
      address});
   try{
     await newAdmin.save();
    //  res.send("User Created Successfully.");
      res.status(201).json("Admin created Successfully")

    } catch(error){
        console.log("Sign-up error" + error );
        res.send(error);
    }
    res.send("Admin Signup working");
   }


   //Admin Signin
   export const adminsignin=async(req, res)=>{
   try{
    const {email, password}= req.body;
    const validAdmin= await Admin.findOne({email});

    if(!validAdmin)
      return res.status(401).send({message: "Invalid Email id."});

    const validPassword=bcryptjs.compareSync(password, validAdmin.password);

    if(!validPassword)
      return res.status(401).send({ message: "Invalid password." });


    const jwtSecret= process.env.JWT_SECRET;
    if(!jwtSecret)
        return res.status(500).send({message: "JWT secret is not define."});

    const token= jwt.sign(
      {id:validAdmin._id},
      jwtSecret,
      {expiresIn:'1h'}
    );

    const {password:pass, ...userWithoutPassword}= validAdmin._doc;
    console.log(userWithoutPassword);
    res.cookie("access_token", token,{
      httpOnly:true, 
      secure:process.env.NODE_ENV ===  "production",
      sameSite :"strict",
      maxAge:360000,
    })
    .status(200)
    .json(userWithoutPassword);
    // res.status(200).send({message: "Admin signed in successfully"});

}
catch(error){
  res.status(500).send({ message: "An error occurred during sign-in. Please try again later." + error }); 
 }
   }

   export const signout = async (req, res) => {
    try {
      res.clearCookie("access_token");
      await res.status(200).json("User has been logged out!");
    } catch (error) {
      res.send(error)
    }
  };


