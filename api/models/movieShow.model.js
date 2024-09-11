import mongoose from "mongoose";

const showSchema= new mongoose.Schema({
    adminId:{
        type:String,
        require:true,
    },
    movieName:{
        type:String,
        require:true,
        unique:true,
    },
    date:{
        type: String,
        require:true,
    },
    time:{
        type: String,
        require:true,
    },
    price:{
        type: String,
        require:true,
    },
    seat:{
        type: [Number],
        default:Array(100).fill(false),
    }
}, {timestamps:true})

const Show=mongoose.model("Show", showSchema)

export default Show;