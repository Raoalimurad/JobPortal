import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobTable = () => {
  
    const {allAdminJobs} = useSelector(store=>store.jobs)
    const {searchTextJob} = useSelector(store=>store.jobs)
    
    const [filterJob, setFilterJob] = useState(allAdminJobs)
    const navigate = useNavigate()
       
       useEffect(() => {
        
        const jobFilter = allAdminJobs.length > 0 
            ? allAdminJobs.filter((job) => {
                if (!searchTextJob) {
                    return true;
                }
                return job?.title?.toLowerCase().includes(searchTextJob.toLowerCase())||job?.company?.name.toLowerCase().includes(searchTextJob.toLowerCase());
            })
            : [];
        
        setFilterJob(jobFilter);
    }, [allAdminJobs, searchTextJob]);
    

    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your recent posted jobs 
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJob.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan="4">You have not registered any company yet</TableCell>
                        </TableRow>
                    ) : (
                        filterJob?.map((job) => (
                            <TableRow key={job?._id}>
                                <TableCell>
                                {job?.company?.name}
                                </TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split('T')[0]}</TableCell>
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            <div className='flex items-center justify-center gap-2 w-fit cursor-pointer' onClick={() => navigate(`/admin/jobs/${job?._id}`)}>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div  onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}                  className='flex items-center justify-center gap-2 w-fit cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobTable
