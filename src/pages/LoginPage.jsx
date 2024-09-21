import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/input';
import Button from '../components/ui/Button'

function LoginPage() {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

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

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder='User'
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required

        />
        <Input
          type="password"
          name="password"
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type='submit'> Login </Button>
      </form>
    </div>
  );
}

export default LoginPage;
