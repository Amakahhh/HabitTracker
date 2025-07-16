import React, { forwardRef } from 'react';
import styled from 'styled-components';

const pastelColors = [
  '#dbeafe', // blue
  '#ede9fe', // purple
  '#fef9c3', // yellow
  '#fce7f3', // pink
  '#d1fae5', // green
];

const Card = styled.div`
  background: ${({ color }) => color};
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(44, 85, 97, 0.08);
  padding: 1.5rem 1.3rem;
  margin: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  border: none;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  width: 90%;
  max-width: 600px;
  min-width: 220px;
  transition: box-shadow 0.2s, transform 0.15s;
  &:hover {
    box-shadow: 0 8px 24px rgba(44,85,97,0.13);
    transform: scale(1.03) translateY(-2px);
  }
  @media (min-width: 700px) {
    width: 60%;
    padding: 2rem 2.2rem;
  }
`;
const Title = styled.h3`
  margin: 0;
  color: #2b5561;
  font-size: 1.15rem;
  font-weight: 700;
`;
const Desc = styled.p`
  margin: 0;
  color: #4a5a61;
  font-size: 0.98rem;
`;
const StreakContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  margin: 0.5rem 0;
  align-items: center;
`;
const StreakLabel = styled.span`
  font-size: 0.8rem;
  color: #64748b;
  margin-right: 0.5rem;
  font-weight: 500;
`;
const Day = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.completed ? '#42b8e0' : '#e2e8f0'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  color: ${props => props.completed ? '#fff' : '#94a3b8'};
  position: relative;
  
  &:hover::after {
    content: '${props => props.completed ? 'Completed' : 'Not completed'}';
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    background: #2b5561;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.6rem;
    white-space: nowrap;
    z-index: 10;
  }
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;
const TrackBtn = styled.button`
  background: ${props => props.trackedToday ? '#42b8e0' : '#acccc4'};
  color: ${props => props.trackedToday ? '#fff' : '#2b5561'};
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  &:hover {
    background: ${props => props.trackedToday ? '#2b5561' : '#42b8e0'};
    color: #fff;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
const ViewBtn = styled.button`
  background: #42b8e0;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  &:hover {
    background: #2b5561;
  }
`;
const DeleteBtn = styled.button`
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  &:hover {
    background: #c0392b;
  }
`;
const StreakSummary = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.3rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StreakStats = styled.div`
  display: flex;
  gap: 0.8rem;
  font-size: 0.7rem;
`;
const StreakStat = styled.span`
  color: ${props => props.highlight ? '#42b8e0' : '#64748b'};
  font-weight: ${props => props.highlight ? '600' : '500'};
`;

const HabitCard = forwardRef(function HabitCard({ 
  id, 
  title, 
  description, 
  streak, 
  trackedToday, 
  currentStreak,
  longestStreak,
  onTrack, 
  onViewDetails, 
  onDelete,
  index, 
  draggableProps, 
  dragHandleProps 
}, ref) {
  const color = pastelColors[index % pastelColors.length];
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      onDelete(id);
    }
  };

  // Calculate current streak from the displayed data
  const calculatedCurrentStreak = streak ? streak.slice(-7).reverse().reduce((count, completed) => {
    if (completed) return count + 1;
    return 0;
  }, 0) : 0;

  // Use backend streak data if available, otherwise calculate from displayed data
  const displayCurrentStreak = currentStreak || calculatedCurrentStreak;

  return (
    <Card color={color} ref={ref} {...draggableProps} {...dragHandleProps}>
      <Title>{title}</Title>
      {description && <Desc>{description}</Desc>}
      
      {streak && streak.length > 0 && (
        <>
          <StreakContainer>
            <StreakLabel>Streak:</StreakLabel>
            {streak.slice(-7).reverse().map((completed, i) => (
              <Day key={i} completed={completed} title={`Day ${i + 1}: ${completed ? 'Completed' : 'Not completed'}`}>
                {i + 1}
              </Day>
            ))}
          </StreakContainer>
          <StreakSummary>
            <StreakStats>
              <StreakStat highlight={displayCurrentStreak > 0}>
                Current: {displayCurrentStreak} day{displayCurrentStreak !== 1 ? 's' : ''}
              </StreakStat>
              {longestStreak > 0 && (
                <StreakStat>
                  Best: {longestStreak} day{longestStreak !== 1 ? 's' : ''}
                </StreakStat>
              )}
            </StreakStats>
            {displayCurrentStreak >= 7 && (
              <StreakStat highlight>🔥 {displayCurrentStreak} days!</StreakStat>
            )}
          </StreakSummary>
        </>
      )}
      
      <ButtonRow>
        <TrackBtn 
          trackedToday={trackedToday}
          onClick={onTrack}
          disabled={trackedToday}
        >
          {trackedToday ? '✓ Tracked' : 'Track Today'}
        </TrackBtn>
        <ViewBtn onClick={onViewDetails}>
          View
        </ViewBtn>
        <DeleteBtn onClick={handleDelete}>
          Delete
        </DeleteBtn>
      </ButtonRow>
    </Card>
  );
});

export default HabitCard; 