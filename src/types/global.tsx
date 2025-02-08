/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-07T12:36:28-03:00
 */

// -- plan types
//

export type TrainingPlanId = 'test' |
  '21k110m4wbw5m' |
  '21k110m6wbw5m' |
  '21k120m6wbw5m' |
  '42k230m4wbw5m' |
  '42k230m6wbw5m' |
  '42k240m4wbw5m' |
  '42k240m6wbw5m' |
  '42k250m4wbw5m' |
  '42k250m6wbw5m';

//export type TrainingPlanId = string;
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

// path types

// training types
export type IntervalType = 'warmUp' | 'middle' | 'coolDown';
export type Zone = 'blue' | 'green' | 'yellow' | 'red';

export interface RawInterval {
  intervalType: IntervalType;
  totalTimeInZone: number;
  miCoachZone: Zone;
};

export interface Interval {
  intervalType: IntervalType;
  totalTimeInZone: number;
  zone: Zone;
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
  intervals: RawInterval[];
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
  intervals: Interval[];
  trainingNotes: TrainingNotes;
}

export type PlanData = TrainingData[];

export interface PlanDataParams {
  trainingPlanId: TrainingPlanId;
  raceDate: RaceDate;
};

export interface TrainingDataParams {
  trainingPlanId: TrainingPlanId;
  raceDate: RaceDate;
  order: number;
};

export type KnownLocales = 'en' | 'es';

export type TrainingPlansAvailableBack = {
  [key in KnownLocales]: TrainingPlanThinBackList;
}

export type TrainingPlansAvailableFront = {
  [key in KnownLocales]: TrainingPlanThinFrontList;
}
