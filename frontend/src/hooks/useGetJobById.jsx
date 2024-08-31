
import { setSingleJob } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetJobById = (jobId) => {
 const dispatch = useDispatch()
 useEffect(()=>{
     const fetchJobById = async()=>{
           try {
              const response = await axios.get(`/api/job/getJobs/${jobId}`,{withCredentials:true})
              const result = response.data
              if(result.success){
                 dispatch(setSingleJob(result.job))
              }
           } catch (error) {
              console.log(error.message)
        
            }
     }
     fetchJobById()
 },[jobId,dispatch])
}

export default useGetJobById