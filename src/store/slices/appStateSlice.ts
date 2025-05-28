/**
 * App state slice for UI state management
 */

import { GravityStore } from '../../types';

export interface AppState {
  sidebarOpen: boolean;
  activeObjectId: string | null;
  isConnected: boolean;
  connectionError: string | null;
  voiceEnabled: boolean;
}

export interface AppStateSlice {
  appState: AppState;
  toggleSidebar: (forceState?: boolean) => void;
  setActiveObject: (id: string | null) => void;
  setConnectionStatus: (isConnected: boolean, error?: string) => void;
  setVoiceEnabled: (enabled: boolean) => void;
}

const initialAppState: AppState = {
  sidebarOpen: false,
  activeObjectId: null,
  isConnected: false,
  connectionError: null,
  voiceEnabled: false,
};

export const createAppStateSlice = (
  set: (partial: Partial<GravityStore> | ((state: GravityStore) => Partial<GravityStore>)) => void
): AppStateSlice => ({
  appState: initialAppState,

  toggleSidebar: (forceState?: boolean) => {
    set((state: GravityStore) => ({
      appState: {
        ...state.appState,
        sidebarOpen: forceState !== undefined ? forceState : !state.appState.sidebarOpen,
      },
    }));
  },

  setActiveObject: (id: string | null) => {
    set((state: GravityStore) => ({
      appState: {
        ...state.appState,
        activeObjectId: id,
      },
    }));
  },

  setConnectionStatus: (isConnected: boolean, error?: string) => {
    set((state: GravityStore) => ({
      appState: {
        ...state.appState,
        isConnected,
        connectionError: error ?? null,
      },
    }));
  },

  setVoiceEnabled: (enabled: boolean) => {
    set((state) => ({
      appState: {
        ...state.appState,
        voiceEnabled: enabled,
      },
    }));
  },
});
