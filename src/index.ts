/**
 * Client SDK for React developers
 * Provides components and hooks for building Gravity AI chat interfaces
 */

// Core exports
export { GravityProvider } from './components/GravityProvider';
export { GravityContainer } from './components/GravityContainer';

// Hooks
export { useGravity } from './hooks/useGravity';
export { useActiveResponse } from './hooks/useActiveResponse';
export { useConnection } from './hooks/useConnection';
export { useVoiceStream } from './hooks/useVoiceStream';
export type { VoiceStreamOptions, VoiceStreamState } from './hooks/useVoiceStream';

// UI Components
export { default as Avatar } from './components/ui/Avatar';
export { default as Bubble } from './components/ui/Bubble';
export { default as BouncingBalls } from './components/ui/BouncingBalls';
export { default as TimeStamp } from './components/ui/TimeStamp';
export { InAppLink } from './components/ui/InAppLink';
export { VoiceToggle } from './components/ui/VoiceToggle';
export { VoiceInput, useVoiceInput } from './components/VoiceInput';
export type { VoiceInputProps } from './components/VoiceInput';

// Message components
export { MdxComponent } from './messages/MdxComponent';
export { GravityCX } from './messages/GravityCX';
export { VoiceStream } from './components/VoiceStream';
export type { VoiceStreamProps } from './components/VoiceStream';

// Store and actions
export { useGravityStore } from './store';

// Export store actions for direct use - matching legacy implementation
import { useGravityStore } from './store';

/**
 * Toggle the sidebar open or closed
 */
export function toggleSidebar(forceState?: boolean) {
  return useGravityStore.getState().toggleSidebar(forceState);
}

/**
 * Set the active object in the sidebar
 */
export function setActiveObject(id: string | null) {
  return useGravityStore.getState().setActiveObject(id);
}

// Utilities
export { transformServerToClientMessage } from './shared';
export { audioEventEmitter } from './utils/audioEventEmitter';

// GraphQL Operations
export { 
  TALK_TO_AGENT,
  AGENT_STREAM,
  GET_CHAT_STATUS,
  GET_NODE_TYPES,
  GET_WORKFLOWS,
  GET_WORKFLOW,
  SAVE_WORKFLOW,
  DELETE_WORKFLOW,
  EXECUTE_WORKFLOW,
  GET_WORKFLOW_EXECUTION 
} from './graphql/operations';

// GraphQL Subscriptions
export {
  WORKFLOW_EXECUTION_SUBSCRIPTION
} from './graphql/subscriptions';

// Types
export type {
  GravityConfig,
  GravityStore,
  ActiveResponse,
  ConnectionState,
  ConversationState,
  AppState,
} from './types';

// Re-export shared types for convenience
export * from './shared/types';
