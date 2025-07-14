import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(44, 85, 97, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;
const Modal = styled.div`
  background: rgba(255,255,255,0.92);
  border-radius: 22px;
  padding: 2.2rem 2.7rem;
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
const TextArea = styled.textarea`
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
const BtnRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
const AddBtn = styled.button`
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
const CancelBtn = styled.button`
  background: linear-gradient(90deg, #d9cca8 0%, #fff 100%);
  color: #2b5561;
  border: none;
  border-radius: 10px;
  padding: 0.7rem 1.7rem;
  font-size: 1.08rem;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(44, 85, 97, 0.08);
  transition: background 0.2s, color 0.2s;
  &:hover { background: #42b8e0; color: #fff; }
`;
const ErrorMsg = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  font-weight: 500;
`;

export default function AddHabitModal({ onClose, onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8080/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: title, description })
      });
      if (!res.ok) throw new Error('Failed to add habit');
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <Title>Add New Habit</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <TextArea
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <BtnRow>
            <CancelBtn type="button" onClick={onClose}>Cancel</CancelBtn>
            <AddBtn type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Habit'}</AddBtn>
          </BtnRow>
        </form>
      </Modal>
    </Overlay>
  );
} 