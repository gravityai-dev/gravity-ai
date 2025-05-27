/**
 * MdxComponent - Renders MDX/Markdown content from server
 * Styling is handled by the client application
 */
import React from 'react';
import Markdown from 'markdown-to-jsx';

interface MdxComponentProps {
  message: {
    code?: string;
    mdxContent?: string;
    [key: string]: any;
  };
  className?: string;
  markdownOptions?: any; // Allow client to pass custom markdown options
}

export const MdxComponent: React.FC<MdxComponentProps> = ({ 
  message, 
  className = "",
  markdownOptions 
}) => {
  // Extract mdxContent from the message
  const mdxContent = message?.mdxContent || (message as any)?.message || '';
  
  // Always parse through markdown-to-jsx to handle JSX/MDX properly
  // This will correctly parse className attributes and other JSX features
  return (
    <div className={className}>
      <Markdown options={markdownOptions}>
        {mdxContent}
      </Markdown>
    </div>
  );
};
