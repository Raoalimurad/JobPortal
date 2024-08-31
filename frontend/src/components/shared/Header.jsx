import React, { useState } from 'react';
import '../../App.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '../ui/button';
import { AlignJustify, LogOut, User2, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUser } from '@/redux/authSlice';
import { setAllApplicants, setAllAppliedJob } from '@/redux/applicationSlice';
import { setSingleCompany } from '@/redux/CompanySlice';
import { setAllJob, setSaveJob, setSingleJob } from '@/redux/jobSlice';



const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const { user } = useSelector(store => store.auth)

    // logout function
    const handleLogOut = async () => {
       
        try {
            const response = await axios.post(`/api/user/logout`, { withCredentials: true })
            const result = response.data
            if (result.success) {
                dispatch(setUser(null))
                dispatch(setAllApplicants(null))
                dispatch(setAllAppliedJob(null))
                dispatch(setSingleCompany(null))
                dispatch(setSingleJob(null))
                dispatch(setSaveJob(null))
                navigate('/login')
                toast.success(result.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='bg-white w-full '>
            <div className='container mx-auto flex items-center justify-between h-16 header'>
                <div>
                    <h1 className='text-2xl font-bold'>Job <span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className={`flex items-center gap-5`}>
                    <ul className={` navbar  ${isNavOpen ? 'showNavbar' : ''}`}>
                        {
                            user && user?.role == 'recruiter' ? <>
                                <li><Link to="/admin/companies" className='font-bold text-xl'>Companies</Link></li>
                                <li><Link to="/admin/jobs" className='font-bold text-xl'>Jobs</Link></li>
                            </> :
                                <>
                                    <li><Link to="/" className='font-bold text-xl'>Home</Link></li>
                                    <li><Link to="/jobs" className='font-bold text-xl'>Jobs</Link></li>
                                    <li><Link to="/saveJobs/" className='font-bold text-xl'>SaveJobs</Link></li>
                                    <li><Link to="/browse" className='font-bold text-xl'>Browse</Link></li>
                                </>
                        }


                        {!user ? (
                            <>
                                <NavLink to="/signup">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
                                </NavLink>
                                <NavLink to='/login'>
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Login</button>
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <Popover >
                                    <PopoverTrigger asChild>
                                        <Avatar className="w-10 h-10 mr-9 cursor-pointer">
                                            <AvatarImage src={`${user?.profile?.profilePhoto}`} alt="@shadcn" className="w-full h-full rounded-full" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className=' w-60 mr-4 bg-white shadow-lg rounded mt-1 z-50'>
                                        <div className='p-2 flex gap-3 items-center'>
                                            <Avatar className="w-10 h-10  cursor-pointer">
                                                <AvatarImage src={`${user?.profile?.profilePhoto}`} alt="@shadcn" className="w-full h-full rounded-full" />
                                            </Avatar>
                                            <div className='w-40 '>
                                                <h1 className='font-semibold'>{user?.name}</h1>
                                                <p className='text-sm text-muted-foreground'>{user?.profile.bio}</p>
                                            </div>
                                        </div>
                                        {
                                            user && user?.role == 'student' && (
                                                <div className='flex gap-2 items-center mt-2'>
                                                    <div>
                                                        <User2 />
                                                    </div>
                                                    <div>
                                                        <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        <div className='flex gap-2 items-center mt-2'>
                                            <div>
                                                <LogOut />
                                            </div>
                                            <div>
                                                <Button variant="link" className="border-teal-500" onClick={handleLogOut}>Logout</Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </>
                        )}
                    </ul>
                </div>
                {isNavOpen ? (
                    <X onClick={toggleNav} size={33} className="icon" />
                ) : (
                    <AlignJustify onClick={toggleNav} size={33} className="icon" />
                )}
            </div>
        </div>
    );
};

export default Header;
