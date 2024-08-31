const jobModel = require("../models/jobSchema");

// registration

const jobRegister = async (req, res) => {
    try {
        const { title, description, Salary, requirments, location, jobType, experience, position, companyId } = req.body
        const UserId = req.id
      
        if (!title || !UserId || !description || !Salary || !requirments || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "something is missing",
                success: false
            })
        }

        const job = new jobModel({
            title,
            description,
            Salary: Number(Salary),
            requirments: requirments.split(","),
            location,
            experienceLevel: experience,
            position,
            company: companyId,
            jobType,
            created_by: UserId
        })
        await job.save()

        return res.status(201).json({ message: "Job created successfully", success: true, job });
    } catch (error) {
        return res.status(500).json({ message: "Failed to create job", error: error.message });
    }
}


// get all jobs
const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        const jobs = await jobModel.find(query).populate({
            path: "company" // Ensure this matches the field name in your schema
        }).sort({createdAt:-1});

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to search job", error: error.message });
    }
};



// search job of his id

// for student
const getJobById = async (req,res)=>{
    try {
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                message:"id is missing",
                success:false
            })
        }

        const job = await jobModel.findById(id).populate({
            path:'applications'
        })
        if(!job){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            job
        })
    } catch (error) {
        return res.status(500).json({ message: "Failed to serach  job", error: error.message });
    }
}


// for admin how many job he is created

const adminJobs = async(req,res)=>{
    try {
        const adminId = req.id
        if(!adminId){
            return res.status(400).json({
                message:"id is required",
                success:false
            })
        }

        const jobs = await jobModel.find({ created_by: adminId }).populate({
            path: 'company'
        });
        
        if(!jobs){
            return res.status(404).json({
                message:"job not found",
                success:"false"
            })
        }
        return res.status(200).json({
            success:true,
            jobs,
    
        })
    } catch (error) {
        return res.status(500).json({ message: "Failed to serach  job", error: error.message });
    }
}

// update
const updateJob = async(req,res)=>{
    try {
         const updateData = req.body
         const {companyId}  =req.body
         const {id} = req.params

         if(!id){
            return res.status(400).json({
                message:'id is requried'
            })
         }
         const job = await jobModel.findById(id)
         if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        const updatedData = {...job.toObject(),...updateData}

        const saveJob = await jobModel.findByIdAndUpdate(id,updatedData,  { new: true, runValidators: true })
        res.status(200).json({
            success:true,
            message:'job updated successfully',
            saveJob
        })

    } catch (error) {
        res.status(500).json({message:'error in updating data of job',error:error.message})
    }
}

module.exports = {adminJobs,getJobById,jobRegister,getAllJobs,updateJob}