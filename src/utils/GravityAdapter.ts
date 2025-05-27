/**
 * Utility functions for GraphQL/Apollo Client adapters
 */

// Function to create a custom cache resolver for AgentEvent
export function createAgentEventTypeResolver() {
  return {
    AgentEvent: {
      __resolveType(obj: any) {
        console.log('[DEBUG] Resolving AgentEvent type:', obj);
        return obj.__typename || obj.type;
      }
    }
  };
}

// Normalize enum values to uppercase for GraphQL compatibility
export function normalizeEnumValues(data: any) {
  if (!data) return data;
  
  // Deep clone to avoid modifying original data
  const result = { ...data };
  
  // Check if state field exists and is not uppercase
  if (result.state && typeof result.state === 'string') {
    result.state = result.state.toUpperCase();
  }
  
  // Recursively handle nested objects
  Object.keys(result).forEach(key => {
    if (result[key] && typeof result[key] === 'object') {
      result[key] = normalizeEnumValues(result[key]);
    }
  });
  
  return result;
}
