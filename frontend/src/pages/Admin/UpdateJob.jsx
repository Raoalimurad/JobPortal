import Layout from '@/components/shared/Layout'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useGetJobById from '@/hooks/useGetJobById'
import { setLoading } from '@/redux/authSlice'
import axios from 'axios'
import { Loader2, MoveLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateJob = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [requirements, setRequirements] = useState("")
    const [salary, setSalary] = useState("")
    const [location, setLocation] = useState("")
    const [jobType, setJobType] = useState("")
    const [experience, setExperience] = useState("")
    const [position, setPosition] = useState("")
    const [companyId, setCompanyId] = useState("")
    const navigate = useNavigate()
    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const { allCompany } = useSelector(store => store.company)
   const  {singleJob} = useSelector(store=>store.jobs)
 const {id}  = useParams()

    useGetJobById(id)

    const selectCompanyHandler = (value) => {
        const selectedCompany = allCompany.find((company) => company.name.toLowerCase() == value)
        setCompanyId(selectedCompany._id)
        
    }


    useEffect(()=>{
        setName(singleJob?.title || '')
        setDescription(singleJob?.description || '')
        setRequirements(singleJob?.requirments|| '')
        setSalary(singleJob?.Salary || '')
        setLocation(singleJob?.location ||'')
        setJobType(singleJob?.jobType || '')
        setExperience(singleJob?.experienceLevel || '')
        setPosition(singleJob?.position)
    },[singleJob])
   

    const handleUpdate = async()=>{
        const data = { title: name, description, experience, requirments: requirements, Salary: salary, location, jobType, position,company: companyId }
        try {
            dispatch(setLoading(true))
            const response = await axios.put(`/api/job/update/${id}`,data)
            const result = response.data
              if(result.success){
                toast.success(result.message)
                navigate('/admin/jobs')
              }


        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }finally{
            dispatch(setLoading(false))
        }
    }
  return (
    <Layout>
    <div className='container mx-auto my-6'>
        <div>
            <Button className='w-[90px] font-bold' variant='outline' onClick={()=>navigate(`/admin/jobs`)}><MoveLeft className='w-3 mr-1'/>Back</Button>
        </div>
        <div className='  md:w-[460px] lg:w-[560px] mx-auto '>
            <div className='grid grid-cols-2 gap-4 mt-7'>
                <div>
                    <label className='font-bold'>Title</label><br />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your job title' className='py-2 my-2 w-full border border-gray-300 rounded-md' />
                </div>
                <div>
                    <label className='font-bold' >Description</label><br />
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter your job title' className='py-2 my-2 w-full border border-gray-300 rounded-md' />
                </div>
                <div>
                    <label  className='font-bold'>Requirements</label><br />
                    <input type="text" value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder='Enter job description' className='py-2 my-2 w-full border border-gray-300 rounded-md' />
                </div>
                <div>
                    <label className='font-bold'>Salary</label><br />
                    <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder='Enter salary' className='py-2 my-2 w-full border border-gray-300 rounded-md' />
                </div>
                <div>
                    <label className='font-bold' >Location</label><br />
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Enter location' className='py-2 my-2 w-full border border-gray-300 rounded-md' />
                </div>
                <div>
                    <label className='font-bold'>JobType</label><br />
                    <input type="text" value={jobType} onChange={(e) => setJobType(e.target.value)} placeholder='Enter job type ' className='py-2 my-2 w-full border border-gray-300 rounded-md' />
                </div>
                <div>
                    <label  className='font-bold'>Experience Level</label><br />
                    <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder='Enter Experience' className='py-2 my-2 w-full border border-gray-300 rounded-md' />
                </div>
            
                <div>
                    <label className='font-bold'>Position</label><br />
                    <input type='number' value={position} onChange={(e) => setPosition(e.target.value)} placeholder='Enter position' className='py-2 my-2 w-full border border-gray-300 rounded-md' />
                </div>
                <div>
                            {
                                allCompany.length > 0 && (
                                    <Select onValueChange={selectCompanyHandler}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="select a company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                allCompany.map((company) => (
                                                    <SelectItem value={company?.name.toLowerCase()} key={company._id}>
                                                        {company.name}
                                                    </SelectItem>
                                                ))
                                            }


                                        </SelectContent>
                                    </Select>

                                )
                            }
                        </div>

            </div>
            {
                loading ? <button className='btn flex items-center justify-center'>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please wait
                </button>
                    :
                    <button className='btn' onClick={handleUpdate}>Update </button>
            }


            {
                allCompany.length == 0 && <p className='text-xs text-red-600 font-bold  my-3 text-center'>* Please register a company first,before posting a job</p>
            }
        </div>
    </div>
</Layout>
  )
}

export default UpdateJob