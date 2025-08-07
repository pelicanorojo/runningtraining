
/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2025-07-17T08:47:44-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-08-05T01:47:53-03:00
 */

import { create } from 'zustand';
import type { TrainingPlanId, uTrainingPlanId, RaceDate, uRaceDate } from '../types/global';
import { setFavorites, clearFavorites, loadFavorites } from '../actions/index';

type AppState = {
  trainingPlanId: uTrainingPlanId;
  raceDate: uRaceDate;
  favoriteTrainingPlanId: uTrainingPlanId;
  favoriteRaceDate: uRaceDate;
  reset: () => void;
  init: (data: { trainingPlanId: uTrainingPlanId, raceDate: uRaceDate }) => void;
  useFavorites: () => void;
  // Async actions
  setFavoriteAction: (userId: string, planId: TrainingPlanId, raceDate: RaceDate) => Promise<void>;
  clearFavoriteAction: (userId: string) => Promise<void>;
  loadFavoritesAction: (userId: string) => Promise<void>;
};

// this and reset, are testing helpers, keep the things clean, and functional
export const initialState = {
  trainingPlanId: undefined,
  raceDate: undefined,
  favoriteTrainingPlanId: undefined,
  favoriteRaceDate: undefined
}

export const useAppStore = create<AppState>((set: (partial: Partial<AppState>) => void) => ({
  ...initialState,
  reset: () => set(useAppStore.getInitialState()),
  init: ({trainingPlanId, raceDate}: {trainingPlanId: uTrainingPlanId, raceDate: uRaceDate}) => {
    set({
      trainingPlanId,
      raceDate
    });
  },
  useFavorites: () => {
    const state = useAppStore.getState();
    set({
      trainingPlanId: state.favoriteTrainingPlanId,
      raceDate: state.favoriteRaceDate
    });
  },
  // Async actions
  setFavoriteAction: async (userId: string, planId: TrainingPlanId, raceDate: RaceDate): Promise<void> => {
    // Clean favorites plan and date
    await setFavorites({ userId, trainingPlanId: planId, raceDate });
    set({
      favoriteTrainingPlanId: planId,
      favoriteRaceDate: raceDate,
    });
  },
  clearFavoriteAction: async (userId: string ): Promise<void> => {
    await clearFavorites({ userId });
    set({
      favoriteTrainingPlanId: undefined,
      favoriteRaceDate: undefined,
    });
  },
  loadFavoritesAction: async (userId: string): Promise<void> => {
    const data = await loadFavorites(userId);
    if (!data.trainingPlanId || !data.raceDate) return;

    set({
      favoriteTrainingPlanId: data.trainingPlanId,
      favoriteRaceDate: data.raceDate,
    });
  }  
}));
