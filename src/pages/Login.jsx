import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: state === 'Sign Up'
        ? Yup.string().required('Name is required')
        : Yup.string(),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        const url = state === 'Sign Up'
          ? '/api/user/register'
          : '/api/user/login';

        const payload = state === 'Sign Up'
          ? values
          : { email: values.email, password: values.password };

        const { data } = await axios.post(backendUrl + url, payload);

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    }
  });

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  return (
    <form onSubmit={formik.handleSubmit} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              type='text'
              name='name'
              className='border border-[#DADADA] rounded w-full p-2 mt-1'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className='text-red-500 text-xs'>{formik.errors.name}</div>
            )}
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            type='email'
            name='email'
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='text-red-500 text-xs'>{formik.errors.email}</div>
          )}
        </div>

        <div className='w-full relative'>
          <p>Password</p>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            className='border border-[#DADADA] rounded w-full p-2 mt-1 pr-10'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-[38px] cursor-pointer text-gray-600'
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
          {formik.touched.password && formik.errors.password && (
            <div className='text-red-500 text-xs'>{formik.errors.password}</div>
          )}
        </div>

        <button type='submit' className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
        ) : (
          <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        )}
      </div>
    </form>
  );
};

export default Login;
