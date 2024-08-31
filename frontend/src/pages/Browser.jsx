import React, { useEffect } from 'react'
import Job from './Job'
import Jobs from '@/components/Jobs'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import useGetAllJob from '@/hooks/useGetAllJob'
import Layout from '@/components/shared/Layout'

const Browser = () => {
  useGetAllJob()
   const  {allJobs} = useSelector(store=>store.jobs)
   const dispatch = useDispatch()
   useEffect(()=>{
     return ()=>{
      dispatch(setSearchQuery(''))
     }
   },[])
  return (
    <Layout>
    <div className='container mx-auto mt-4'>
        <div>
            <h1 className='font-bold text-xl my-2'>Search Result({allJobs?.length})</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8'>
            {
                allJobs?.map((job)=>(
                     <Jobs  key={job._id} job={job}/>
                ))
            }
            </div>
            
        </div>
    </div>
    </Layout>
  )
}

export default Browser