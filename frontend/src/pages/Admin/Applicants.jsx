import ApplicantsTable from '@/components/Admin/ApplicantsTable'
import Layout from '@/components/shared/Layout'
import { setAllApplicants } from '@/redux/applicationSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Applicants = () => {
    const {id}  =useParams()
    const dispatch = useDispatch()
    const {allApplicants} = useSelector(store=>store.application)
  useEffect(()=>{
    const fetchAllApplicants = async ()=>{
      try {
        const response = await axios.get(`/api/application/getApplicant/${id}`,{withCredentials:true})
        const result  = response.data
        if(result.success){
          dispatch(setAllApplicants(result?.job)) 
        }
       } catch (error) {
          console.log(error)
          toast.error(error.response.data.message)
       }
    }
    fetchAllApplicants()
  },[])
  return (
    <Layout>
    <div className='container mx-auto'>
        <div>
            <h1 className='font-bold text-xl my-5'>Applicants ({allApplicants?.applications.length})</h1>
            <ApplicantsTable/>
        </div>

    </div>
    </Layout>
  )
}

export default Applicants