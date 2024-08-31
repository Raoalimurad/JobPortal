
import { setAllAppliedJob } from "@/redux/applicationSlice"
import axios from "axios"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"


const useGetAppliedJob = () => {
 const dispatch = useDispatch()
 useEffect(()=>{
    const fetchAppliedJob = async()=>{
    try {
    
            const response = await axios.get(`/api/application/get`,{withCredentials:true})
            const result = response.data
            if(result.success){
                
                dispatch(setAllAppliedJob(result.applications))
            }
         
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}
    fetchAppliedJob()

 },[])
}

export default useGetAppliedJob