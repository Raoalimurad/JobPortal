import React, { useState } from 'react';
import "../../App.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import Layout from '@/components/shared/Layout';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [role, setRole] = useState("");
  const navigate = useNavigate()
  const { loading } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  // take value of role student or recturiter
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // get photo of user
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };


  // handle registration

  const handleRegister = async (e) => {
    e.preventDefault();
    try {

      dispatch(setLoading(true))
      const userData = new FormData();
      userData.append("name", name);
      userData.append("email", email);
      userData.append("phone", phone);
      userData.append("password", password);
      userData.append("photo", photo);
      userData.append("role", role);



      const response = await axios.post("/api/user/registration", userData
      );
      const result = response.data
      if (result.success) {
        dispatch(setUser(result.user))
        navigate("/login")
        toast.success(result.message)
      }
    } catch (error) {
      console.error("There was an error!", error);
      toast.error(error.message)
    }finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <Layout>
    <div className='signup'>
      <h2>Sign up</h2>
      <div>
        <input type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <input type="number" placeholder='Enter your phone number' value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div>
        <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className='flex mt-4'>
        <div className='flex justify-between items-center gap-3 w-[290px]'>
          <div className='flex items-center'>
            <input type="radio" name="role" id="r1" value='student' className='cursor-pointer' onChange={handleRoleChange} />
            <label htmlFor="r1" className='ml-2'>Student</label>
          </div>
          <div className='flex items-center'>
            <input type="radio" name="role" id="r2" value='recruiter' className='cursor-pointer' onChange={handleRoleChange} />
            <label htmlFor="r2" className='ml-2'>Recruiter</label>
          </div>
        </div>
        <div className='text-center ml-3 flex items-center'>
          <input type="file" accept='image/*' onChange={handlePhotoChange} className='cursor-pointer w-[230px]' />
        </div>
      </div>
      <div>
        
            {
              loading ? <button className='btn flex items-center justify-center'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
              Please wait
            </button>
             :
               <button className='btn' onClick={handleRegister}>Sign up </button>
          }
        
        <p>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></p>
      </div>

    </div>
    </Layout>
  );
};

export default Signup;
