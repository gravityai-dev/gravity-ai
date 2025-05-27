/**
 * Timestamp component for messages
 * Clean, minimal implementation
 */
import React from 'react';

interface TimeStampProps {
  timestamp?: string | number | Date;
  className?: string;
  align?: 'left' | 'right' | 'center';
}

/**
 * Format a date to relative time (e.g., "2 min ago")
 */
function formatRelativeTime(date: string | number | Date): string {
  const now = new Date();
  const messageDate = new Date(date);
  const diffMs = now.getTime() - messageDate.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  // Less than a minute
  if (diffSec < 60) {
    return 'just now';
  }

  // Less than an hour
  if (diffSec < 3600) {
    const minutes = Math.floor(diffSec / 60);
    return `${minutes} min ago`;
  }

  // Less than a day
  if (diffSec < 86400) {
    const hours = Math.floor(diffSec / 3600);
    return `${hours} hr ago`;
  }

  // Format as time if today
  if (messageDate.toDateString() === now.toDateString()) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Format as date otherwise
  return messageDate.toLocaleDateString();
}

/**
 * TimeStamp component for displaying message timestamps
 */
export const TimeStamp: React.FC<TimeStampProps> = ({
  timestamp,
  className = '',
  align = 'left',
}) => {
  if (!timestamp) return null;

  // Format the timestamp
  const formattedTime = formatRelativeTime(timestamp);

  // Alignment style
  const alignStyle = {
    textAlign: align,
  } as React.CSSProperties;

  return (
    <div
      className={`gravity-timestamp gravity-timestamp-${align} ${className}`}
      style={{
        fontSize: '12px',
        color: '#777777',
        margin: '4px 0',
        ...alignStyle,
      }}
    >
      {formattedTime}
    </div>
  );
};

export default TimeStamp;
