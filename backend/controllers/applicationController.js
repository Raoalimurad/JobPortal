const applicationModel = require("../models/ApplicationSchema");
const jobModel = require("../models/jobSchema");


const applyJob = async (req,res)=>{
    try {
        const userId = req.id
        const jobId  = req.params.id 

        if(!jobId){
            return res.status(400).json({
                message:"id is required",
                success:false
            })
        }
        // check existing user
        const existingUser = await applicationModel.findOne({job:jobId,applicant:userId})
        if(existingUser){
            return res.status(409).json({
                message:"you already applied here",
                success:false
            })
        }
    //    check job exist 
        const job = await jobModel.findById(jobId)
        if(!job){
           return res.status(404).json({
                message:"job not found",
                success:false
            })
        }

        // create a new applicant
        const newApplicant = new applicationModel({
            job:jobId,
            applicant:userId
        })
        await newApplicant.save();
        job.applications.push(newApplicant._id)
        await job.save();
        res.status(201).json({
            success:true,
            message:"job applied successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:"server error ",
            error:error.message
        })
    }
}

// get all applied jobs

const getAppliedJobs = async (req,res)=>{
    try {
        const id = req.id
    const applications = await applicationModel.find({applicant:id}).sort({createdAt:-1}).populate({
        path:"job",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"company",
            options:{sort:{createdAt:-1}},
        }
    })
      if(!applications){
        return res.status(404).json({
            success:false,
            message:"application not found"
        })
      }
      return res.status(200).json({
        success:true,
        applications
      })
    } catch (error) {
        return res.status(500).json({
            message:"server error ",
            error:error.message
        })
    }
}


// admin check how many user applay
const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await jobModel.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
               
            }
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const updateStatus = async(req,res)=>{
    try {
        const id = req.params.id
         const {status} = req.body

         if(!status){
            return res.status(400).json({
                message:"status is required",
                success:false
            }) 
         }
         const application = await applicationModel.findByIdAndUpdate(id,{status:status},{new:true})
         if(!application){
            return res.status(404).json({
                message:"application not found",
                success:false
            }) 
         }
         return res.status(200).json({
            success:true,
            message:"status updated successfully",
            application
          })
    } catch (error) {
        return res.status(500).json({
            message:"server error ",
            error:error.message
        })
    }
}
module.exports =  {getAppliedJobs,applyJob,getApplicants,updateStatus}