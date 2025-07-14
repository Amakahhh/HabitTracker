import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(66,184,224,0.10);
  padding: 2rem 2.5rem;
`;
const Title = styled.input`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2b5561;
  border: none;
  background: #f7fafc;
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.5rem;
`;
const Desc = styled.textarea`
  font-size: 1rem;
  color: #4a5a61;
  border: none;
  background: #f7fafc;
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.5rem;
`;
const Days = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1.5rem 0;
`;
const Day = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.done ? '#42b8e0' : '#d9cca8'};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
`;
const BtnRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;
const TrackBtn = styled.button`
  background: #acccc4;
  color: #2b5561;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  &:hover { background: #42b8e0; color: #fff; }
`;
const SaveBtn = styled.button`
  background: #42b8e0;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  &:hover { background: #2b5561; }
`;
const DeleteBtn = styled.button`
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-left: auto;
  &:hover { background: #c0392b; }
`;
const ErrorMsg = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
`;

export default function HabitDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchHabit();
    // eslint-disable-next-line
  }, [id, token]);

  const fetchHabit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/habits/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch habit');
      const data = await res.json();
      setHabit(data);
      setTitle(data.name);
      setDescription(data.description || '');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/habits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: title, description })
      });
      if (!res.ok) throw new Error('Failed to update habit');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleTrack = async () => {
    setTracking(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/habits/${id}/track`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to track habit');
      fetchHabit();
    } catch (err) {
      setError(err.message);
    } finally {
      setTracking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this habit?')) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/habits/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete habit');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  if (error) return <ErrorMsg>{error}</ErrorMsg>;
  if (!habit) return null;

  return (
    <Container>
      <DeleteBtn onClick={handleDelete} disabled={deleting} style={{ float: 'right' }}>
        {deleting ? 'Deleting...' : 'Delete'}
      </DeleteBtn>
      <Title
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={saving}
      />
      <Desc
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={3}
        disabled={saving}
      />
      <Days>
        {(habit.last10Days || []).map((done, i) => (
          <Day key={i} done={done}>{10 - i}</Day>
        ))}
      </Days>
      <BtnRow>
        <TrackBtn onClick={handleTrack} disabled={habit.trackedToday || tracking}>
          {habit.trackedToday ? 'Tracked Today' : tracking ? 'Tracking...' : 'Track Today'}
        </TrackBtn>
        <SaveBtn onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Done'}
        </SaveBtn>
      </BtnRow>
    </Container>
  );
} 