const mongoose = require("mongoose")
const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    location:{
        type:String,
     
    },
    Website:{
        type:String,
     
    },
    logo:{
        type:String,
       
    },
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("company",companySchema)