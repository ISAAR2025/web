import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Signup.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('API URL:', process.env.REACT_APP_API_URL);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (data.token) {
      login(data.token, data.user);
      navigate('/');
    } else {
      alert(data.error || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
       <p className="forgot-password-text">
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
      </p>


      <p className="register-redirect-text">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="register-link-button">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
