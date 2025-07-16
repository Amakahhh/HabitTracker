import React, { useEffect, useState, useId } from 'react';
import Navbar from '../components/Navbar';
import HabitCard from '../components/HabitCard';
import AddHabitModal from '../components/AddHabitModal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function HomePage() {
  const { token, username } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchHabits();
    // eslint-disable-next-line
  }, [token]);

  const fetchHabits = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8080/api/habits', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch habits');
      const data = await res.json();
      setHabits(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate habits tracked today
  const habitsTrackedToday = habits.filter(h => h.trackedToday).length;

  // Helper to reorder habits array
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    setHabits(prev => reorder(prev, result.source.index, result.destination.index));
  };

  return (
    <div style={{ background: '#f7fafc', minHeight: '100vh' }}>
      <Navbar habitsTrackedToday={habitsTrackedToday} />
      <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
        <button
          style={{
            background: '#42b8e0', color: '#fff', border: 'none', borderRadius: 10,
            padding: '0.8rem 2rem', fontSize: '1.1rem', marginBottom: '1.5rem', cursor: 'pointer', fontWeight: 600
          }}
          onClick={() => setShowAdd(true)}
        >
          + Add New Habit
        </button>
        {showAdd && (
          <AddHabitModal
            onClose={() => setShowAdd(false)}
            onSuccess={fetchHabits}
          />
        )}
        {loading ? (
          <div>Loading habits...</div>
        ) : error ? (
          <div style={{ color: '#e74c3c' }}>{error}</div>
        ) : habits.length === 0 ? (
          <div>No habits yet. Start by adding one!</div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="habits-droppable">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {habits.map((habit, index) => (
                    <Draggable key={habit.id} draggableId={habit.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <HabitCard
                          ref={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          id={habit.id}
                          title={habit.name}
                          description={habit.description}
                          streak={habit.last10Days || []}
                          trackedToday={habit.trackedToday}
                          currentStreak={habit.currentStreak}
                          longestStreak={habit.longestStreak}
                          onTrack={async () => {
                            await fetch(`http://localhost:8080/api/habits/${habit.id}/track`, {
                              method: 'POST',
                              headers: { 'Authorization': `Bearer ${token}` }
                            });
                            fetchHabits();
                          }}
                          onViewDetails={() => navigate(`/habit/${habit.id}`)}
                          onDelete={async (habitId) => {
                            try {
                              await fetch(`http://localhost:8080/api/habits/${habitId}`, {
                                method: 'DELETE',
                                headers: { 'Authorization': `Bearer ${token}` }
                              });
                              fetchHabits();
                            } catch (err) {
                              setError('Failed to delete habit');
                            }
                          }}
                          index={index}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? 0.7 : 1,
                          }}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}