
/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-28T08:52:19-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-07T12:36:28-03:00
 */
import fs from 'fs/promises';
import { getPlanJsonPath, generateTrainingFromPlan } from "./helpers";
import * as _mocks from '@/lib/loadersMocks';
import { TrainingDataParams, TrainingData, TrainingPlanId, RawPlanData, KnownLocales} from '@/types/global';

export const mocks = _mocks;


export async function loadRawPlanData(trainingPlanId: TrainingPlanId, locale: KnownLocales): Promise<RawPlanData> {
  const planPath = getPlanJsonPath(trainingPlanId, locale);
  const planJSON = await fs.readFile(planPath, 'utf-8')
  const planData = JSON.parse(planJSON);
  return planData;
}

export async function loadTrainingData({ trainingPlanId, raceDate, order}: TrainingDataParams, locale: KnownLocales ): Promise<TrainingData | null> {
  const planPath = getPlanJsonPath(trainingPlanId, locale);
  const planJSON = await fs.readFile(planPath, 'utf-8')
  const planData = JSON.parse(planJSON);

  const trainingData = generateTrainingFromPlan({ planData, raceDate, order });
  return trainingData;
}
