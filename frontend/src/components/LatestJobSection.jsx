import React from 'react'
import JobCart from './JobCart'
import { useSelector } from 'react-redux'


const LatestJobSection = () => {
    const {allJobs} = useSelector(store=>store.jobs)
    console.log(allJobs,'alljobs')
    
  return (
    <div className='container mx-auto'>
        <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
        <div className='flex flex-wrap mt-5'>
  { 
  allJobs.length < 0 ? <span>No job Available</span> : allJobs?.slice(0,6).map((job, index) => (
      <div key={index} className='w-full sm:w-1/2 lg:w-1/3 p-2'>
        <JobCart job={job} key={job._id} />
      </div>
    ))
  }
</div>

    </div>
  )
}

export default LatestJobSection