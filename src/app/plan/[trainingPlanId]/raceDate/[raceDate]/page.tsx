/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-19T11:32:37-03:00
 */


import React from 'react';
import ConfigBar from '@/components/ui/custom/configBar';
import TrainingContainer from '@/components/ui/custom/trainingContainer';

import { generateScheduleFromPlan } from '@/lib/helpers';

import { loadRawPlanData } from '@/lib/loaders';
import { trainingPlansAvailableFront } from "@/lib/constants";

interface ShowPlanPageProps {
  params: {
    trainingPlanId: string;
    raceDate: string;
  }
}

export default async function ShowPlanPage({params}: ShowPlanPageProps) {
  const {trainingPlanId, raceDate} = params;
  const initialState = {trainingPlanId, raceDate};

  //TODO: check trainingPlanId and raceDate are valid, if not redirect to 404.

  const rawPlanData = await loadRawPlanData(trainingPlanId);
  const scheduledTrainings = generateScheduleFromPlan(rawPlanData, raceDate);
  
  return (
    <>
    <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront} initialState={initialState}/> 
    <TrainingContainer  scheduledTrainings={scheduledTrainings} planDataParams={params}/>
    </>
  )
}
