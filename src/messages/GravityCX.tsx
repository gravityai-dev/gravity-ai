/**
 * GravityCX - Component Experience renderer for Gravity messages
 */

import React from 'react';
import { MdxComponent } from './MdxComponent';
import { useGravity } from '../hooks/useGravity';
import { useGravityStore } from '../store';
import { ComponentType } from '../types';

interface GravityCXProps {
  message?: any; // Optional - will use activeResponse from context if not provided
  className?: string;
  markdownOptions?: any;
  component?: ComponentType; // Filter by component type
}

export const GravityCX: React.FC<GravityCXProps> = ({ 
  message,
  className = "",
  markdownOptions,
  component
}) => {
  const { activeResponse } = useGravity();
  const storeMarkdownOptions = useGravityStore(state => state.markdownOptions);
  const finalMarkdownOptions = markdownOptions || storeMarkdownOptions;
  
  if (!activeResponse || !component) return null;
  
  // Get data based on component type
  let data: any = null;
  if (component === 'progress') data = activeResponse.progressUpdate;
  else if (component === 'chunk') data = activeResponse.messageChunks;
  else if (component === 'json') data = activeResponse.jsonData;
  else if (component === 'action') data = activeResponse.actionSuggestion;
  else if (component === 'metadata') data = activeResponse.metadata;
  else if (component === 'image') data = activeResponse.imageResponse;
  else if (component === 'tool') data = activeResponse.toolOutput;
  else if (component === 'text') data = activeResponse.text;
  
  if (!data) return null;
  
  // Special handling for JSON data - don't render, just make it available in the store
  if (component === 'json') {
    // JSON data is now an array and available in activeResponse.jsonData
    // Return null - client code should access it directly from the store
    return null;
  }

  // Special handling for chunks - concatenate into single message
  if (component === 'chunk' && Array.isArray(data)) {
    const combinedText = data.map((chunk: any) => chunk.text).join('');
    return <MdxComponent message={{ mdxContent: combinedText }} className={className} markdownOptions={finalMarkdownOptions} />;
  }
  
  // Render arrays
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((msg, idx) => (
          <MdxComponent key={idx} message={msg} className={className} markdownOptions={finalMarkdownOptions} />
        ))}
      </>
    );
  }
  
  // Render text as mdxContent
  if (component === 'text') {
    return <MdxComponent message={{ mdxContent: data }} className={className} markdownOptions={finalMarkdownOptions} />;
  }
  
  // Render single message
  return <MdxComponent message={data} className={className} markdownOptions={finalMarkdownOptions} />;
};
