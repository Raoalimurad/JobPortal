import Jobs from '@/components/Jobs'
import Layout from '@/components/shared/Layout'
import React from 'react'
import { useSelector } from 'react-redux'

const SaveJobs = () => {
  const { saveJob } = useSelector(store => store.jobs)
  

  return (
    <Layout>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8'>
          {
            saveJob?.length == 0 ?
              <div className="flex justify-center items-center h-full w-full my-8">
                <span className="text-lg text-gray-600 font-medium">
                  You don't have any saved jobs.
                </span>
              </div>
              : (
                saveJob?.map((job) => (
                  <Jobs job={job} key={job?._id} showButton={true} />
                ))
              )
          }
        </div>

      </div>
    </Layout>
  )
}

export default SaveJobs