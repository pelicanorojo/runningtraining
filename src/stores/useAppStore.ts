
/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2025-07-17T08:47:44-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-31T11:07:58-03:00
 */

import { create } from 'zustand';
import type { TrainingPlanId, uTrainingPlanId, RaceDate, uRaceDate } from '../types/global';
import { setFavorites, clearFavorites, loadFavorites } from '../actions/index';

type AppState = {
  initialized: boolean;
  initializedFavorites: boolean;
  trainingPlanId: uTrainingPlanId;
  raceDate: uRaceDate;
  favoriteTrainingPlanId: uTrainingPlanId;
  favoriteRaceDate: uRaceDate;
  reset: () => void;
  init: (data: { trainingPlanId: uTrainingPlanId, raceDate: uRaceDate }) => void;
  initializeFavorites: () => void;
  setTrainingPlanIdAction: (id: uTrainingPlanId) => void;
  setRaceDateAction: (date: uRaceDate) => void;
  loadFavoritesAction: (userId: string) => Promise<void>;
  setFavoriteAction: (userId: string, planId: TrainingPlanId, raceDate: RaceDate) => Promise<void>;
  clearFavoriteAction: (userId: string) => Promise<void>;
};

// this and reset, are testing helpers, keep the things clean, and functional
export const initialState = {
  initialized: false,
  initializedFavorites: false,
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
      initialized: true,
      trainingPlanId,
      raceDate
    });
  },
  initializeFavorites: () => {
    set({
      initializedFavorites: true,
      favoriteTrainingPlanId: undefined,
      favoriteRaceDate: undefined,
    });
  },
  setTrainingPlanIdAction: (id: TrainingPlanId | undefined) => set({ trainingPlanId: id }),
  setRaceDateAction: (date: uRaceDate) => set({ raceDate: date }),
  // Async actions
  loadFavoritesAction: async (userId: string): Promise<void> => {
    const data = await loadFavorites(userId);
    set({
      favoriteTrainingPlanId: data.trainingPlanId,
      favoriteRaceDate: data.raceDate,
    });
  },
  setFavoriteAction: async (userId: string, planId: TrainingPlanId, raceDate: RaceDate): Promise<void> => {
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
}));
