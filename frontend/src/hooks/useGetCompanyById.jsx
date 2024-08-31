import { setAllCompany, setSingleCompany } from '@/redux/CompanySlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
 const dispatch = useDispatch()
 useEffect(()=>{
     const fetchCompanyById = async()=>{
           try {
              const response = await axios.get(`/api/company/getCompany/${companyId}`,{withCredentials:true})
              const result = response.data
              if(result.success){
                 dispatch(setSingleCompany(result.company))
              }
           } catch (error) {
              console.log(error.message)
        
            }
     }
     fetchCompanyById()
 },[companyId,dispatch])
}

export default useGetCompanyById