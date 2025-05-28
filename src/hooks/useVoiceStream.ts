/**
 * useVoiceStream hook
 * 
 * A custom hook that provides voice streaming control for server-generated audio
 * Works with AudioChunk messages from the server
 */

import { useState, useCallback } from 'react';
import { useGravityStore } from '../store';

export interface VoiceStreamOptions {
  autoplay?: boolean;
}

export interface VoiceStreamState {
  isEnabled: boolean;
  isSpeaking: boolean;
  isError: boolean;
  error: Error | null;
  toggleEnabled: () => void;
}

export const useVoiceStream = ({
  autoplay = true,
}: VoiceStreamOptions = {}): VoiceStreamState => {
  // Use the centralized store for voice settings
  const appState = useGravityStore(state => state.appState);
  const setVoiceEnabled = useGravityStore(state => state.setVoiceEnabled);
  
  // Local state for speech status
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Toggle enabled state using centralized store
  const toggleEnabled = useCallback(() => {
    setVoiceEnabled(!appState.voiceEnabled);
  }, [setVoiceEnabled, appState.voiceEnabled]);

  // Return the hook state and methods
  return {
    isEnabled: appState.voiceEnabled,
    isSpeaking,
    isError,
    error,
    toggleEnabled,
  };
};
