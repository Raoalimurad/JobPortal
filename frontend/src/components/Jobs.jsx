import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSaveJob } from '@/redux/jobSlice'

const Jobs = ({job,showButton=false}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const daysAgo = (mongodbTime)=>{
      const createdAt = new Date(mongodbTime)
      const currentTime = new Date()
      const timeDiffernce = currentTime - createdAt
      return Math.floor( timeDiffernce/(1000*24*60*60))
  }
  const saveJobHandler = (saveJob)=>{
    dispatch(setSaveJob(saveJob))
    navigate('/saveJobs')
  }
  return (
    <div className='w-[100%] md:w-[300px] shadow-lg bg-white border border-gray-200 p-3 cursor-pointer'>
        <div className='flex justify-between items-center'>
            <p className=' text-gray-500'>{daysAgo(job?.createdAt) ==0 ? "Today":`${daysAgo(job?.createdAt)} days ago`}</p>
            <Button variant='outline'className='rounded-full' size='icon'><Bookmark/></Button>
        </div>
        <div className='flex gap-3 mt-2'>
            <Avatar>
                <AvatarImage src='https://static.vecteezy.com/system/resources/previews/000/392/153/original/modern-company-logo-design-vector.jpg'/>
            </Avatar>
            <div>
                <h2 className='font-semibold'>{job?.company?.name}</h2>
                <p className=' text-gray-600'>Pakistan</p>
            </div>
        </div>
        <h1 className='my-2 font-bold text-xl'>{job?.title}</h1>
        <p className='text-sm text-gray-500'>{job?.description}</p>
        <div className='flex items-center gap-2 mt-4'>
        <Badge>{job?.position} Position</Badge>
        <Badge>{job?.jobType}</Badge>
        <Badge>{job?.Salary}K</Badge>
      </div>
      <div className='mt-3 flex gap-5'>
    
        <Button variant='outline' className='bg-white shadow-lg border border-gray-200'><Link to={`/job/description/${job?._id}`}>Details</Link></Button>
        {
          !showButton &&  <Button variant='outline' onClick={()=>saveJobHandler(job)}>Save for Later</Button>
        }
       
      </div>
    </div>
  )
}

export default Jobs