/**
 * Message bubble component
 * Based on the legacy implementation to maintain styling consistency
 */
import React from 'react';
import BouncingBalls from './BouncingBalls';

interface BubbleProps {
  type: 'agent' | 'user';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isStreaming?: boolean;
  typingIndicatorText?: string;
}

/**
 * Message bubble component with different styles for agents and users
 */
export const Bubble: React.FC<BubbleProps> = ({
  type = 'user',
  children,
  className = '',
  style = {},
  isStreaming = false,
  typingIndicatorText = 'Agent is typing...',
}) => {
  // Create base style object
  const baseStyle: React.CSSProperties = {
    padding: '14px 20px',
    borderRadius: '18px',
    maxWidth: '100%',
    ...style, // Allow custom styles to override defaults
  };

  // Add type-specific styles
  if (type === 'user') {
    // User message styling
    baseStyle.backgroundColor = '#0071E3';
    baseStyle.color = 'white';
    baseStyle.borderTopRightRadius = 0;
    baseStyle.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
  } else {
    // Agent message styling
    baseStyle.backgroundColor = 'white';
    baseStyle.color = '#1D1D1F';
    baseStyle.borderTopLeftRadius = 0;
    baseStyle.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';

    // Add border in light mode
    baseStyle.border = '1px solid #F5F5F7';

    // Add streaming indicator if needed
    if (isStreaming) {
      //baseStyle.border = "1px solid #0071E3";
    }
  }

  // Keep the class for potential customization
  const bubbleClasses = `gravity-${type}-bubble ${isStreaming ? 'streaming' : ''} ${className}`;

  return (
    <div className={bubbleClasses} style={baseStyle}>
      {/* Show typing indicator when streaming */}
      {isStreaming && type === 'agent' && (
        <div className="flex items-center gap-2 mb-2">
          <BouncingBalls count={3} color="#3B82F6" />
          <span className="text-blue-600 text-sm">{typingIndicatorText}</span>
        </div>
      )}

      {/* Always show children */}
      {children}
    </div>
  );
};

export default Bubble;
