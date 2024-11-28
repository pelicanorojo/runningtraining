/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-28T12:51:29-03:00
 */

export type TrainingPlanId = string;
export type RaceDate = string;
export type utcDate = string;

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
  raceDate: RaceDate | undefined;
}

// json types:
export type IntervalType = 'warmUp' | 'middle' | 'coolDown';
export type Zone = 'blue' | 'green' | 'yellow' | 'red';

export interface interval {
  intervalType: IntervalType;
  totalTimeInZone: number;
  miCoachZone: Zone;
};

export interface TrainingNotes {
  noteSummary: string;
  note: string;
  secondaryNote: string;
}

export interface RawTrainingData {
  workoutId: number;
  workoutName: string;
  scheduledDate: utcDate; //This an unshifted value, which needs to be adjusted so the last training is one day before the race in general.
  order: number;
  recommendedTime: number;
  intervals: interval[];
  trainingNotes: TrainingNotes;
  //[key: string]: any; // Allows any additional properties
}

export type RawPlanData = {
  totalResults: number;
  results: RawTrainingData[];
};

export interface TrainingData {
  trainingDate: utcDate;
  workoutName: string;
  order: number;
  recommendedTime: number;
  intervals: interval[];
  trainingNotes: TrainingNotes;
}

export type PlanData = TrainingData[];

export type KnownConfigReducerAction = 'CHANGE_PLAN' | 'CHANGE_RACEDATE';

export type ChangePlanAction = {
  type: 'CHANGE_PLAN';
  payload: {
    trainingPlanId: TrainingPlanId | undefined;
  }
}

export type ChangeRacedateAction = {
  type: 'CHANGE_RACEDATE';
  payload: {
    raceDate: RaceDate | undefined;
  }
}

export type ConfigReducerAction = ChangePlanAction | ChangeRacedateAction;
