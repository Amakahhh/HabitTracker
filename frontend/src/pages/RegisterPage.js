import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
`;
const Card = styled.div`
  background: rgba(255,255,255,0.92);
  border-radius: 22px;
  padding: 2.5rem 2.7rem;
  box-shadow: 0 8px 32px rgba(66,184,224,0.18);
  min-width: 340px;
  max-width: 95vw;
  border: 2.5px solid transparent;
  border-image: linear-gradient(120deg, #42b8e0 0%, #acccc4 100%) 1;
`;
const Title = styled.h2`
  margin-top: 0;
  color: #2b5561;
  font-size: 1.4rem;
  font-weight: 700;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.1rem;
  border-radius: 10px;
  border: 1.5px solid #acccc4;
  font-size: 1.08rem;
  background: #f7fafc;
  transition: border 0.2s;
  &:focus { border-color: #42b8e0; }
`;
const Btn = styled.button`
  background: linear-gradient(90deg, #42b8e0 0%, #fff 100%);
  color: #2b5561;
  border: none;
  border-radius: 10px;
  padding: 0.7rem 1.7rem;
  font-size: 1.08rem;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(44, 85, 97, 0.08);
  transition: background 0.2s, color 0.2s;
  &:hover { background: #acccc4; color: #2b5561; }
`;
const ErrorMsg = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  font-weight: 500;
`;
const SwitchLink = styled.div`
  margin-top: 1.2rem;
  font-size: 1rem;
  color: #2b5561;
`;

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Registration failed');
      const data = await res.json();
      login(data.token, username);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Card>
        <form className="auth-form" onSubmit={handleSubmit}>
          <Title>Register</Title>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <Btn type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</Btn>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <SwitchLink>
            Already have an account? <Link to="/login">Login</Link>
          </SwitchLink>
        </form>
      </Card>
    </Wrapper>
  );
} 