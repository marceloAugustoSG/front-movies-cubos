import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

interface CircleProgressProps {
  rating: number;
  size?: number;
}

const CanvasContainer = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;

const BlurOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 50%;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  background: rgba(0, 0, 0, 0);
  z-index: 1;
  transition: backdrop-filter 0.2s ease, background 0.2s ease;
  opacity: 0;
  
  .movie-card:hover & {
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    background: #00000080;
    opacity: 1;
  }
`;

const RatingText = styled.span`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-size: 24px;
  z-index: 2;
  position: relative;
  color: #FFFFFF;
`;

const CircleProgress: React.FC<CircleProgressProps> = ({ rating, size = 120 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;
    
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size - 16) / 2;

    ctx.clearRect(0, 0, size, size);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#3C393F';
    ctx.lineWidth = 8;
    ctx.stroke();

    const progressDegrees = rating * 3.6;
    const startAngle = 0;
    const progressAngle = (progressDegrees * Math.PI) / 180;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + progressAngle);
    ctx.strokeStyle = '#FFE000';
    ctx.lineWidth = 8;
    ctx.stroke();
  }, [rating, size]);

  return (
    <CanvasContainer size={size}>
      <Canvas ref={canvasRef} />
      <BlurOverlay />
      <RatingText>
        {rating}%
      </RatingText>
    </CanvasContainer>
  );
};

export default CircleProgress;
