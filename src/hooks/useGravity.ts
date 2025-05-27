/**
 * Main hook for accessing Gravity AI functionality
 */

import { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { useGravityStore } from '../store';
import { transformServerToClientMessage } from '../shared';
import { ChatState } from '../types';

export function useGravity() {
  const apolloClient = useApolloClient();
  const store = useGravityStore();
  const {
    connection,
    activeResponse,
    conversation,
    appState,
    connect,
    disconnect,
    sendMessage,
    processMessage,
    startActiveResponse,
    completeActiveResponse,
    clearActiveResponse,
    clearConversation,
    setupSubscription,
    cleanupSubscription,
  } = store;

  // Cleanup subscription on unmount
  useEffect(() => {
    return () => {
      if (connection.subscription) {
        cleanupSubscription();
      }
    };
  }, [connection.subscription, cleanupSubscription]);

  return {
    // State
    activeResponse,
    conversation,
    connection,
    appState,
    isConnected: connection.isConnected,
    chatState: activeResponse.state,
    messages: conversation.messages,

    // Actions
    connect,
    disconnect,
    sendMessage,
    startActiveResponse,
    completeActiveResponse,
    clearActiveResponse,
    reset: clearConversation,
  };
}
