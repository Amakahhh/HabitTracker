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
const Time = styled.div`
  color: #2b5561;
  font-size: 0.93rem;
  margin-top: 0.5rem;
`;

const HabitCard = forwardRef(function HabitCard({ title, description, streak, trackedToday, onTrack, onViewDetails, index, draggableProps, dragHandleProps }, ref) {
  const color = pastelColors[index % pastelColors.length];
  return (
    <Card color={color} ref={ref} {...draggableProps} {...dragHandleProps}>
      <Title>{title}</Title>
      {description && <Desc>{description}</Desc>}
      {/* You can add time or other info here if needed */}
      {/* <Time>10:30 AM – 12:00 PM</Time> */}
    </Card>
  );
});

export default HabitCard; 