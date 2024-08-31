import { Facebook, FacebookIcon, Github, Linkedin } from 'lucide-react'
import React from 'react'
import { Badge } from '../ui/badge'

const Footer = () => {
  return (
    <div className='container mx-auto '>
        <div className='flex justify-between items-center mt-3 p-2 border border-gray-200'>
        <div>
           <h1 className='font-bold'>Job <span className='text-red-600'>Portal</span></h1>
           <h4 className='text-gray-600'>@2024 Your Company All rights reserved</h4>
        </div>
        <div className='flex gap-3'>
      <Badge><Facebook /></Badge>
      <Badge >  <a href="https://www.linkedin.com/in/raoalimurad/" target='blank'><Linkedin /></a> </Badge>
      <Badge className={'cursor-pointer'}><a href="https://github.com/raoalimurad" target='blank'><Github /></a></Badge>
   
      
    </div>
    </div>
    </div>
  )
}

export default Footer