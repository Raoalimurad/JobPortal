import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './ui/button'
import axios from 'axios'
import { setLoading, setUser } from '@/redux/authSlice'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

const UpdateProfileModel = ({open,setOpen}) => {
  // using redux toolkit 
    const {user} = useSelector(store=>store.auth)
    const { loading } = useSelector(store => store.auth)
    
    // for data
    const [name,setName] = useState(user?.name)
    const [email,setEmail] = useState(user?.email)
    const [phone,setPhone] = useState(user?.phone)
    const [skills,setSkills] = useState(user?.profile.skills?.map(skill=>skill))
    const [bio,setBio] = useState(user?.profile?.bio)
    const [file,setFile] = useState('')

   const dispatch = useDispatch()
    // update function
    const handleUpdate = async (e)=>{
      e.preventDefault()
      try {
        dispatch(setLoading(true))
       const formData =  new FormData()
       formData.append("name",name)
       formData.append("email",email)
       formData.append("phone",phone)
       formData.append("skills",skills)
       formData.append("bio",bio)
       formData.append("file",file)
       const response = await axios.put(`/api/user/update/${user._id}`,formData)
       const result = response.data
       if(result.success){
          dispatch(setUser(result.user))
          toast.success(result.message)
       }
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }finally{
        dispatch(setLoading(false))
      }
      setOpen(false)
    }
 
  return (
    <div>
      <Dialog open={open}>
     <DialogContent className='max-w-[370px] md:max-w-[425px]' onInteractOutside={()=>setOpen(false)}>
        <DialogHeader>
            <DialogTitle>Update profile</DialogTitle>
        </DialogHeader>
        <form action="">
            <div className=' py-4'>
                  <div className='flex items-center gap-3 py-2'>
                    <label htmlFor="name" className='font-medium'>Name:</label>
                    <input type="text" value={name} id="name" className='w-full py-1 px-1'placeholder='Enter your name' onChange={(e)=>setName(e.target.value)}/>
                  </div>
                  <div className='flex items-center gap-3 py-2'>
                    <label htmlFor="email" className='font-medium'>Email:</label>
                    <input type="text" name="email" id="email" className='w-full py-1 px-1'placeholder='Enter your email'  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  </div>
                  <div className='flex items-center gap-3 py2'>
                    <label htmlFor="phone" className='font-medium '>Phone:</label>
                    <input type="text" name="phone" id="phone" className='w-full py-1 px-1'placeholder='Enter your Phone number' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                  </div>
                  <div className='flex items-center gap-3 py-2'>
                    <label htmlFor="bio" className='font-medium'>Bio:</label>
                    <input type="text" name="bio" id="bio" className='w-full py-1 px-1'placeholder='Enter  your bio' value={bio} onChange={(e)=>setBio(e.target.value)}/>
                  </div>
                  <div className='flex items-center gap-3 py-2'>
                    <label htmlFor="skill" className='font-medium'>Skills:</label>
                    <input type="text" name="skill" id="skill" className='w-full py-1 px-1'placeholder='Enter your skills' value={skills} onChange={(e)=>setSkills(e.target.value)}/>
                  </div>
                  <div className='flex items-center gap-3 py-2'>
                    <label htmlFor="file" className='font-medium'>Resume:</label>
                    <input type="file" accept='application/pdf' name="file" id="file" className='w-full py-1 px-1'placeholder='Enter name' onChange={(e)=>setFile(e.target.files?.[0])}/>
                  </div>
                  {
              loading ? <button className='btn flex items-center justify-center'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
              Please wait
            </button>
             :
               <button className='btn' onClick={handleUpdate}>Update </button>
          }
                  
            </div>
        </form>
     </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileModel