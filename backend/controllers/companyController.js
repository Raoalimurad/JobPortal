const companySchema = require("../models/compnaySchema");
const cloudinary = require("../Cloudinary/Cloudinary");
const fs = require("fs")

const  registrationCompany = async (req,res)=>{
    try {
        const {companyName} = req.body
         console.log(companyName)
        // check field is provided  
        if(!companyName){
          return  res.status(400).json({
                message:"company name is required",
                success:false
            })
        }
        
        const checkCompany = await companySchema.findOne({name:companyName})
        if(checkCompany){
          return  res.status(409).json({
                message:"this company is already register",
                success:false
            })
        }
        const company = new companySchema({name:companyName,UserId:req.id})
        await company.save()
        res.status(200).json({
            message:"company register successfully",
            success:true,
            company
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error during company registration",
            success: false,
            error:error.message
        });
    }
}


// get all company with the base of userID

const getCompany = async (req,res)=>{
    try {
        const UserId = req.id
        if(!UserId){
          return  res.status(400).json({
                message:"id is missing",
                success:false
            })
        }
        const company = await companySchema.find({UserId})
        if(!company){
           return res.status(404).json({
                message:"company not found",
                success:false
            })
        }
        res.status(200).json({
           success:true,
           company
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error ",
            success: false,
            error:error.message
        });
    }
}


// get company by own company id

const getCompanyById = async(req,res)=>{
    const id = req.params.id
    try {
        if(!id){
            return res.status(400).json({
                message:'id is required',
                success:false
            })
        }
        const company = await companySchema.findById(id)
        if(!company){
            return res.status(404).json({
                message:'company not found',
                success:false
            })
        }
        res.status(200).json({
            success:true,
            company
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error ",
            success: false,
            error:error.message
        });
    }
}

// update company

const updateCompany = async (req,res)=>{
    try {
        const {name,description,location,Website} = req.body
    const file = req.file
        
          
    // cloduinary
    const filePath  = file?.path
   
    
    let cloudResponse = null
    if(filePath){
        cloudResponse = await cloudinary.uploader.upload(filePath,{
            folder: 'logos',
            resource_type: 'image',
            type: 'upload',
        })
     
    }
    
    const update = {name,description,location,Website,logo:cloudResponse?.secure_url}
    const company = await companySchema.findByIdAndUpdate(req.params.id,update,{new:true})
    if(!company){
        return res.status(404).json({
            message:"company not found",
            success:false
        })
    }

    res.status(200).json({
        success:true,
        company
    })

    } catch (error) {
        res.status(500).json({
            message: "Server error ",
            success: false,
            error:error.message
        });
    }
}

module.exports = {registrationCompany,getCompany,getCompanyById,updateCompany}