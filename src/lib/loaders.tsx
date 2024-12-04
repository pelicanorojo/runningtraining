
/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-28T08:52:19-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-04T01:08:09-03:00
 */
import fs from 'fs/promises';
import { getPlanJsonPath, generateTrainingFromPlan } from "./helpers";
import * as _mocks from '@/lib/loadersMocks';
import { TrainingDataParams, TrainingData, TrainingPlanId, RawPlanData } from '@/types/global';

export const mocks = _mocks;


export async function loadRawPlanData(trainingPlanId: TrainingPlanId): Promise<RawPlanData> {
  const planPath = getPlanJsonPath(trainingPlanId);
  const planJSON = await fs.readFile(planPath, 'utf-8')
  const planData = JSON.parse(planJSON);
  return planData;
}

export async function loadTrainingData({ trainingPlanId, raceDate, order}: TrainingDataParams ): Promise<TrainingData | null> {
  const planPath = getPlanJsonPath(trainingPlanId);
  const planJSON = await fs.readFile(planPath, 'utf-8')
  const planData = JSON.parse(planJSON);

  const trainingData = generateTrainingFromPlan({ planData, raceDate, order });
  return trainingData;
}
