import { setAllCompany } from '@/redux/CompanySlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompany = () => {
 const dispatch = useDispatch()
 useEffect(()=>{
     const fetchAllCompany = async()=>{
           try {
              const response = await axios.get('/api/company/getCompany',{withCredentials:true})
              const result = response.data
              if(result.success){
                 dispatch(setAllCompany(result.company))
              }
           } catch (error) {
              console.log(error.message)
        
            }
     }
     fetchAllCompany()
 },[])
}

export default useGetAllCompany