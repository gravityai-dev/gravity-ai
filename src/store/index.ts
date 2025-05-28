/**
 * Main Zustand store for Gravity AI client
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createConnectionSlice } from './slices/connectionSlice';
import { createActiveResponseSlice } from './slices/activeResponseSlice';
import { createConversationSlice } from './slices/conversationSlice';
import { createAppStateSlice } from './slices/appStateSlice';
import { GravityStore } from '../types';

export const useGravityStore = create<GravityStore>()(
  devtools(
    (set, get) => ({
      // Connection slice
      ...createConnectionSlice(set, get),
      
      // Active response slice
      ...createActiveResponseSlice(set, get),
      
      // Conversation slice
      ...createConversationSlice(set, get),
      
      // App state slice
      ...createAppStateSlice(set),
      
      // Override sendMessage to automatically use voiceEnabled state
      sendMessage: async (text: string, userId?: string, enableAudio?: boolean) => {
        const conversationSlice = createConversationSlice(set, get);
        const state = get();
        
        // Use provided enableAudio, or default to current voiceEnabled state
        const shouldEnableAudio = enableAudio !== undefined ? enableAudio : state.appState.voiceEnabled;
        
        console.log('[Gravity AI] Sending message with audio:', {
          voiceEnabled: state.appState.voiceEnabled,
          enableAudioParam: enableAudio,
          shouldEnableAudio
        });
        
        return conversationSlice.sendMessage(text, userId, shouldEnableAudio);
      },
    }),
    {
      name: 'gravity-store'
    }
  )
);
