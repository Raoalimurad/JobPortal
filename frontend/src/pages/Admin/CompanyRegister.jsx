import Layout from '@/components/shared/Layout'
import { Button } from '@/components/ui/button'
import { setSingleCompany } from '@/redux/CompanySlice'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompanyRegister = () => {
    const navigate = useNavigate()
    const disptach = useDispatch()
    const [company,setCompany] = useState("")
    const handleCompanyRegister = async ()=>{
      try {
        const response =await axios.post('/api/company/registration',{
            companyName:company
        })
        const result = response.data
        if(result.success){
          disptach(setSingleCompany(result.company))
            toast.success(result.message)
            const companyId = result.company._id
            navigate(`/admin/companies/${companyId}`)
        }
      } catch (error) {
         console.log(error)
         toast.error(error.response.data.message)
         
      }
    }
  return (
    <Layout>
    <div className='container mx-auto my-3'>
        <div className=' w-[500px] mx-auto my-6'>
            <h1 className='font-bold text-2xl my-1'>Your Company Name</h1>
            
            <label>Company Name</label><br/>
            <input type="text" placeholder='microsoft,jobHunt etc' value={company}  onChange={(e)=>setCompany(e.target.value)}             className='my-2 w-full py-2 border border-gray-300 rounded-md px-2'/>
            <div className='flex gap-3'>
                <Button variant='outline' onClick={()=>navigate('/admin/companies')}>Cancel</Button>
                <Button onClick={handleCompanyRegister}>Continue</Button>
            </div>
        </div>


        </div>
        </Layout>
  )
}

export default CompanyRegister