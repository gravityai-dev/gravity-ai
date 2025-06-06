/**
 * Connection slice for managing GraphQL/SSE connection
 */

import { ApolloClient, InMemoryCache, split, HttpLink, ApolloLink } from '@apollo/client';
import { YogaLink } from '@graphql-yoga/apollo-link';
import { getMainDefinition } from '@apollo/client/utilities';
import { ConnectionState, GravityConfig, GravityStore } from '../../types';
import { createAgentEventTypeResolver } from '../../utils/GravityAdapter';
import { GRAPHQL_MESSAGE_TYPES } from '../../shared/types';

export interface ConnectionSlice {
  connection: ConnectionState;
  markdownOptions?: any; // Custom markdown-to-jsx options from config
  connect: (config: GravityConfig) => Promise<void>;
  disconnect: () => void;
  setupSubscription: (conversationId: string) => void;
  cleanupSubscription: () => void;
}

const initialConnectionState: ConnectionState = {
  isConnected: false,
  isConnecting: false,
  error: null,
  client: null,
  subscription: null,
};

export const createConnectionSlice = (
  set: (partial: Partial<GravityStore> | ((state: GravityStore) => Partial<GravityStore>)) => void,
  get: () => GravityStore
): ConnectionSlice => ({
  connection: initialConnectionState,
  markdownOptions: undefined, // Will be set from config

  connect: async (config: GravityConfig) => {
    set((state: GravityStore) => ({
      connection: {
        ...state.connection,
        isConnecting: true,
        error: null,
      },
      markdownOptions: config.markdownOptions, // Store the markdown options from config
    }));

    try {
      // Create HTTP link for queries/mutations
      const httpLink = new HttpLink({
        uri: config.endpoint,
        headers: {
          //...config.headers,
          ...(config.apiKey ? { 'x-agent-key': config.apiKey } : {}),
        },
      });

      // Create SSE link for subscriptions using YogaLink
      // IMPORTANT: We use SSE (YogaLink) and NOT WebSockets for subscription support
      const sseLink = new YogaLink({
        endpoint: config.endpoint, // Use the same HTTP endpoint - not a WebSocket URL
        headers: {
          // Only include the essential auth header - remove all other headers to reduce size
          ...(config.apiKey ? { 'x-agent-key': config.apiKey } : {}),
        },
        credentials: 'include',
      });

      // Create transformation link for enum normalization
      const transformationLink = new ApolloLink((operation, forward) => {
        return forward(operation).map(response => {
          // Skip if there are errors or no data
          if (response.errors || !response.data) return response;

          // Normalize enum values in agentResponse
          if (response.data.agentResponse) {
            response.data.agentResponse = normalizeEnumValues(response.data.agentResponse);
          }

          // Normalize enum values in aiResult (for subscriptions)
          if (response.data.aiResult) {
            response.data.aiResult = normalizeEnumValues(response.data.aiResult);
          }

          return response;
        });
      });

      // Split link based on operation type
      const splitLink = split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
          );
        },
        sseLink,
        httpLink
      );

      // Combine transformation link with split link
      const combinedLink = transformationLink.concat(splitLink);

      // Define the message types for the type policies
      const messageTypes = [...GRAPHQL_MESSAGE_TYPES];

      // Create Apollo client with exact same configuration as legacy
      const client = new ApolloClient({
        link: combinedLink,
        resolvers: createAgentEventTypeResolver(),
        cache: new InMemoryCache({
          typePolicies: {
            Subscription: {
              fields: {
                aiResult: { merge: (_, incoming) => incoming, keyArgs: false },
              },
            },
            // Add type policies for ALL message types
            ...messageTypes.reduce<Record<string, any>>((acc, type) => {
              acc[type] = { keyFields: ['chatId', 'conversationId', 'userId', 'timestamp'] };
              return acc;
            }, {}),
          },
          // Define possibleTypes for AgentEvent
          possibleTypes: {
            AgentEvent: messageTypes,
          },
        }),
      });

      console.log('[Gravity AI] Created client:', client);
      console.log('[Gravity AI] Client type:', client.constructor.name);
      console.log('[Gravity AI] Client has mutate?', typeof client.mutate);

      set((state: GravityStore) => ({
        connection: {
          ...state.connection,
          isConnected: true,
          isConnecting: false,
          client,
        },
      }));
    } catch (error) {
      set((state: GravityStore) => ({
        connection: {
          ...state.connection,
          isConnecting: false,
          error: error instanceof Error ? error.message : 'Connection failed',
        },
      }));
    }
  },

  disconnect: () => {
    set((state: GravityStore) => {
      // Clean up Apollo client
      if (state.connection.client) {
        state.connection.client.stop();
      }

      return {
        connection: initialConnectionState,
      };
    });
  },

  setupSubscription: (conversationId: string) => {
    const state = get();
    const { client, subscription } = state.connection;

    // Clean up existing subscription if any
    if (subscription) {
      subscription.unsubscribe();
    }

    if (!client) {
      console.error('[Gravity AI] Cannot setup subscription: No client available');
      return;
    }

    console.log(`[Gravity AI] Setting up subscription for conversation: ${conversationId}`);

    try {
      // Import the subscription query
      const { AI_RESULT_SUBSCRIPTION } = require('../../graphql/subscriptions');

      // Create subscription
      const newSubscription = client
        .subscribe({
          query: AI_RESULT_SUBSCRIPTION,
          variables: { conversationId },
        })
        .subscribe({
          next: ({ data }: { data?: any }) => {
            if (data?.aiResult) {
              console.log(`[Gravity AI] Received message:`, data.aiResult);

              // Get processMessage from the store
              const processMessage = get().processMessage;
              if (processMessage) {
                processMessage(data.aiResult);
              }
            }
          },
          error: (error: Error) => {
            console.error('[Gravity AI] Subscription error:', error);
          },
          complete: () => {
            console.log('[Gravity AI] Subscription completed');
            set((state: GravityStore) => ({
              connection: {
                ...state.connection,
                subscription: null,
              },
            }));
          },
        });

      // Update state with new subscription
      set((state: GravityStore) => ({
        connection: {
          ...state.connection,
          subscription: newSubscription,
        },
      }));
    } catch (error) {
      console.error('[Gravity AI] Error setting up subscription:', error);
    }
  },

  cleanupSubscription: () => {
    const state = get();
    const { subscription } = state.connection;

    if (subscription) {
      //console.log('[Gravity AI] Cleaning up subscription');
      subscription.unsubscribe();

      set((state: GravityStore) => ({
        connection: {
          ...state.connection,
          subscription: null,
        },
      }));
    }
  },
});

// Helper function to normalize enum values
function normalizeEnumValues(data: any): any {
  if (!data) return data;

  // Deep clone to avoid modifying original data
  const result = { ...data };

  // Normalize state field to uppercase
  if (
    result.state &&
    typeof result.state === 'string' &&
    result.state === result.state.toLowerCase()
  ) {
    result.state = result.state.toUpperCase();
  }

  return result;
}
