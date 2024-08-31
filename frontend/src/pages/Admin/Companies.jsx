import CompaniesTable from '@/components/Admin/CompaniesTable'
import Layout from '@/components/shared/Layout'
import { Button } from '@/components/ui/button'
import useGetAllCompany from '@/hooks/useGetAllCompany'
import { setSearchCompany } from '@/redux/CompanySlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Companies = () => {
    const navigate = useNavigate()
     const dispatch = useDispatch()
    const [input,setInput] = useState("")

    useGetAllCompany()
    useEffect(()=>{
      dispatch(setSearchCompany(input))
    },[input])
 
  return (
    <Layout>
    <div className='container mx-auto my-10'>
        <div className='flex items-center justify-between my-6'>
        <input type="text" placeholder='Filter by name' className='w-fit border border-gray-300 p-2 rounded-md' value={input} onChange={(e)=>setInput(e.target.value)}/>

        <Button onClick={()=>navigate('/admin/companies/create')}>New Company</Button>
        </div>
      <CompaniesTable/>

    </div>
    </Layout>
  )
}

export default Companies