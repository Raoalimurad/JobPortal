import Layout from '@/components/shared/Layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { setSingleJob } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const JobDescription = () => {
   
    const {id} = useParams()
    const dispatch = useDispatch()
    const {user} = useSelector(store=>store.auth)
    const {singleJob} = useSelector(store=>store.jobs)
    let isAppliedInitially = singleJob?.applications?.some(application=>application.applicant ==user?._id) || false
    const [isApplied,setIsApplied] = useState(isAppliedInitially)
// function job applay
const jobApplayHandler = async()=>{
    try {
        const response = await axios.get(`/api/application/apply/${id}`,{withCredentials:true})
        const result = response.data
        if(result.success){
            toast.success(result.message)
            setIsApplied(true)
            const updateSingleJob  = {...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
            dispatch(setSingleJob(updateSingleJob))
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}


    useEffect(()=>{
        const fetchSingleJob = async()=>{
              try {
                 const response = await axios.get(`/api/job/getJobs/${id}`,{withCredentials:true})
                 const result = response.data
                 if(result.success){
                    dispatch(setSingleJob(result.job))
                    setIsApplied(result.job.applications.some(application=>application.applicant==user?._id))
                 }
              } catch (error) {
                 console.log(error.message)
           
               }
        }
        fetchSingleJob()
    },[id])


    return (
        <Layout>
        <div className='container mx-auto my-5'>
            <div className='flex  justify-between'>
                {/* info */}
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge>{singleJob?.position} Position</Badge>
                        <Badge>{singleJob?.jobType}</Badge>
                        <Badge>{singleJob?.Salary} k</Badge>
                    </div>

                </div>

                {/* apply button */}
                <Button disabled={isApplied} 
                    className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#8204d6]"}`} onClick={isApplied?null:jobApplayHandler}>{isApplied ? "Already applied" : "Apply Now"}</Button>

            </div>

            <h1 className='border-b-2 border-b-gray-300 font-medium my-4 py-4 text-xl'>Job Description</h1>
            <div>
                <h1 className='font-bold my-1'>Role:<span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location:<span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience:<span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} years</span></h1>
                <h1 className='font-bold my-1'>Salary:<span className='pl-4 font-normal text-gray-800'>{singleJob?.Salary}K</span></h1>
                <h1 className='font-bold my-1'>Total Applicants:<span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date:<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split('T')[0]}</span></h1>
            </div>
        </div>
        </Layout>
    )
}

export default JobDescription