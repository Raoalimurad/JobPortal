import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const ApplicantJobTable = () => {
  
    const {allAppliedJob} = useSelector(store=>store.application)
 
  return (
    <div>
        <Table>
            <TableCaption>A list of Your Applied Job</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className='font-semibold'>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className='text-right'>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    allAppliedJob?.length == 0 ? <span> You haven't applied in an company yet</span>:(
                        allAppliedJob?.map((appliedJob)=>(
                            <TableRow key={appliedJob?._id}>
                              <TableCell>{appliedJob?.createdAt.split('T')[0]}</TableCell>
                              <TableCell>{appliedJob?.job.title}</TableCell>
                              <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                              <TableCell className='text-right'><Badge className={`${appliedJob?.status == 'Rejected'? 'bg-red-400':appliedJob?.status=='Accepted'? 'bg-green-500' : 'bg-gray-500'}`}>{appliedJob?.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    )
                   
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default ApplicantJobTable