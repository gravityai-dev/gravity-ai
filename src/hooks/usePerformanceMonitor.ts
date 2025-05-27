/**
 * Performance monitoring hook for tracking render counts and timing
 */
import { useRef, useEffect } from 'react';

export const usePerformanceMonitor = (componentName: string, props?: any) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(Date.now());
  
  useEffect(() => {
    renderCount.current++;
    const now = Date.now();
    const timeSinceLastRender = now - lastRenderTime.current;
    lastRenderTime.current = now;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName}:`, {
        renderCount: renderCount.current,
        timeSinceLastRender: `${timeSinceLastRender}ms`,
        props: props ? Object.keys(props) : 'none'
      });
    }
  });
  
  return {
    renderCount: renderCount.current,
    measureTime: (operation: string, fn: () => void) => {
      const start = performance.now();
      fn();
      const duration = performance.now() - start;
      
      if (process.env.NODE_ENV === 'development' && duration > 16) { // Longer than one frame
        console.warn(`[Performance] ${componentName}.${operation} took ${duration.toFixed(2)}ms`);
      }
    }
  };
};
