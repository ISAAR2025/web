import { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', code: '' });
  const [codeSent, setCodeSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendVerificationCode = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/send-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email }),
    });

    const data = await res.json();
    if (data.success) {
      alert('Verification code sent!');
      setCodeSent(true);
    } else {
      alert(`Failed: ${data.message || data.error || 'Unknown error'}`);
    }
  } catch (err) {
    alert('Network error. Check server is running.');
    console.error('Send code error:', err);
  }
};

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (data.success) {
      alert('Registered! Please login.');
      navigate('/login');
    } else {
      alert(data.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />

        <button type="button" onClick={sendVerificationCode} disabled={codeSent}>
          {codeSent ? 'Code Sent' : 'Send Verification Code'}
        </button>

        <input name="code" placeholder="Enter Verification Code" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
