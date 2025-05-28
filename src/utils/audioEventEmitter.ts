/**
 * Event emitter for audio chunks
 * Allows components to listen for audio chunks without storing them in state
 */

import { AudioChunk } from '../shared/types';

type AudioChunkListener = (chunk: AudioChunk) => void;

class AudioEventEmitter {
  private listeners: Set<AudioChunkListener> = new Set();

  emit(chunk: AudioChunk) {
    this.listeners.forEach(listener => listener(chunk));
  }

  subscribe(listener: AudioChunkListener): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  clear() {
    this.listeners.clear();
  }
}

// Singleton instance
export const audioEventEmitter = new AudioEventEmitter();
