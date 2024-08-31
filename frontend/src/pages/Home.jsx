import CategorySection from '@/components/CategorySection'

import HeroSection from '@/components/HeroSection'
import LatestJobSection from '@/components/LatestJobSection'
import Layout from '@/components/shared/Layout'
import useGetAllJob from '@/hooks/useGetAllJob'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJob()
  const navigate = useNavigate()
  const {user} = useSelector(store=>store.auth)
  useEffect(()=>{
    if(user?.role == 'recruiter'){
      navigate('/admin/companies')
    }
  },[])
  return (
    <div>
      <Layout>
      <HeroSection/>
        <CategorySection/>
        <LatestJobSection/>
      </Layout>
       
       
      
    </div>
  )
}

export default Home