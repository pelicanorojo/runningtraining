/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-23T01:50:49-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-01T12:27:40-03:00
 */


import {ConfigReducerAction, PlanConfig} from "@/types/global";

export const initialState: PlanConfig = {
  trainingPlanId: undefined,
  raceDate: undefined,
  favoriteTrainingPlanId: undefined,
  favoriteRaceDate: undefined
};


export function configReducer(state: PlanConfig, {type, payload}: ConfigReducerAction) {

  console.log('DBG: configReducer: state, type, payload = (', state, type, payload, ')');

  switch (type) {
    case 'CHANGE_PLAN': {
      return {
        ...state,
        trainingPlanId: payload.trainingPlanId,
      };
    }
    case 'CHANGE_RACEDATE': {
      return {
        ...state,
        raceDate: payload.raceDate,
      };
    }
    /*
    // LOADED_FAVORITE, when the user is loggedin, 
    case 'LOADED_FAVORITE': {
      return {
        ...state,
        favoriteTrainingPlanId: payload.trainingPlanId,
        favoriteRaceDate: payload.raceDate,
      };
    } */
    case 'SET_FAVORITE': // select current config as favorite
      return {
        ...state,
        favoriteTrainingPlanId: payload.trainingPlanId,
        favoriteRaceDate: payload.raceDate,
      };      
    case 'UNSET_FAVORITE':
      return {
        ...state,
        favoriteTrainingPlanId: undefined,
        favoriteRaceDate: undefined,
      };
    // SELECT_FAVORITE: ...state, trainingPlanId: favoriteTrainingPlanId, raceDate: favoriteRaceDate, check conditions... not nulls.....
    default: {
      throw Error('Unknown action: ' + type);
    }
  }
}
