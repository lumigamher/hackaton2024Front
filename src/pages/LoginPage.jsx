import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/input';
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isVisible, setisVisible] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      'username': formData.username,
      'password': formData.password
    }
    login(payload)
    Toast.fire({
      icon: 'success',
      title: 'Inicio de sesión exitoso'
  });
  };

  const toogleVisibility = () => {
    setisVisible(prev => !prev)
  }

  return (

    <div className="flex h-screen w-screen justify-between bg-gray-100">

      <div className="w-6 bg-white">
        <h2 className="translate-y-7 rotate-90 font-bold">ChroniX</h2>
      </div>

      <div className=' text-center grid grid-rows-3 grid-cols-3'>
        <form onSubmit={handleSubmit}
          className='row-start-2 row-end-3 col-start-2 flex flex-col  gap-1'>
          <h2 className='text-6xl text-center font-bold mb-5'> Login </h2>
          <Input
            placeholder='User'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required

          />
          <div>

            <i
              className={`absolute translate-x-5 translate-y-7 py-0.5 hover:cursor-pointer bx-low-vision  bx ${isVisible ? 'text-gray-200' : 'text-black'}`}
              onClick={toogleVisibility}
            >
            </i>

            <Input
              type={isVisible? 'text' : 'password'}
              name="password"
              placeholder='Password'

              value={formData.password}
              onChange={handleChange}
              required
            />
            <i
              className='absolute -translate-x-8 translate-y-7 pt-0.5 hover:cursor-pointer text-gray-400 bx bx-right-arrow-alt'
              onClick={handleSubmit}
            >

            </i>
          </div>
          <Button> <i className='bx bxl-google'></i> Sign In With Google </Button>
        </form>

        <div className='row-start-3 row-end-4 col-start-2 self-end pb-10 flex flex-col gap-5' >
          <p className='text-xl font-normal'> Don't have an account? <Link to='/register' className='text-orange-400 underline'>Sign up here</Link> </p>
          <p className='text-1xl font-noraml  text-gray-800 hover:cursor-pointer'> Terms of Use | Privacy Policy</p>
        </div>
      </div>

      <div className="w-6 bg-white" />

    </div>
  );
}

export default LoginPage;
