import mongoose from "mongoose";

const adminSchema= new mongoose.Schema({
    adminname:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique:true
    },
    phone:{
        type: String,
        require: true,
        unique:true
    },
    password:{
        type: String,
        require: true
    },
    theatername:{
        type: String,
        require: true,
        unique:true
    },
    address:{
        type: String,
        require: true,
        unique:true
    },
  
}, {timestamps:true})

const Admin= mongoose.model("Admin", adminSchema)

export default Admin;