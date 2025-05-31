/**
 * VoiceStream Component
 * 
 * Handles playback of AudioChunk messages received from the server
 * Uses Howler.js for seamless audio streaming of chunks
 */

import { useEffect, useRef, useState } from 'react';
import { useGravity } from '../hooks/useGravity';
import { AudioChunk } from '../shared/types';
import { audioEventEmitter } from '../utils/audioEventEmitter';
import { Howl } from 'howler';

export interface VoiceStreamProps {
  autoplay?: boolean;
  onStart?: () => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export const VoiceStream: React.FC<VoiceStreamProps> = ({
  autoplay = true,
  onStart,
  onComplete,
  onError,
}) => {
  const { activeResponse } = useGravity();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstChunk, setIsFirstChunk] = useState(true);
  const howlRef = useRef<Howl | null>(null);
  const pendingChunksRef = useRef<AudioChunk[]>([]);
  const processedChunksRef = useRef<Set<string>>(new Set());
  const conversationIdRef = useRef<string | null>(null);

  // Create a unique ID for an audio chunk
  const getChunkId = (chunk: AudioChunk): string => {
    return `${chunk.conversationId}-${chunk.timestamp}`;
  };

  // Convert base64 to a URL
  const base64ToURL = (base64: string, format: string): string => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: `audio/${format}` });
    return URL.createObjectURL(blob);
  };

  // Handle audio playing
  const playAudioChunk = (chunk: AudioChunk) => {
    try {
      if (!chunk.audioData) {
        console.warn('[VoiceStream] Audio chunk missing data');
        return;
      }

      // Check if this is a new conversation
      if (conversationIdRef.current !== chunk.conversationId) {
        // Stop any existing audio
        if (howlRef.current) {
          howlRef.current.stop();
          howlRef.current.unload();
          howlRef.current = null;
        }
        conversationIdRef.current = chunk.conversationId;
        setIsFirstChunk(true);
        processedChunksRef.current.clear();
      }
      
      // Convert to blob URL
      const audioUrl = base64ToURL(chunk.audioData, chunk.format);
      
      // Create and play howl
      const howl = new Howl({
        src: [audioUrl],
        format: [chunk.format],
        autoplay: true,
        html5: true, // Force HTML5 Audio for streaming
        onload: () => {
          console.log('[VoiceStream] Howl loaded:', { chunk: chunk.textReference });
        },
        onplay: () => {
          console.log('[VoiceStream] Howl playing');
          setIsPlaying(true);
          
          if (isFirstChunk) {
            onStart?.();
            setIsFirstChunk(false);
          }
        },
        onend: () => {
          console.log('[VoiceStream] Howl ended');
          URL.revokeObjectURL(audioUrl); // Clean up URL
          playNextChunk();
        },
        onloaderror: (id, error) => {
          console.error('[VoiceStream] Howl load error:', error);
          onError?.(new Error(`Failed to load audio: ${error}`));
          URL.revokeObjectURL(audioUrl); // Clean up URL
          playNextChunk();
        },
        onplayerror: (id, error) => {
          console.error('[VoiceStream] Howl play error:', error);
          onError?.(new Error(`Failed to play audio: ${error}`));
          URL.revokeObjectURL(audioUrl); // Clean up URL
          playNextChunk();
        }
      });
      
      howlRef.current = howl;
    } catch (error) {
      console.error('[VoiceStream] Error creating Howl:', error);
      onError?.(error instanceof Error ? error : new Error('Failed to create audio'));
      playNextChunk();
    }
  };

  // Play the next chunk in the queue
  const playNextChunk = () => {
    if (pendingChunksRef.current.length > 0) {
      const nextChunk = pendingChunksRef.current.shift();
      if (nextChunk) {
        playAudioChunk(nextChunk);
      }
    } else {
      setIsPlaying(false);
      // Check if we're done with all audio
      if (activeResponse?.state === 'COMPLETE') {
        onComplete?.();
      }
    }
  };

  // Handle new audio chunks
  useEffect(() => {
    if (!autoplay) return;

    // Subscribe to audio chunk events
    const unsubscribe = audioEventEmitter.subscribe((chunk: AudioChunk) => {
      console.log('[VoiceStream] Received audio chunk:', {
        hasData: !!chunk.audioData,
        format: chunk.format,
        textRef: chunk.textReference?.substring(0, 20),
        dataLength: chunk.audioData?.length
      });
      
      const chunkId = getChunkId(chunk);
      
      if (!processedChunksRef.current.has(chunkId)) {
        processedChunksRef.current.add(chunkId);
        
        // Add to pending queue
        pendingChunksRef.current.push(chunk);
        
        // Start playing if not already playing
        if (!isPlaying) {
          playNextChunk();
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [autoplay, isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (howlRef.current) {
        howlRef.current.stop();
        howlRef.current.unload();
        howlRef.current = null;
      }
    };
  }, []);

  // Non-visual component
  return null;
};
