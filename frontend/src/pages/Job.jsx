import FilterJob from '@/components/FilterJob'
import Jobs from '@/components/Jobs'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {motion} from "framer-motion"
import Layout from '@/components/shared/Layout';

const Job = () => {
    
    const {allJobs,searchQuery} = useSelector(store=>store.jobs)
    const [filterJob,setFilterJob] = useState(allJobs)
  
useEffect(()=>{
    if(searchQuery){
        const filteredJobs = allJobs.length > 0 ? allJobs.filter((job)=>{
             return job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job?.description.toLowerCase().includes(searchQuery.toLowerCase()) ||job?.location.toLowerCase().includes(searchQuery.toLowerCase())
            
        }):[]
        setFilterJob(filteredJobs)
    }
   
},[searchQuery,allJobs])
    return (
        <Layout>
        <div className='container mx-auto mt-5 px-4'>
            <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-full md:w-1/5'>
                    <FilterJob />
                </div>
                <div className='w-full md:w-4/5'>
                    {
                        filterJob.length === 0 ? (
                            <div>Job not found</div>
                        ) : (
                            <div className='h-[80vh] overflow-y-auto pb-5'>
                                <div className='flex flex-wrap '>
                                    {filterJob?.map((job, index) => (
                                        <div
                                        
                                         key={index} className='w-full sm:w-1/2 lg:w-1/3 p-2'>
                                            <Jobs job={job} key={job._id}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        </Layout>
    );
}

export default Job;
