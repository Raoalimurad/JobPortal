import AdminJobTable from '@/components/Admin/AdminJobTable'
import Layout from '@/components/shared/Layout'
import { Button } from '@/components/ui/button'
import useGetAllAdminJob from '@/hooks/useGetAllAdminJob'
import { setSearchCompany } from '@/redux/CompanySlice'
import { setSearchTextJob } from '@/redux/jobSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch,  } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Companies = () => {
    const navigate = useNavigate()
     const dispatch = useDispatch()
    const [input,setInput] = useState("")
    useGetAllAdminJob()
    useEffect(()=>{
      dispatch(setSearchTextJob(input))
    },[input])
 
  return (
    <Layout>
    <div className='container mx-auto my-10'>
        <div className='flex items-center justify-between my-6'>
        <input type="text" placeholder='Filter by name' className='w-fit border border-gray-300 p-2 rounded-md' value={input} onChange={(e)=>setInput(e.target.value)}/>

        <Button onClick={()=>navigate('/admin/job/create')}>New Job</Button>
        </div>
      <AdminJobTable/>

    </div>
    </Layout>
  )
}

export default Companies