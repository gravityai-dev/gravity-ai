/**
 * Hook for accessing active response state
 */

import { useGravityStore } from '../store';
import { ChatState } from '../types';

export function useActiveResponse() {
  const activeResponse = useGravityStore(state => state.activeResponse);
  const processMessage = useGravityStore(state => state.processMessage);
  const completeActiveResponse = useGravityStore(state => state.completeActiveResponse);
  const clearActiveResponse = useGravityStore(state => state.clearActiveResponse);

  return {
    ...activeResponse,
    processMessage,
    completeActiveResponse,
    clearActiveResponse,
    isStreaming: activeResponse.state === ChatState.RESPONDING,
    hasContent: activeResponse.chatId !== null,
  };
}
