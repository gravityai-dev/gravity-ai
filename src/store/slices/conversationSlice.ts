/**
 * Conversation Slice
 *
 * Manages the conversation state, message history, and handles sending messages to the server.
 *
 * Key responsibilities:
 * - Storing conversation ID and message history
 * - Sending user messages to the server via GraphQL mutation
 * - Managing loading states during message transmission
 *
 * Note: User messages are NOT created locally. They are sent to the server and come back
 * through the subscription to maintain server as single source of truth.
 */

import { ConversationState, GravityStore, GravityEvent } from '../../types';
import { TALK_TO_AGENT } from '../../graphql/operations';
import { ChatState } from '../../shared/types';

/**
 * Generates a unique conversation ID using timestamp and random string
 * Format: conv_[timestamp]_[random]
 */
const generateConversationId = (): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `conv_${timestamp}_${randomStr}`;
};

/**
 * Generates a unique chat ID using timestamp and random string
 * Format: chat_[timestamp]_[random]
 */
const generateChatId = (): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `chat_${timestamp}_${randomStr}`;
};

/**
 * Interface defining the conversation slice API
 */
export interface ConversationSlice {
  conversation: ConversationState;
  setConversationId: (id: string) => void;
  addMessage: (message: GravityEvent) => void;
  clearConversation: () => void;
  sendMessage: (text: string, userId?: string) => Promise<void>;
}

/**
 * Initial state for the conversation
 * - conversationId: null until a conversation is started
 * - messages: empty array to store message history
 * - isLoading: tracks when a message is being sent
 */
const initialConversationState: ConversationState = {
  conversationId: null,
  messages: [],
  isLoading: false,
};

export const createConversationSlice = (
  set: (partial: Partial<GravityStore> | ((state: GravityStore) => Partial<GravityStore>)) => void,
  get: () => GravityStore
): ConversationSlice => ({
  conversation: initialConversationState,

  /**
   * Sets the active conversation ID
   * @param id - The conversation ID to set
   */
  setConversationId: (id: string) => {
    set((state: GravityStore) => ({
      conversation: {
        ...state.conversation,
        conversationId: id,
      },
    }));
  },

  /**
   * Adds a message to the conversation history
   * This is called when messages are received from the subscription
   * @param message - The message event to add to history
   */
  addMessage: (message: GravityEvent) => {
    set((state: GravityStore) => ({
      conversation: {
        ...state.conversation,
        messages: [...state.conversation.messages, message],
      },
    }));
  },

  /**
   * Resets the conversation state to initial values
   * Used when starting a new conversation
   */
  clearConversation: () => {
    set({
      conversation: initialConversationState,
    });
  },

  /**
   * Sends a user message to the server via GraphQL mutation
   *
   * Flow:
   * 1. Generate conversation/chat IDs if needed
   * 2. Set up subscription for the conversation
   * 3. Send message via GraphQL mutation
   * 4. Server processes message and sends back through subscription
   *
   * @param text - The message text to send
   * @param userId - Optional user ID, defaults to 'anonymous'
   */
  sendMessage: async (text: string, userId?: string) => {
    const state = get();
    const {
      connection,
      conversation,
      activeResponse,
      setConversationId,
      startActiveResponse,
      clearActiveResponse,
    } = state;

    // Clear any existing active response state
    clearActiveResponse();

    if (!connection.client) {
      throw new Error('Not connected to Gravity AI');
    }

    // Start loading
    set((state: GravityStore) => ({
      conversation: {
        ...state.conversation,
        isLoading: true,
      },
    }));

    try {
      // Generate new conversation and chat IDs if this is a new conversation
      let conversationId = conversation.conversationId || activeResponse.conversationId;
      let chatId = activeResponse.chatId;

      if (!conversationId) {
        conversationId = generateConversationId();
        chatId = generateChatId();

        // Update state with new IDs
        setConversationId(conversationId);
        startActiveResponse(chatId, conversationId, userId || 'anonymous');

        // Set up subscription for this conversation
        const setupSubscription = get().setupSubscription;
        if (setupSubscription) {
          setupSubscription(conversationId);
        }
      }

      // Send message to server via GraphQL mutation
      // The server will create the proper message event and send it back through the subscription
      try {
        const response = await connection.client.mutate({
          mutation: TALK_TO_AGENT,
          variables: {
            input: {
              message: text,
              conversationId: conversationId,
              chatId: chatId,
              userId: userId || 'anonymous',
            },
          },
        });

        //console.log('[Gravity AI] Message sent successfully:', response);
      } catch (error: any) {
        console.error('[Gravity AI] Mutation error:', error);
        console.error('[Gravity AI] Error stack:', error.stack);
        console.error('[Gravity AI] Error details:', {
          message: error.message,
          graphQLErrors: error.graphQLErrors,
          networkError: error.networkError,
          extraInfo: error.extraInfo,
        });
        throw error;
      }
    } catch (error) {
      throw error;
    } finally {
      // Stop loading
      set((state: GravityStore) => ({
        conversation: {
          ...state.conversation,
          isLoading: false,
        },
      }));
    }
  },
});
