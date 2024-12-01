/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-27T10:39:18-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-29T11:12:10-03:00
 */


'use client'

import TrainingContainerMain from '@/components/ui/custom/trainingContainerMain';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";

import { TrainingData, TrainingPathData } from "@/types/global";

import { useState, useEffect  } from 'react';
import {mocks} from '@/lib/fetchers';

/*import { configReducer } from '@/reducers/configReducer';
import paths from '@/lib/paths';
*/

const fetchTrainingData = (pathData: TrainingPathData) => {
  return mocks.fetchTrainingData(pathData, 0, true);
}

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
  pathData: TrainingPathData;
}

export default function TrainingContainer({pathData}: TrainingContainerProps) {
  const [trainingData, setTrainingData] = useState<TrainingData | null>(null);

  useEffect(() => {
    const fetchData =  async () => {
      let aTrainingData = null;

      if (pathData.trainingOrder) {
        aTrainingData = await fetchTrainingData(pathData);
      }
      setTrainingData(aTrainingData);
    };

    fetchData();
  }, [pathData])

  return (
    <Card className="flex-1 shadow-none flex flex-col h-full overflow-y-auto justify-between">
      {trainingData ?
        <>
        <TrainingContainerHeader dataTestid='trainingContainerHeader' trainingData={trainingData} />
        <TrainingContainerMain trainingData={trainingData} />
        <TrainingContainerFooter trainingData={trainingData} />
        </>
      : <CardContent data-testid='emptyCardContent' className="flex items-center justify-center h-full">Select a date to view training details...</CardContent>
      }
    </Card>
  );
}
