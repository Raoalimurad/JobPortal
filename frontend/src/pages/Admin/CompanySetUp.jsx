import Layout from '@/components/shared/Layout'
import { Button } from '@/components/ui/button'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { setLoading } from '@/redux/authSlice'
import axios from 'axios'
import { ArrowLeft, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const CompanySetUp = () => {
    const {singleCompany} = useSelector(store=>store.company)
    const [name,setName] = useState(singleCompany?.name)
    const [description,setDescription] = useState("")
    const [location,setLocation] = useState("")
    const [website,setWebsite] = useState("")
    const [logo,setlogo] = useState(null)
    const { loading } = useSelector(store => store.auth)

    const {id} = useParams()

    useGetCompanyById(id)

    const navigate = useNavigate()
    const dispatch = useDispatch()

  useEffect(()=>{
    setName(singleCompany?.name || "")
    setDescription(singleCompany?.description || "")
    setLocation(singleCompany?.location|| '')
    setWebsite(singleCompany?.Website || '')
  },[singleCompany])

    const handlePhoto = (e)=>{
        setlogo(e.target.files[0])

    }

    const handleCompanyUpdate = async(e)=>{
         e.preventDefault()
      
      const formData = new FormData()
      formData.append('name',name)
      formData.append('description',description)
      formData.append('location',location)
      formData.append('Website',website)
      formData.append('logo',logo)
      try {
        dispatch(setLoading(true))
        const response = await axios.put(`/api/company/update/${id}`, formData);
        const result = response.data
        if(result.success){
            toast.success(result.message)
            navigate('/admin/companies')
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
    <div className='container mx-auto my-8'>
        
         <form >
            <div className='flex items-center justify-between'>
             <Button variant='outline' className='flex items-center gap-1 font-semibold text-md' onClick={()=>navigate('/admin/companies')}><ArrowLeft className='w-5'/><span>Back</span></Button>
             <h1 className='font-bold text-2xl'>Company SetUp</h1>
            </div>
            <div className='w-[500px] mx-auto'>
            <div>
                <label >Company Name</label><br/>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)}        className='py-1 border border-gray-300 w-full my-1'/>
            </div>
            <div>
                <label >Description</label><br/>
                <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className='py-1 border border-gray-300 w-full my-1'/>
            </div>
            <div>
                <label >Location</label><br/>
                <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)} className='py-1 border border-gray-300 w-full my-1'/>
            </div>
            <div>
                <label >Website</label><br/> 
                <input type="text" value={website} onChange={(e)=>setWebsite(e.target.value)} className='py-1 border border-gray-300 w-full my-1'/>
            </div>
            <div>
                <label >Logo</label><br/>
                <input type="file"  onChange={handlePhoto} accept='image/*'   className='py-1'/>
            </div>
            {
              loading ? <button className='btn flex items-center justify-center'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
              Please wait
            </button>
             :
               <button className='btn' onClick={handleCompanyUpdate}>Update </button>
          }
            
            </div>
         </form>
        
    </div>
    </Layout>
  )
}

export default CompanySetUp