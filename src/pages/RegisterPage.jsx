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

  const handleGoogleLogin = () => {
    window.location.href = "https://athlex.pro/oauth2/authorization/google";
  };

  const handleFacebookLogin = () => {
    window.location.href = "https://athlex.pro/oauth2/authorization/facebook";
  };

  const toogleVisibility = () => {
    setisVisible(prev => !prev)
  }


  return (

    <div className="flex flex-col lg:flex-row h-screen w-screen bg-gray-100">

      <div className="w-6 bg-white hidden lg:block">
        <h2 className="translate-y-7 rotate-90 font-bold">ChroniX</h2>
      </div>

      <div className='text-center grid grid-rows-4 grid-cols-1 flex-1 items-center justify-center'>
        <form onSubmit={handleSubmit}
          className='row-start-1 row-end-5 col-start-1 flex flex-col self-center justify-center gap-5 items-center'>
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
          <div className='relative'>
            <i
              className={`absolute left-5 mt-3 text-xl hover:cursor-pointer bx-low-vision bx ${isVisible ? 'text-gray-200' : 'text-black'}`}
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
              className='absolute right-5 mt-2 hover:cursor-pointer text-gray-400 bx bx-right-arrow-alt text-3xl'
              onClick={handleSubmit}
            />
            {!isMatching && <p className='mt-5 text-sm text-red-500'> Passwords must match! </p>}
          </div>
          <Button type="button" onClick={handleGoogleLogin}>
            <svg className="absolute ml-5 mt-1" xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
            Sign In With Google
          </Button>
          <Button type="button" onClick={handleFacebookLogin}>
            <svg className="absolute ml-5 mt-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="#1877f2" d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"></path><path fill="#fff" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"></path></svg>
            Sign In With Facebook
          </Button>
        </form>

        <div className='row-start-5 row-end-6 col-start-1 self-end pb-10 flex flex-col gap-5'>
          <p className='text-xl font-normal'> Already have an account?
            <Link to='/login' className='text-orange-400 underline'>Sign in here </Link>
          </p>
          <p className='text-sm md:text-lg text-gray-800 hover:cursor-pointer'>
            Terms of Use | Privacy Policy
          </p>
        </div>
      </div>

      <div className="w-6 bg-white hidden lg:block" />
    </div>

  );
}

export default LoginPage;
