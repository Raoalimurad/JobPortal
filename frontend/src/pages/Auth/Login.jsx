import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import Layout from '@/components/shared/Layout'



const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const navigate = useNavigate()
    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch()


    // set value of student and recturiter means role
    const handleRole = (e) => {
        setRole(e.target.value)
    }

    // login function
    const handleLogin = async () => {
        try {
            dispatch(setLoading(true))
            const response = await axios.post(`/api/user/login`, {
                email, password, role
            })
            const result = response.data
            if (result.success) {
                dispatch(setUser(result.user))
                navigate('/')
                toast.success(result.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }
    return (
        <>
        <Layout>
            <div className='signup'>
                <h2>Login</h2>

                <div>
                    <input type="email" placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <input type="password" placeholder='enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='flex mt-4'>
                    <div className='flex justify-between items-center gap-3 '>
                        <div className='flex items-center'>
                            <input type="radio" name="role" id="r1" value='student' onChange={handleRole} className='cursor-pointer' />
                            <label htmlFor="r1" className='ml-2'>Student</label>
                        </div>
                        <div className='flex items-center'>
                            <input type="radio" name="role" id="r2" value='recruiter' onChange={handleRole} className='cursor-pointer' />
                            <label htmlFor="r2" className='ml-2'>Recruiter</label>
                        </div>
                    </div>

                </div>

                <div>
                    {
                        loading ? <button className='btn flex items-center justify-center'>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                        Please wait
                      </button>
                       :
                         <button className='btn' onClick={handleLogin}>Login </button>
                    }

                    <p>Don't have an account? <Link to='/signup' className='text-blue-500'>Sign up</Link></p>
                </div>
            </div>
            </Layout>
        </>
    )
}

export default Login