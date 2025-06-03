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
    }),
    {
      name: 'gravity-store'
    }
  )
);
