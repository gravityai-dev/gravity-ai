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

// UI Components
export { default as Avatar } from './components/ui/Avatar';
export { default as Bubble } from './components/ui/Bubble';
export { default as BouncingBalls } from './components/ui/BouncingBalls';
export { default as TimeStamp } from './components/ui/TimeStamp';
export { InAppLink } from './components/ui/InAppLink';

// Message components
export { MdxComponent } from './messages/MdxComponent';
export { GravityCX } from './messages/GravityCX';

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
