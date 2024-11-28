/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-27T10:50:54-03:00
 */


import React from 'react';

import ConfigBar from '@/components/ui/custom/configBar';
import TrainingSchedule from '@/components/ui/custom/trainingSchedule';
import TrainingContainer from '@/components/ui/custom/trainingContainer';

import fs from 'fs/promises';
import { getPlanJsonPath, generateScheduleFromPlan } from '@/lib/helpers';

// next are wrong types, define similar but for training workout lists...
import { TrainingPlanId, RawPlanData} from "@/types/global"; 
import { trainingPlansAvailableFront } from "@/lib/constants";

interface ShowPlanPageProps {
  params: {
    trainingPlanId: string;
    raceDate: string;
    trainingOrder: string;
  }
}

async function getData(trainingPlanId: TrainingPlanId): Promise<RawPlanData> {
  const planPath = getPlanJsonPath(trainingPlanId);
  const planJSON = await fs.readFile(planPath, 'utf-8')
  const planData = JSON.parse(planJSON);
  return planData;
}

export default async function ShowTrainingPage({params}: ShowPlanPageProps) {
  const {trainingPlanId, raceDate, trainingOrder} = params;
  const initialState = {trainingPlanId, raceDate};

  //TODO: check trainingPlanId and raceDate are valid, if not redirect to 404.

  const planData = await getData(trainingPlanId);
  const scheduledTrainings = generateScheduleFromPlan(planData, raceDate);

  return (
    <>
    <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront} initialState={initialState}/> 
    <div className="flex gap-6 h-[calc(100vh-240px)]">
    {/* Left Panel - Dates */}
    <TrainingSchedule scheduledTrainings={scheduledTrainings} pathData={{...initialState, trainingOrder: parseInt(trainingOrder, 10)}}/>

    {/* Right Panel - Training Details */}
    <TrainingContainer pathData={{...initialState, trainingOrder: parseInt(trainingOrder, 10)}}/>
  </div>
  </>
  )
}
