import { setSearchQuery } from '@/redux/jobSlice'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const [query,setQuery] = useState('')
  const dispatch  = useDispatch()
  const navigate = useNavigate()
  const serachHandler = ()=>{
    dispatch(setSearchQuery(query))
    setQuery('')
    if(query){
      navigate('/browse')
    }
    
  }
  return (
    <div>
        <h4 className='text-center mt-9 text-[#f63002] px-4 py-2 bg-gray-100 rounded-full font-medium'>No.1 job hunt website</h4>
        <h1 className='text-center font-bold text-5xl mt-2'>Search,Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Job</span></h1>
        <p className='text-center mt-3'>"Discover top job opportunities with raoalimurad’s portal, connecting you with employers who value your skills.<br/> Start your career journey today.</p>
        <div className='text-center mt-4'>
  <div className='inline-flex items-center w-full mx-auto justify-center'>
    <input type="text" value={query}  onChange={(e)=>setQuery(e.target.value)} placeholder='Enter your dream job' className='w-[400px] py-2 px-2 shadow-lg border border-gray-200 rounded-l-full outline-none'/>
    <button className='py-2 px-4 bg-[#6A38C2] text-white rounded-r-full' onClick={serachHandler}>
      <Search/>
    </button>
  </div>
</div>


    </div>
  )
}

export default HeroSection