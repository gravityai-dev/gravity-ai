/**
 * Client-specific types
 */

import { GravityMessage, ChatState, MessageType } from './shared/types';
import { ApolloClient } from '@apollo/client';

// Component types that can be rendered from activeResponse
export type ComponentType = 'progress' | 'chunk' | 'json' | 'action' | 'metadata' | 'image' | 'tool' | 'text';

// Configuration for the Gravity client
export interface GravityConfig {
  endpoint: string;
  apiKey?: string;
  headers?: Record<string, string>;
  markdownOptions?: any; // Custom markdown-to-jsx options
}

// Connection state
export interface ConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  client: ApolloClient<any> | null;
  subscription: any | null;
}

// Active response state - preserving the complex state machine
export interface ActiveResponse {
  chatId: string | null;
  conversationId: string | null;
  userId: string | null;
  state: ChatState;

  // Indicates if message is from 'user' or 'agent'
  messageSource: 'user' | 'agent' | null;

  // Message collections - only messageChunks remains an array
  messageChunks: GravityMessage[];
  progressUpdate: GravityMessage | null;
  jsonData: GravityMessage[];
  actionSuggestion: GravityMessage | null;
  metadata: GravityMessage | null;
  imageResponse: GravityMessage | null;
  toolOutput: GravityMessage | null;

  // Text content
  text: string | null;

  // Current streaming message
  currentMessageChunk: string | null;

  // Aggregated content
  fullMessage: string;

  // Metadata
  startTime: number | null;
  endTime: number | null;
  error: string | null;

  // Component definition from server
  component?: {
    type?: string;
    access?: string;
    version?: string;
    styles?: {
      container?: string;
      content?: string;
      line?: string;
      [key: string]: string | undefined;
    };
  };
}

// Conversation state
export interface ConversationState {
  conversationId: string | null;
  messages: GravityMessage[];
  isLoading: boolean;
}

// App state for UI management
export interface AppState {
  sidebarOpen: boolean;
  activeObjectId: string | null;
}

// Main store interface
export interface GravityStore {
  // Connection slice
  connection: ConnectionState;
  markdownOptions?: any; // Custom markdown-to-jsx options
  connect: (config: GravityConfig) => Promise<void>;
  disconnect: () => void;
  setupSubscription: (conversationId: string) => void;
  cleanupSubscription: () => void;

  // Active response slice
  activeResponse: ActiveResponse;
  startActiveResponse: (
    chatId: string,
    conversationId: string,
    userId: string,
    userQuery?: string
  ) => void;
  processMessage: (message: GravityMessage) => void;
  completeActiveResponse: () => void;
  clearActiveResponse: () => void;

  // Conversation slice
  conversation: ConversationState;
  setConversationId: (id: string) => void;
  addMessage: (message: GravityMessage) => void;
  clearConversation: () => void;

  // App state slice
  appState: AppState;
  toggleSidebar: (forceState?: boolean) => void;
  setActiveObject: (id: string | null) => void;

  // Actions
  sendMessage: (text: string) => Promise<void>;
}

// Re-export shared types that are used in client
export { ChatState, MessageType } from './shared/types';

// Type alias for backward compatibility
export type GravityEvent = GravityMessage;
