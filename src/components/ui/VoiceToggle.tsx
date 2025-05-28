/**
 * VoiceToggle component
 * 
 * Simple UI component for toggling voice streaming on/off
 */

import React from 'react';

export interface VoiceToggleProps {
  isEnabled: boolean;
  isSpeaking?: boolean;
  onClick: () => void;
  className?: string;
}

export const VoiceToggle: React.FC<VoiceToggleProps> = ({
  isEnabled,
  isSpeaking = false,
  onClick,
  className = '',
}) => {
  // Combine classes for styling
  const baseClasses = 'flex items-center justify-center p-2 rounded-full transition-all duration-200';
  const stateClasses = isEnabled 
    ? 'bg-blue-500 text-white hover:bg-blue-600' 
    : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600';
  const speakingClasses = isSpeaking ? 'animate-pulse' : '';
  const combinedClasses = `${baseClasses} ${stateClasses} ${speakingClasses} ${className}`;

  return (
    <button 
      onClick={onClick}
      className={combinedClasses}
      aria-label={isEnabled ? 'Disable voice' : 'Enable voice'}
      title={isEnabled ? 'Disable voice' : 'Enable voice'}
    >
      {isSpeaking ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      ) : isEnabled ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
          <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      )}
    </button>
  );
};
