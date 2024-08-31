import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const {allCompany} = useSelector(store => store.company)
    const {searchCompany} = useSelector(store=>store.company)
     const [filterCompany,setFilterCompany] = useState(allCompany)
     const naviagte = useNavigate()
    useEffect(()=>{
      const companyFilter = allCompany.length > 0 ? allCompany.filter((company)=>{
        if(!searchCompany){
            return true;
        }
        return company?.name?.toLowerCase().includes(searchCompany.toLowerCase())
      }):[]
           setFilterCompany(companyFilter)
    },[allCompany,searchCompany])
    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your registered company
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany.length < 0 ? <span>You have not registered any company yet</span> : <>
                        {
                         filterCompany?.map((company)=>(
                            <>
                             <TableRow key={company._id}>
                                <TableCell>
                                <Avatar>
                                    <AvatarImage src={`${company?.logo}`} />
                                </Avatar>
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.createdAt.split('T')[0]}</TableCell>
                            <TableCell className='text-right'>
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className='w-32'>
                                        <div className='flex items-center justify-center gap-2 w-fit cursor-pointer' onClick={()=>naviagte(`/admin/companies/${company._id}`)}>
                                            <Edit2 className='w-4' />
                                            <span>Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                            </TableRow>
                            </>
                         ))
                        }
                          
                        </>
                    }


                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable