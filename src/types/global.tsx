/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-23T12:15:15-03:00
 */

export type TrainingPlanId = string;

export type TrainingPlanThinBack = {
  id: TrainingPlanId;
  label: string;
  fileName: string;
};

export type TrainingPlanThinFront = {
  id: TrainingPlanId;
  label: string;
};

export type TrainingPlanThinBackList = TrainingPlanThinBack[];
export type TrainingPlanThinFrontList = TrainingPlanThinFront[];

export type PlanConfig = {
  trainingPlanId: TrainingPlanId | undefined;
  raceDate: string | undefined;
}

type KnownConfigReducerAction = 'CHANGE_PLAN' | 'CHANGE_RACEDATE';

type ChangePlanAction = {
  type: 'CHANGE_PLAN';
  payload: {
    trainingPlanId: TrainingPlanId | undefined;
  }
}

type ChangeRacedateAction = {
  type: 'CHANGE_RACEDATE';
  payload: {
    raceDate: string | undefined;
  }
}

export type ConfigReducerAction = ChangePlanAction | ChangeRacedateAction;