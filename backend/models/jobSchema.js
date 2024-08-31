const { application } = require("express")
const mongoose = require("mongoose")
const jobSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    Salary:{
      type:String,
      required:true
    },
    requirments:[{
      type:String,
    }],
    location:{
      type:String,
      required:true
    },
    jobType:{
      type:String,
      required:true
    },
    experienceLevel:{
      type:Number,
      required:true
    },
     position:{
        type:Number,
        required:true 
     },
     company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'company',
        required:true
     },
     created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
     },
     applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'applications',
     }]
},{timestamps:true})

module.exports = mongoose.model("jobs",jobSchema)