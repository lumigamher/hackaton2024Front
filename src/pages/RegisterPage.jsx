/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

function LoginPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    repeatPassword: ''
  });
  const [isVisible, setisVisible] = useState(false)
  const [isMatching, setisMatching] = useState(true)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: value };
      if (name === 'repeatPassword') {
        if (newFormData.password === newFormData.repeatPassword) {
          setisMatching(true)
        } else {
          setisMatching(false)
        }
      }
      return newFormData;
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMatching) {
      return;
    }
    const payload = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
    };
    console.log(await payload);

    await register(payload)
  };


  const toogleVisibility = () => {
    setisVisible(prev => !prev)
  }

  const handleGoogleLogin = () => {
    window.location.href = "https://athlex.pro/oauth2/authorization/google";
  };

  const handleFacebookLogin = () => {
    window.location.href = "https://athlex.pro/oauth2/authorization/facebook";
  };

  return (

    <div className="flex flex-col lg:flex-row h-screen w-screen justify-between bg-gray-100">

      <div className="w-6 bg-white hidden lg:block">
        <h2 className="translate-y-7 rotate-90 font-bold">ChroniX</h2>
      </div>

      <div className='text-center grid grid-rows-4 grid-cols-1 flex-1'>
        <form onSubmit={handleSubmit}
          className='row-start-1 row-end-5 col-start-1 flex flex-col self-center gap-5 px-5 md:px-20 lg:px-40'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl text-center font-bold mb-5'>
            <p className='font-normal'>Create New</p> Account
          </h2>
          <Input
            placeholder='User'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            placeholder='E-mail'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type={isVisible ? 'text' : 'password'}
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className='relative scale-105'>
            <i
              className={`absolute translate-x-5 translate-y-7 py-0.5 hover:cursor-pointer bx-low-vision bx ${isVisible ? 'text-gray-200' : 'text-black'}`}
              onClick={toogleVisibility}
            />
            <Input
              type={isVisible ? 'text' : 'password'}
              name="repeatPassword"
              placeholder='Repeat password'
              value={formData.repeatPassword}
              onChange={handleChange}
              required
            />
            <i
              className='absolute -translate-x-8 translate-y-7 pt-0.5 hover:cursor-pointer text-gray-400 bx bx-right-arrow-alt'
              onClick={handleSubmit}
            />
            {!isMatching && <p className='mt-5 text-sm text-red-500'> Passwords must match! </p>}
          </div>
          <Button type="button" onClick={handleGoogleLogin}>
            <i className='bx bxl-google'></i> Sign In With Google
          </Button>
          <Button type="button" onClick={handleFacebookLogin}>
            <i className='bx bxl-facebook'></i> Sign In With Facebook
          </Button>
          <div className='row-start-5 row-end-6 col-start-1 self-center pb-10 flex flex-col gap-5'>
            <p className='text-xl font-normal'> Already have an account?
              <Link to='/login' className='text-orange-400 underline'> Sign in here </Link>
            </p>
            <p className='text-sm md:text-lg text-gray-800 hover:cursor-pointer'>
              Terms of Use | Privacy Policy
            </p>
          </div>
        </form>
      </div>

      <div className="w-6 bg-white hidden lg:block" />
    </div>

  );
}

export default LoginPage;
