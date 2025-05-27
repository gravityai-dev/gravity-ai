/**
 * Active response slice for managing streaming AI responses
 * Preserves the complex state machine from the original implementation
 */

import { ActiveResponse, GravityStore, GravityEvent, ChatState, MessageType } from '../../types';

export interface ActiveResponseSlice {
  activeResponse: ActiveResponse;
  startActiveResponse: (chatId: string, conversationId: string, userId: string) => void;
  processMessage: (message: GravityEvent) => void;
  completeActiveResponse: () => void;
  clearActiveResponse: () => void;
}

const initialActiveResponse: ActiveResponse = {
  state: ChatState.IDLE,
  chatId: null,
  conversationId: null,
  userId: null,
  messageSource: null,
  messageChunks: [],
  progressUpdate: null,
  jsonData: [],
  actionSuggestion: null,
  metadata: null,
  imageResponse: null,
  toolOutput: null,
  text: null,
  currentMessageChunk: null,
  fullMessage: '',
  startTime: null,
  endTime: null,
  error: null,
};

export const createActiveResponseSlice = (
  set: (partial: Partial<GravityStore> | ((state: GravityStore) => Partial<GravityStore>)) => void,
  get: () => GravityStore
): ActiveResponseSlice => ({
  activeResponse: initialActiveResponse,

  startActiveResponse: (chatId: string, conversationId: string, userId: string) => {
    set(state => ({
      activeResponse: {
        ...initialActiveResponse,
        chatId,
        conversationId,
        userId,
        messageSource: 'user', // Client-sent messages are from the 'user'
        state: ChatState.THINKING,
        startTime: Date.now(),
      },
    }));
  },

  processMessage: (message: GravityEvent) => {
    set(state => {
      const { activeResponse } = state;

      // Ignore messages for different conversations
      if (message.conversationId !== activeResponse.conversationId) {
        return state;
      }

      // Update state based on message state
      const newState = {
        ...activeResponse,
        state: message.state || activeResponse.state,
      };

      // If message is from a subscription, mark it as from 'agent'
      // Only change messageSource if the current one is null or it's a new response
      if (!activeResponse.messageSource || activeResponse.messageSource === 'user') {
        // providerId can be used to determine source if available
        const providerId = (message as any).providerId;
        newState.messageSource = providerId === 'user' ? 'user' : 'agent';
      }

      // Process based on message type
      const messageType =
        (message as any).type ||
        (message as any).__typename
          ?.replace(/([A-Z])/g, '_$1')
          .toLowerCase()
          .slice(1);

      switch (messageType) {
        case MessageType.MESSAGE_CHUNK:
        case 'MessageChunk':
          // Only update the chunks array - keep it separate from text
          newState.messageChunks = [...newState.messageChunks, message];
          break;

        case MessageType.PROGRESS_UPDATE:
        case 'ProgressUpdate':
          newState.progressUpdate = message;
          break;

        case MessageType.TEXT:
        case 'Text':
          newState.text = (message as any).text || '';
          break;

        case MessageType.JSON_DATA:
        case 'JsonData':
          // Add to the jsonData array instead of replacing
          // Just save the data object as-is, ensuring _dataType exists
          if ((message as any).data) {
            // If _dataType isn't already in the data, add it
            if (!(message as any).data._dataType) {
              (message as any).data._dataType = 'unknown';
            }
            newState.jsonData = [...(activeResponse.jsonData || []), (message as any).data];
          }
          break;

        case MessageType.ACTION_SUGGESTION:
        case 'ActionSuggestion':
          newState.actionSuggestion = message;
          break;

        case MessageType.METADATA:
        case 'Metadata':
          newState.metadata = message;
          break;

        case MessageType.IMAGE_RESPONSE:
        case 'ImageResponse':
          newState.imageResponse = message;
          break;

        case MessageType.TOOL_OUTPUT:
        case 'ToolOutput':
          newState.toolOutput = message;
          break;
      }

      // Check if response is complete
      if (message.state === ChatState.COMPLETE) {
        newState.state = ChatState.COMPLETE;
        newState.endTime = Date.now();
        newState.currentMessageChunk = null;
      }

      return {
        activeResponse: newState,
      };
    });

    // Also add to conversation history
    get().addMessage(message);
  },

  completeActiveResponse: () => {
    set(state => ({
      activeResponse: {
        ...state.activeResponse,
        state: ChatState.COMPLETE,
        endTime: Date.now(),
        currentMessageChunk: null,
      },
    }));
  },

  clearActiveResponse: () => {
    set({
      activeResponse: initialActiveResponse,
    });
  },
});
