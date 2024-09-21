import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/input';
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
    const response = await register(payload)
    if (response.status == 200) {
      Toast.fire({
        icon: 'success',
        title: 'User successfully registered'
      });
      navigate('/login')
    }



  };


  const toogleVisibility = () => {
    setisVisible(prev => !prev)
  }

  return (

    <div className="flex h-screen w-screen justify-between bg-gray-100">

      <div className="w-6 bg-white">
        <h2 className="translate-y-7 rotate-90 font-bold">ChroniX</h2>
      </div>

      <div className=' text-center grid grid-rows-4 grid-cols-1'>
        <form onSubmit={handleSubmit}
          className='row-start-1 row-end-5 col-start-2 flex flex-col self-center  gap-1'>
          <h2 className='text-6xl text-center font-bold mb-5'> <p className='font-normal'>Create New</p> account </h2>
          <Input
            placeholder='User'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required

          />
          <Input
            placeholder='e-mail'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required

          />
          <Input
            placeholder='Your name'
            type="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required

          />
          <Input
            placeholder='Your last-name'
            type="lastname"
            name="LastName"
            value={formData.lastName}
            onChange={handleChange}
            required

          />
          <Input
            placeholder='Your phone number'
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
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

          <div className='scale-105 '>

            <i
              className={`absolute translate-x-5 translate-y-7 py-0.5 hover:cursor-pointer bx-low-vision  bx ${isVisible ? 'text-gray-200' : 'text-black'}`}
              onClick={toogleVisibility}
            >
            </i>

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
            >

            </i>
            {
              isMatching ? '' : <p className='mt-5 text-sm text-red-500'> Password must match! </p>
            }
          </div>
          <Button> <i className='bx bxl-google'></i> Sign In With Google </Button>
        </form>

        <div className='row-start-5 row-end-6 col-start-2 self-end pb-10 flex flex-col gap-5' >
          <p className='text-xl font-normal'> Already have an account? <Link to='/login' className='text-orange-400 underline'>Sign in here</Link> </p>
          <p className='text-1xl font-noraml  text-gray-800 hover:cursor-pointer'> Terms of Use | Privacy Policy</p>
        </div>
      </div>

      <div className="w-6 bg-white" />

    </div>
  );
}

export default LoginPage;
