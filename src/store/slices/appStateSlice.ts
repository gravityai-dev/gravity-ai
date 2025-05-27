/**
 * App state slice for UI state management
 */

import { GravityStore } from '../../types';

export interface AppState {
  sidebarOpen: boolean;
  activeObjectId: string | null;
}

export interface AppStateSlice {
  appState: AppState;
  toggleSidebar: (forceState?: boolean) => void;
  setActiveObject: (id: string | null) => void;
}

const initialAppState: AppState = {
  sidebarOpen: false,
  activeObjectId: null,
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
});
