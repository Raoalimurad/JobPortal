import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const JobCart = ({job}) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/job/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer'>
      <div>
        <h1 className='font-bold text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500 mt-1'>Pakistan</p>
      </div>
      <div>
        <h1 className='font-semibold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge>{job?.position} Position</Badge>
        <Badge>{job?.jobType}</Badge>
        <Badge>{job?.Salary} K</Badge>
      </div>
    </div>
  )
}

export default JobCart