import React, { useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { space } from 'postcss/lib/list'
import ApplicantJobTable from './ApplicantJobTable'
import UpdateProfileModel from './UpdateProfileModel'
import { useSelector } from 'react-redux'
import useGetAppliedJob from '@/hooks/useGetAppliedJob'
import Layout from './shared/Layout'

const Profile = () => {
    useGetAppliedJob()
    const {user} = useSelector(store=>store.auth)
    const skills = user?.profile.skills
    const isResume = true
    const [open,setOpen] = useState(false)
    return (
        <Layout>
        <div className='container mx-auto'>
        <div className='  bg-white border border-gray-200 rounded-2xl my-5 p-8'>

            {/* show user profile */}

            <div className='flex  justify-between'>
                <div className='flex items-center gap-3'>
                    <Avatar className='h-24 w-24'>
                        <AvatarImage src={`${user?.profile?.profilePhoto}`} alt='Profile' />
                    </Avatar>
                    <div>
                        <h1 className='font-medium text-xl'>{user?.name}</h1>
                        <p>{user?.profile?.bio}</p>
                    </div>
                </div>
                <div>
                    <Button variant='outline' onClick={()=>setOpen(true)}><Pen /></Button>
                </div>
            </div>
            {/* end //////////// */}


            <div>
                {/* show email */}
                <div className='flex items-center gap-2 mt-5 '>
                    <Mail />
                    <span>{user?.email}</span>
                </div>
                {/* show contact */}
                <div className='flex items-center gap-2 mt-2 '>
                    <Contact />
                    <span>{user?.phone}</span>
                </div>
            </div>
            {/* end ////////////// */}


            {/* skill section */}
            <div className='my-4 '>
                <h2 className='text-xl font-semibold mb-2'>Skills</h2>
                <div className='flex gap-2 cursor-pointer'>
                    {
                        skills?.length !== 0 ? skills?.map((item, index) => <Badge key={index}>{item}</Badge>) : <Badge>NA</Badge>
                    }
                </div>

            </div>
            {/* end here skill section */}


            {/* resume section */}
            <div children='grid w-full max-w-sm item-centre gap-1.5'>
                <div>
                <label className='text-md font-bold'>Resume</label>
                </div>
               
                {
                    isResume ? <a href={`${user?.profile?.resume}`} target='blank' className='text-blue-600 font-medium hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                }
            </div>
            {/* resume end */}

           
        </div>

         {/* applicant table */}
         <div>
         <h1 className='font-bold text-xl my-3'>Applied Jobs</h1>
         <ApplicantJobTable/>
     </div>
         <UpdateProfileModel open={open} setOpen={setOpen}/>
     </div>
     </Layout>
    )
}

export default Profile
