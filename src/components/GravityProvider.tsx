/**
 * GravityProvider
 * Provides Gravity AI context and manages connection lifecycle
 */

import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useGravityStore } from '../store';
import { GravityConfig } from '../types';

interface GravityProviderProps {
  config: GravityConfig;
  children: React.ReactNode;
}

export const GravityProvider: React.FC<GravityProviderProps> = ({ 
  config, 
  children 
}) => {
  const { connect, disconnect, connection } = useGravityStore();
  
  // Connect on mount
  useEffect(() => {
    connect(config);
    
    // Disconnect on unmount
    return () => {
      disconnect();
    };
  }, [config, connect, disconnect]);
  
  // If we don't have a client yet, show loading or nothing
  if (!connection.client) {
    return null; // Or a loading spinner
  }
  
  // Wrap children with ApolloProvider
  return (
    <ApolloProvider client={connection.client}>
      {children}
    </ApolloProvider>
  );
};
