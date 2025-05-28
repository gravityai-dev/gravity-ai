/**
 * VoiceStream Component
 * 
 * Handles playback of AudioChunk messages received from the server
 * No longer needs direct ElevenLabs API integration as audio is generated server-side
 */

import { useEffect, useRef, useState } from 'react';
import { useGravity } from '../hooks/useGravity';
import { AudioChunk } from '../shared/types';
import { audioEventEmitter } from '../utils/audioEventEmitter';

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
  const audioQueueRef = useRef<AudioChunk[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const processedChunksRef = useRef<Set<string>>(new Set());
  const isProcessingRef = useRef(false);

  // Create a unique ID for an audio chunk
  const getChunkId = (chunk: AudioChunk): string => {
    return `${chunk.chatId}-${chunk.timestamp}-${chunk.sourceType}`;
  };

  // Play audio from base64 data
  const playAudioChunk = async (chunk: AudioChunk) => {
    try {
      if (!chunk.audioData) {
        console.warn('[VoiceStream] Audio chunk missing data');
        return;
      }

      // Create audio element if it doesn't exist
      if (!audioElementRef.current) {
        audioElementRef.current = new Audio();
        audioElementRef.current.addEventListener('ended', handleAudioEnded);
        audioElementRef.current.addEventListener('error', handleAudioError);
      }

      // Convert base64 to blob
      const audioBlob = base64ToBlob(chunk.audioData, `audio/${chunk.format}`);
      const audioUrl = URL.createObjectURL(audioBlob);

      // Set the source and play
      audioElementRef.current.src = audioUrl;
      setIsPlaying(true);
      onStart?.();
      
      await audioElementRef.current.play();

      // Clean up the object URL after playing
      audioElementRef.current.addEventListener('ended', () => {
        URL.revokeObjectURL(audioUrl);
      }, { once: true });

    } catch (error) {
      console.error('[VoiceStream] Error playing audio:', error);
      onError?.(error instanceof Error ? error : new Error('Failed to play audio'));
      setIsPlaying(false);
      processNextInQueue();
    }
  };

  // Convert base64 to blob
  const base64ToBlob = (base64: string, mimeType: string): Blob => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  // Handle when audio finishes playing
  const handleAudioEnded = () => {
    setIsPlaying(false);
    processNextInQueue();
  };

  // Handle audio errors
  const handleAudioError = (event: Event) => {
    const error = new Error('Audio playback error');
    console.error('[VoiceStream] Audio error:', event);
    onError?.(error);
    setIsPlaying(false);
    processNextInQueue();
  };

  // Process the next audio chunk in the queue
  const processNextInQueue = async () => {
    if (isProcessingRef.current || audioQueueRef.current.length === 0) {
      isProcessingRef.current = false;
      
      // Check if we're done with all audio
      if (audioQueueRef.current.length === 0 && activeResponse?.state === 'COMPLETE') {
        onComplete?.();
      }
      return;
    }

    isProcessingRef.current = true;
    const nextChunk = audioQueueRef.current.shift();
    
    if (nextChunk) {
      await playAudioChunk(nextChunk);
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
        textReference: chunk.textReference,
        sourceType: chunk.sourceType,
        dataLength: chunk.audioData?.length
      });
      
      const chunkId = getChunkId(chunk);
      
      if (!processedChunksRef.current.has(chunkId)) {
        processedChunksRef.current.add(chunkId);
        audioQueueRef.current.push(chunk);
        
        // Start processing if not already playing
        if (!isPlaying && !isProcessingRef.current) {
          processNextInQueue();
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
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.removeEventListener('ended', handleAudioEnded);
        audioElementRef.current.removeEventListener('error', handleAudioError);
        audioElementRef.current = null;
      }
    };
  }, []);

  // Non-visual component
  return null;
};
