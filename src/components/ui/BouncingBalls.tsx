/**
 * Animated typing indicator with bouncing balls
 * Simple, minimal implementation
 */
import React from 'react';

interface BouncingBallsProps {
  className?: string;
  count?: number;
  color?: string;
}

/**
 * Animated typing indicator with bouncing balls
 */
export const BouncingBalls: React.FC<BouncingBallsProps> = ({
  className = '',
  count = 3,
  color = '#3B82F6', // Default blue
}) => {
  // Create animation keyframes for bounce effect
  const keyframes = `
    @keyframes waveFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
  `;

  // Create an array of balls based on count
  const balls = Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      style={{
        width: '6px',
        height: '6px',
        backgroundColor: color,
        borderRadius: '50%',
        margin: '0 2px',
        animation: `waveFloat 1.3s ease-in-out ${index * 0.16}s infinite`,
      }}
    />
  ));

  return (
    <div
      className={`gravity-typing-indicator ${className}`}
      style={{ display: 'flex', marginRight: '10px' }}
    >
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      {balls}
    </div>
  );
};

export default BouncingBalls;
