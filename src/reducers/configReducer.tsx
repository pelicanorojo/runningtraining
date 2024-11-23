import {ConfigReducerAction, PlanConfig} from "@/types/global";


export const initialState: PlanConfig = {
  trainingPlanId: undefined,
  raceDate: undefined,
};

export function configReducer(state: PlanConfig, {type, payload}: ConfigReducerAction) {
  console.log('configReducer: (type, payload) =', type, payload);

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