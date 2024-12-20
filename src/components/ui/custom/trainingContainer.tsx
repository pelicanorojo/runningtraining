/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-27T10:39:18-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-19T10:22:58-03:00
 */


'use client'

import TrainingSchedule from '@/components/ui/custom/trainingSchedule';
import TrainingContainerMain from '@/components/ui/custom/trainingContainerMain';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";

import { PlanData, TrainingData, PlanDataParams as PlanDataParams } from "@/types/global";

import { useState, useEffect  } from 'react';
import { fetchTrainingData } from '@/lib/fetchers';


interface TrainingContainerHeaderProps {
  trainingData: TrainingData;
  dataTestid?: string;
}

export function TrainingContainerHeader({ trainingData, dataTestid }: TrainingContainerHeaderProps) {
  return (
    <CardHeader data-testid={dataTestid} className="flex-none">
      <CardTitle>{trainingData?.workoutName}</CardTitle>
      <CardDescription>{trainingData?.trainingNotes.noteSummary}</CardDescription>
      <CardDescription>(Training Order {trainingData.order || '?'}, Date {trainingData.trainingDate || '?'})</CardDescription>
    </CardHeader>
  );
}

interface TrainingContainerFooterProps {
  trainingData: TrainingData;
}

export function TrainingContainerFooter({trainingData}: TrainingContainerFooterProps) {
  return (
    <CardFooter className="flex-none flex-col items-start">
      <CardTitle>{trainingData.trainingNotes.noteSummary}</CardTitle>
      <CardDescription className='text-foreground'>{trainingData.trainingNotes.note}</CardDescription>
      <CardDescription className='text-foreground'>{trainingData.trainingNotes.secondaryNote}</CardDescription>
    </CardFooter>
  );
}

interface TrainingContainerProps {
  scheduledTrainings: PlanData;
  planDataParams: PlanDataParams;
}

export default function TrainingContainer({scheduledTrainings, planDataParams: getPlanDataParams}: TrainingContainerProps) {
  const [order, setOrder] = useState<number|undefined>(undefined);
  const [trainingData, setTrainingData] = useState<TrainingData | null>(null);

  useEffect(() => {
    
    const fetchData =  async () => {
      let aTrainingData = null;

      if (order) {

        aTrainingData = await fetchTrainingData({...getPlanDataParams, order});
        setTrainingData(aTrainingData);
      }
    };

    if (order) { fetchData();}
  }, [getPlanDataParams, order])

  return (
    <div className="flex-1 w-full overflow-x-auto">
      <div className="flex-1 gap-6 shadow-none flex flex-row h-full  justify-between min-w-max">
        <TrainingSchedule scheduledTrainings={scheduledTrainings} order={order} onOrderChange={setOrder}/>
        <Card className="flex-1 flex flex-col h-full overflow-x-auto justify-between w-[30rem]">
          {trainingData ?
            <>
            <TrainingContainerHeader dataTestid='trainingContainerHeader' trainingData={trainingData} />
            <TrainingContainerMain trainingData={trainingData} />
            <TrainingContainerFooter trainingData={trainingData} />
            </>
          : <CardContent data-testid='emptyCardContent' className="flex items-center justify-center h-full">Select a date to view training details...</CardContent>
          }
        </Card>
      </div>
    </div>

  );
}
