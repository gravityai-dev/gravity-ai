/**
 * Hook for accessing connection state
 */

import { useGravityStore } from '../store';

export function useConnection() {
  const connection = useGravityStore((state) => state.connection);
  const connect = useGravityStore((state) => state.connect);
  const disconnect = useGravityStore((state) => state.disconnect);
  
  return {
    ...connection,
    connect,
    disconnect
  };
}
