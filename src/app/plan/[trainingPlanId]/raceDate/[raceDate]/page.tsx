/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-27T08:12:34-03:00
 */


import React from 'react';
import ConfigBar from '@/components/ui/custom/configBar';
import TrainingSchedule from '@/components/ui/custom/trainingSchedule';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import fs from 'fs/promises';
import { getPlanJsonPath, generateScheduleFromPlan } from '@/lib/helpers';

// next are wrong types, define similar but for training workout lists...
import { TrainingPlanId, RawPlanData} from "@/types/global"; 
import { trainingPlansAvailableFront } from "@/lib/constants";

interface ShowPlanPageProps {
  params: {
    trainingPlanId: string;
    raceDate: string;
  }
}

async function getData(trainingPlanId: TrainingPlanId): Promise<RawPlanData> {
  const planPath = getPlanJsonPath(trainingPlanId);
  const planJSON = await fs.readFile(planPath, 'utf-8')
  const planData = JSON.parse(planJSON);
  return planData;
}

export default async function ShowPlanPage({params}: ShowPlanPageProps) {
  const {trainingPlanId, raceDate} = params;
  const initialState = {trainingPlanId, raceDate};

  //TODO: check trainingPlanId and raceDate are valid, if not redirect to 404.

  const planData = await getData(trainingPlanId);
  const scheduledTrainings = generateScheduleFromPlan(planData, raceDate);
  
  return (
    <>
    <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront} initialState={initialState}/> 
    <div className="flex gap-6 h-[calc(100vh-240px)]">
    {/* Left Panel - Dates */}
    <TrainingSchedule scheduledTrainings={scheduledTrainings} pathData={initialState}/>

    {/* Right Panel - Training Details */}
    <Card className="flex-1 shadow-none">
      <CardHeader>
        <CardTitle>Training Details</CardTitle>
      </CardHeader>
      <CardContent>
          <div className="text-center text-muted-foreground py-8">
            Select a training date on training scheduele to view training details
          </div>
      </CardContent>
    </Card>
  </div>
  </>
  )
}
