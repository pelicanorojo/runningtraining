/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-23T01:50:49-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-25T01:34:37-03:00
 */


import {ConfigReducerAction, PlanConfig} from "@/types/global";


export const initialState: PlanConfig = {
  trainingPlanId: undefined,
  raceDate: undefined,
};

export function configReducer(state: PlanConfig, {type, payload}: ConfigReducerAction) {

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
    default: {
      throw Error('Unknown action: ' + type);
    }
  }
}
