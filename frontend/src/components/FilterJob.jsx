import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const FilterJob = () => {
    const filterData = [
        {
            filterType: "Location",
            array: ['karachi', 'Islamabad', 'Lahore', 'Multan', 'faisalabad', 'Peshawar', 'Quetta']
        }, {
            filterType: "Industry",
            array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer', 'Graphic Designer']
        },
       
    ]
    const dispatch = useDispatch()
    const [selectedValue, setSelectedValue] = useState('')
    const changeHandler = (value) => {
        setSelectedValue(value)
    }
    useEffect(() => {
        dispatch(setSearchQuery(selectedValue))
    }, [selectedValue])
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-xl text-center mb-2'>Filter Jobs</h1>
            <hr className='border border-gray-200' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData?.map((data, index) => (
                        <>
                            <h2 className='font-semibold '>{data.filterType}</h2>
                            {
                                data?.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2  text-center ml-1'>
                                            <RadioGroupItem value={item} id={itemId}/>
                                            <label htmlFor={itemId}>{item}</label>
                                        </div>
                                    )
                                })



                            }
                        </>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterJob