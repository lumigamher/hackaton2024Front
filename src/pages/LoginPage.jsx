import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
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
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      'username': formData.username,
      'password': formData.password
    };
    try {
      await login(payload);
      Toast.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso'
      });
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Error al iniciar sesión'
      });
    }
  };

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  const handleGoogleLogin = () => {
    console.log("Iniciando sesión con Google");
  };

  const handleFacebookLogin = () => {
    window.location.href = "https://main.dn8l53vpaw68b.amplifyapp.com/oauth2/authorization/facebook";
  };

  return (
    <div className="flex h-screen w-screen justify-center md:justify-between lg:justify-between bg-gray-100">
      <div className="w-6 bg-white hidden md:block">
        <h2 className="translate-y-7 rotate-90 font-bold">ChroniX</h2>
      </div>

      <div className='text-center grid grid-rows-3 grid-cols-1 md:grid-cols-3'>
        <form onSubmit={handleSubmit} onKeyDown={(e => {
          if (e.key === 'Enter') {
            handleSubmit(e);
          }
        })}
          className='row-start-2 row-end-3 col-start-1 md:col-start-2 flex flex-col gap-1 p-5 md:p-0'>
          <h2 className='text-4xl md:text-6xl text-center font-bold mb-5'>Login</h2>
          <Input
            placeholder='User'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <i
              className={`absolute left-5 top-7 hover:cursor-pointer bx-low-vision bx ${isVisible ? 'text-gray-200' : 'text-black'}`}
              onClick={toggleVisibility}
            ></i>
            <Input
              type={isVisible ? 'text' : 'password'}
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i
              className='absolute right-5 top-7 hover:cursor-pointer text-gray-400 bx bx-right-arrow-alt'
              onClick={handleSubmit}
            ></i>
          </div>
          <div className='row-start-3 row-end-4 col-start-1 md:col-start-2 self-center md:self-end pb-10 flex flex-col gap-5'>
            <Button type="button" onClick={handleGoogleLogin}>
              <i className='bx bxl-google'></i> Sign In With Google
            </Button>
            <Button type="button" onClick={handleFacebookLogin}>
              <i className='bx bxl-facebook'></i> Sign In With Facebook
            </Button>
            <p className='text-sm md:text-xl font-normal'>Don't have an account? <Link to='/register' className='text-orange-400 underline'>Sign up here</Link></p>
            <p className='text-xs md:text-1xl font-normal text-gray-800 hover:cursor-pointer'>Terms of Use | Privacy Policy</p>
          </div>
        </form>


      </div>

      <div className="w-6 bg-white hidden md:block" />
    </div>
  );
}

export default LoginPage;