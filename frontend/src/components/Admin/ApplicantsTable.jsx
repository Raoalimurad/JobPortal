import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'

const ApplicantsTable = () => {
    const shortListApplicants = ['Accepted', 'Rejected']
    const { allApplicants } = useSelector(store => store.application)
    const statusHandler = async (status,id)=>{
        try {
            const response = await axios.put(`/api/application/update/${id}`,{status},{withCredentials:true})
            const result = response.data
            if(result.success){
                toast.success(result.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allApplicants && allApplicants?.applications?.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user?.applicant?.name}</TableCell>
                                <TableCell>{user?.applicant?.email}</TableCell>
                                <TableCell>{user?.applicant?.phone}</TableCell>
                                <TableCell><a href={user?.applicant?.profile?.resume} target='blank'>{user?.applicant?.profile?.resumeOriginalName}</a></TableCell>
                                <TableCell>{user?.applicant?.createdAt.split('T')[0]}</TableCell>
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {
                                                shortListApplicants?.map((status, index) => (
                                                    <div key={index} className='flex w-fit items-center my-2 cursor-pointer' onClick={()=>statusHandler(status,user?._id)}>
                                                        {status}
                                                    </div>
                                                ))
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>

            </Table>
        </div>
    )
}

export default ApplicantsTable