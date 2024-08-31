import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';

const CategorySection = () => {
  const category = ['Frontend Developer', 'Backend Developer', 'Data Science', 'Graphic Designer', 'FullStack Developer'];
  const dispatch  = useDispatch()
  const navigate = useNavigate()
  const serachHandler = (query)=>{
    dispatch(setSearchQuery(query))
    navigate('/browse')
  }
  return (
    <div className='w-[260px] md:w-[350px] mx-auto'>
      <Carousel className="w-full max-w-xl mx-auto my-20 text-center">
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem key={index} className='md:basis-1/2 lg-basis-1/3'>
              <Button onClick={()=>serachHandler(item)}>{item}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  );
};

export default CategorySection;
