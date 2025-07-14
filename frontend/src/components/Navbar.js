import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Bar = styled.nav`
  width: 100%;
  background: linear-gradient(90deg, #2b5561 0%, #42b8e0 60%, #fff 100%);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2.5rem;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  box-shadow: 0 4px 24px rgba(66, 184, 224, 0.10);
  border-radius: 32px;
  margin: 2rem auto 2.5rem auto;
  max-width: 900px;
  border: 1.5px solid #acccc4;
`;
const User = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;
const Count = styled.div`
  background: #d9cca8;
  color: #2b5561;
  border-radius: 20px;
  padding: 0.4rem 1.1rem;
  margin-left: 1rem;
  font-weight: bold;
  font-size: 1rem;
`;
const LogoutBtn = styled.button`
  background: linear-gradient(90deg, #42b8e0 0%, #2b5561 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 2rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(44, 85, 97, 0.08);
  transition: background 0.2s, color 0.2s, transform 0.15s;
  &:hover {
    background: linear-gradient(90deg, #2b5561 0%, #42b8e0 100%);
    color: #d9cca8;
    transform: scale(1.07) translateY(-2px);
    box-shadow: 0 6px 24px rgba(66,184,224,0.18);
  }
`;

export default function Navbar({ habitsTrackedToday }) {
  const { username, logout } = useAuth();
  return (
    <Bar>
      <div style={{ fontWeight: 'bold', fontSize: '1.6rem', letterSpacing: '1px', textShadow: '0 2px 8px rgba(44,85,97,0.08)' }}>
        Habit Tracker
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <User>{username}</User>
        <Count>{habitsTrackedToday} tracked today</Count>
        <LogoutBtn onClick={logout}>Logout</LogoutBtn>
      </div>
    </Bar>
  );
} 