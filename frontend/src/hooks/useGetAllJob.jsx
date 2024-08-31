import { setAllJob } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJob = () => {
 const dispatch = useDispatch()
 const {searchQuery} = useSelector(store=>store.jobs)
 useEffect(()=>{
     const fetchAllJob = async()=>{
           try {
              const response = await axios.get(`/api/job/getJobs?keyword=${searchQuery}`,{withCredentials:true})
              const result = response.data
              console.log(result,'job')
              if(result.success){
                 dispatch(setAllJob(result.jobs))
              }
           } catch (error) {
              console.log(error.message)
        
            }
     }
     fetchAllJob()
 },[])
}

export default useGetAllJob