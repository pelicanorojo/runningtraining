/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-31T11:59:40-03:00
 */

// -- plan types
//
export type uString = string | undefined;
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

export type uTrainingPlanId = TrainingPlanId | undefined;


const VALID_TRAINING_PLAN_IDS = new Set<TrainingPlanId>([
  'test',
  '21k110m4wbw5m',
  '21k110m6wbw5m',
  '21k120m6wbw5m',
  '42k230m4wbw5m',
  '42k230m6wbw5m',
  '42k240m4wbw5m',
  '42k240m6wbw5m',
  '42k250m4wbw5m',
  '42k250m6wbw5m'
]);

export const isValidTrainingPlanId = (value: uString): value is TrainingPlanId => {
   if (!(typeof value === 'string')) return false;

  return VALID_TRAINING_PLAN_IDS.has(value as TrainingPlanId);
};

export const dbTrainingPlanIdPrefix = 'tp_';
const dbTrainingPlanIdPrefixRegExp = new RegExp(`^${dbTrainingPlanIdPrefix}`);

// Parser utility
export const parseTrainingPlanId = (id: string): uTrainingPlanId => {
  // discard '', undefined, null, etc.
    if (!id) return undefined;
  
  const processed = id.replace(dbTrainingPlanIdPrefixRegExp, '');
  
  if (isValidTrainingPlanId(processed)) {
    return processed;
  }
  
  //console.warn(`Invalid training plan ID: "${processed}" (original: "${id}")`);
  return undefined;
};

export type RaceDate = string;
export type uRaceDate = RaceDate | undefined;


export const isValidRaceDate = (value: uRaceDate): value is RaceDate => {

  // is string?
  if (! (typeof value === 'string')) return false;

  // is well formatted?
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value )) return false;

  // is a valid date?
  const date = new Date(value);
  return !isNaN(date.getTime());
}


export type TrainingPlan = `tp_${TrainingPlanId}`; // e.g., 'tp_21k110m4wbw5m'
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
  trainingPlanId: uTrainingPlanId;
  raceDate: uRaceDate;
  favoriteTrainingPlanId: uTrainingPlanId;
  favoriteRaceDate: uRaceDate;
}

// clean context reducer things
/*
export type KnownConfigReducerAction = 'CHANGE_PLAN' | 'CHANGE_RACEDATE' | 'SET_FAVORITE' | 'UNSET_FAVORITE' | 'CLEAR_FAVORITE';

export type ChangePlanAction = {
  type: 'CHANGE_PLAN';
  payload: {
    trainingPlanId: uTrainingPlanId;
  }
}

export type ChangeRacedateAction = {
  type: 'CHANGE_RACEDATE';
  payload: {
    raceDate: uRaceDate;
  }
}

// A logged in user set his/her favorite
export type SetFavoriteAction = {
  type: 'SET_FAVORITE';
  payload: {
    trainingPlanId: uTrainingPlanId;
    raceDate: uRaceDate;
  }
}

// A logged in user unset his/her favorite
export type UnsetFavoriteAction = {
  type: 'UNSET_FAVORITE';
  payload: null
}

// The favorite data is cleared on front end, maybe cause the user logged out.
export type ClearFavoriteAction = {
  type: 'CLEAR_FAVORITE';
  payload: null
}

export type ConfigReducerAction = ChangePlanAction | ChangeRacedateAction | SetFavoriteAction | UnsetFavoriteAction | ClearFavoriteAction;
*/
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
