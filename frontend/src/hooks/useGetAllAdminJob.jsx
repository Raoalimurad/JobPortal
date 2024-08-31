import { setAllAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJob = () => {
 const dispatch = useDispatch()
 useEffect(()=>{
     const fetchAllAdminJob = async()=>{
           try {
              const response = await axios.get('/api/job/adminjobs',{withCredentials:true})
              const result = response.data
           
              if(result.success){
                 dispatch(setAllAdminJobs(result.jobs))
              }
           } catch (error) {
              console.log(error.message)
        
            }
     }
     fetchAllAdminJob()
 },[])
}

export default useGetAllAdminJob