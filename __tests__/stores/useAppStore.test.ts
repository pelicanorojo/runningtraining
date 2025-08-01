/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2025-07-31T12:12:34-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-31T11:09:28-03:00
 */


import { act } from '@testing-library/react';
import { KnownLocales, TrainingPlanThinFront } from "@/types/global";
import { trainingPlansAvailableFront } from "@/lib/constants";

import * as actions from '@/actions/index';

const locale :KnownLocales = 'en';
const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[locale][1];
const otheraTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[locale][2];
const aRaceDate = '2025-12-31';
const otherRaceDate = '2026-01-01';


 // Top-level async mock for all actions
jest.mock('@/actions/index', () => {
  return {
    setFavorites: jest.fn(async () => undefined),
    clearFavorites: jest.fn(async () => undefined),
    loadFavorites: jest.fn(async () => ({
      trainingPlanId: otheraTrainingPlan.id,
      raceDate: otherRaceDate,
    }))
  };
});


import { useAppStore, initialState } from '@/stores/useAppStore';

beforeEach(() => {
  useAppStore.setState(initialState);
});

 afterEach(() => {
   jest.clearAllMocks();
 });



describe('Test sync actions and props', () => {
  it('Should have the correct initial state', () => {
    const state = useAppStore.getState();
    expect(state).toMatchObject(initialState);
  }); 
  
  it('Should reset to initial state', () => {
    const statePartialModification = { initialized: true, trainingPlanId: aTrainingPlan.id };
    useAppStore.setState(statePartialModification);
    
    expect(useAppStore.getState()).toMatchObject({...initialState, ...statePartialModification});

    act(() => {
      useAppStore.getState().reset();
    });
    expect(useAppStore.getState()).toMatchObject(initialState);
  });

  it('Should initialize with given data', () => {
    act(() => {
      useAppStore.getState().init({ trainingPlanId: aTrainingPlan.id, raceDate: aRaceDate });
    });

    expect(useAppStore.getState().initialized).toBe(true);
    expect(useAppStore.getState().trainingPlanId).toBe(aTrainingPlan.id);
    expect(useAppStore.getState().raceDate).toBe(aRaceDate);
  });

  it('Should initialize favorite data', () => {
    useAppStore.setState({ favoriteTrainingPlanId: aTrainingPlan.id, favoriteRaceDate: aRaceDate });
    act(() => {
      useAppStore.getState().initializeFavorites();
    });

    expect(useAppStore.getState().initializedFavorites).toBe(true);
    expect(useAppStore.getState().favoriteTrainingPlanId).toBeUndefined();
    expect(useAppStore.getState().favoriteRaceDate).toBeUndefined();
  });

  it('Should set trainingPlanId', () => {
    act(() => {
      useAppStore.getState().setTrainingPlanIdAction(aTrainingPlan.id);
    });
    expect(useAppStore.getState().trainingPlanId).toBe(aTrainingPlan.id);
  });

  it('should set raceDate', () => {
    act(() => {
      useAppStore.getState().setRaceDateAction(aRaceDate);
    });
    expect(useAppStore.getState().raceDate).toBe(aRaceDate);
  });

  describe('Test async actions', () => {
    it('Should load favorites and update state', async () => {
      // Example: override mock for this test only
      (actions.loadFavorites as jest.Mock).mockResolvedValueOnce({ trainingPlanId: otheraTrainingPlan.id, raceDate: otherRaceDate});

      await act(async () => {
        await useAppStore.getState().loadFavoritesAction('user1');
      });

      expect(useAppStore.getState().favoriteTrainingPlanId).toBe(otheraTrainingPlan.id);
      expect(useAppStore.getState().favoriteRaceDate).toBe(otherRaceDate);
    });

    it('Should set favorite and update state', async () => {
      await act(async () => {
        await useAppStore.getState().setFavoriteAction('user2', otheraTrainingPlan.id, otherRaceDate);
      });

      expect(actions.setFavorites).toHaveBeenCalledWith({ userId: 'user2', trainingPlanId: otheraTrainingPlan.id, raceDate: otherRaceDate });
      expect(useAppStore.getState().favoriteTrainingPlanId).toBe(otheraTrainingPlan.id);
      expect(useAppStore.getState().favoriteRaceDate).toBe(otherRaceDate);
    });

    it('Should clear favorite and update state', async () => {
      useAppStore.setState({ favoriteTrainingPlanId: otheraTrainingPlan.id, favoriteRaceDate: otherRaceDate });
      await act(async () => {
        await useAppStore.getState().clearFavoriteAction('user3');
      });
      expect(actions.clearFavorites).toHaveBeenCalledWith({ userId: 'user3' });
      expect(useAppStore.getState().favoriteTrainingPlanId).toBeUndefined();
      expect(useAppStore.getState().favoriteRaceDate).toBeUndefined();
    });
  });
});
