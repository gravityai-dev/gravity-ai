/**
 * Avatar component for users and agents
 * Simple, focused implementation
 */
import React from 'react';
import BouncingBalls from './BouncingBalls.js';

interface AvatarProps {
  type: 'agent' | 'user';
  isStreaming?: boolean;
  className?: string;
  avatarUrl?: string;
}

/**
 * Unified Avatar component for both agent and user
 */
export const Avatar: React.FC<AvatarProps> = ({
  type = 'user',
  isStreaming = false,
  className = '',
  avatarUrl,
}) => {
  // Use provided URL or fallback to default URLs
  const imageUrl =
    avatarUrl ||
    (type === 'agent'
      ? 'https://res.cloudinary.com/sonik/image/upload/v1742546227/BookSwipe/girl.jpg'
      : 'https://res.cloudinary.com/sonik/image/upload/v1742546227/BookSwipe/guy.jpg');

  return (
    <div
      className={`gravity-avatar gravity-avatar-${type} ${className}`}
      style={{
        position: 'relative',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        overflow: 'hidden',
        marginLeft: type === 'user' ? '8px' : '0',
      }}
    >
      <img
        src={imageUrl}
        alt={`${type} avatar`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Show typing indicator when streaming */}
      {isStreaming && type === 'agent' && (
        <div
          className="gravity-streaming-indicator"
          style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
          }}
        >
          <BouncingBalls count={3} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
