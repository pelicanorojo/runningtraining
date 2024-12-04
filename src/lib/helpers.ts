/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-20T01:08:43-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-04T01:24:42-03:00
 */

import path from 'path';
import process from 'process';
import {plansSubFolder} from "@/lib/constants";
import {TrainingPlanId, TrainingPlanThinFrontList, TrainingPlanThinBackList, RawPlanData, PlanData, RaceDate, RawTrainingData, TrainingData} from "@/types/global";

import { trainingPlansAvailableBack } from "@/lib/constants";

export const trainingPlansAvailableFront:TrainingPlanThinFrontList = trainingPlansAvailableBack.map( p => {
  return {id: p.id, label: p.label};
})

// Inmediate Invoked function, no globals
// Using the known plan data, returns a function able to compute the json path using as input the trainingPlanID
export const getPlanJsonPath = ((trainingPlansAvailableBack: TrainingPlanThinBackList) => {
  return (trainingPlanId: TrainingPlanId) => {
    const planFileName = trainingPlansAvailableBack.find(p => p.id === trainingPlanId)?.fileName;
    return path.join(process.cwd(), `src/${plansSubFolder}/${planFileName}`)  
  }
})(trainingPlansAvailableBack);

//========== dates functions, past to use a libray only when strictly necesary, works with UTC as contract ==========

export const createUTCDateFromString = (dateString: string): Date => {
  const date = new Date(dateString);
  // Ensure UTC timezone
  date.setUTCHours(0, 0, 0, 0);
  return new Date(date.toISOString());
}

export const createUTCDate = (year: number, month:number, day: number) => {
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
}

export function formatDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const shiftDate = (date: Date, dateDifference: number): Date => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + dateDifference);
  return copy;
};

const millisecondsInADay = 24 * 60 *60 * 1000;
export const dateDiff = (d2: Date, d1: Date) => (d2.getTime() - d1.getTime()) / millisecondsInADay;

// Using the raw planData, generate a list, with the training dates corrected for be compatible with raceDate
// for be shown on the scheduler


interface GenerateTrainingFromPlan {
  planData: RawPlanData;
  raceDate: RaceDate;
  order: number;
}

export const generateTrainingFromPlan = ({ planData, raceDate, order}: GenerateTrainingFromPlan): TrainingData|null => {
  const trainingsList = planData.results;


  const lastTraining = trainingsList[0];
  const lastTrainingRawDate = createUTCDateFromString(lastTraining.scheduledDate);
  const lastTrainingDateReference = shiftDate(createUTCDateFromString(raceDate), -1);

  const dateDifference = dateDiff(lastTrainingDateReference, lastTrainingRawDate);
  
  const training =  trainingsList.find( t => t.order === order );

  return training
    ? {
      workoutName: training.workoutName,
      trainingDate: formatDate(shiftDate(createUTCDateFromString(training.scheduledDate), dateDifference)),
      order: training.order,
      recommendedTime: training.recommendedTime,
      intervals: training.intervals.map( i => ({intervalType: i.intervalType, totalTimeInZone: i.totalTimeInZone, zone: i.miCoachZone})),
      trainingNotes: training.trainingNotes
    }
    : null;
};

export const generateScheduleFromPlan = (planData: RawPlanData, raceDate: RaceDate): PlanData => {
  
  const trainingsList = planData.results;

  const lastTraining = trainingsList[0];
  const lastTrainingRawDate = createUTCDateFromString(lastTraining.scheduledDate);
  const lastTrainingDateReference = shiftDate(createUTCDateFromString(raceDate), -1);

  const dateDifference = dateDiff(lastTrainingDateReference, lastTrainingRawDate);
  
  const result =  trainingsList.map(
    (t: RawTrainingData): TrainingData => ({
      workoutName: t.workoutName,
      trainingDate: formatDate(shiftDate(createUTCDateFromString(t.scheduledDate), dateDifference)),
      order: t.order,
      recommendedTime: t.recommendedTime,
      intervals: t.intervals.map( i => ({intervalType: i.intervalType, totalTimeInZone: i.totalTimeInZone, zone: i.miCoachZone})),
      trainingNotes: t.trainingNotes
    })
  );

  return result;
};
//========== dates functions, past to use a libray only when strictly necesary/ ==========
