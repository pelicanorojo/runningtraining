/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-27T10:39:18-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-28T01:52:52-03:00
 */


'use client'

import TrainingContainerMain from '@/components/ui/custom/trainingContainerMain';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";

import { TrainingData } from "@/types/global";

import { useState, useEffect  } from 'react';
/*import { configReducer } from '@/reducers/configReducer';
import paths from '@/lib/paths';
*/
interface PathData {
  trainingPlanId: string;
  raceDate: string;
  trainingOrder?: number;
}

async function fetchTrainingData({pathData}: PathData): Promise<TrainingData | null> {
  const trainingData = {
    "trainingDate": "2017-10-07",
    "workoutName": "FINALIZAR MÁS RÁPIDO - 1/2 MARATÓN",
    "order": 3,
    "recommendedTime": 1800,
    "intervals": [
      {
        "intervalType": "warmUp",
        "totalTimeInZone": 300,
        "miCoachZone": "blue"
      },
      {
        "intervalType": "middle",
        "totalTimeInZone": 1200,
        "miCoachZone": "green"
      },
      {
        "intervalType": "coolDown",
        "totalTimeInZone": 300,
        "miCoachZone": "blue"
      }
    ],
    "trainingNotes": {
      "noteSummary": "Carrera verde.",
      "note": "Calienta y haz un poco de footing sencillo, y después acelera hasta alcanzar la velocidad de tu zona verde.",
      "secondaryNote": "Prepara tu equipo para el día de la carrera: las mismas zapatillas y ropa, todo el buen equipo con el que te has ejercitado. Nada nuevo. ¡Disfruta!. ¡BUENA SUERTE!"
    }
  } as TrainingData;

  const p = new Promise((rs) => {
    //*
    setTimeout( () => rs(trainingData), 200);
    //*/setTimeout( () => rs(null), 200);
  }) as Promise<TrainingData | null>;

  return p;
}


interface TrainingContainerHeaderProps {
  trainingData: TrainingData | null;
}

export function TrainingContainerHeader({trainingData}: TrainingContainerHeaderProps) {
  return (
    <CardHeader className="flex-none">
      <CardTitle>{trainingData?.workoutName || 'Training Details'}</CardTitle>
      <CardDescription>{trainingData?.trainingNotes.noteSummary} (Training Order {trainingData?.order}, Date {trainingData?.trainingDate})</CardDescription>
    </CardHeader>
  );
}

interface TrainingContainerFooterProps {
  trainingData: TrainingData | null;
}

export function TrainingContainerFooter({trainingData}: TrainingContainerFooterProps) {
  return (
    <CardFooter className="flex-none flex-col items-start">
      <CardTitle>{trainingData?.trainingNotes.noteSummary}</CardTitle>
      <CardDescription className='text-foreground'>{trainingData?.trainingNotes.note}</CardDescription>
      <CardDescription className='text-foreground'>{trainingData?.trainingNotes.secondaryNote}</CardDescription>
    </CardFooter>
  );
}

interface TrainingContainerProps {
  pathData: PathData;
}

export default function TrainingContainer({pathData}: TrainingContainerProps) {
  const [trainingData, setTrainingData] = useState<TrainingData | null>(null);


  useEffect(() => {
    const fetchData =  async () => {
      const aTrainingData = await fetchTrainingData(pathData);
      setTrainingData(aTrainingData);
    };

    fetchData();
  }, [pathData])

  return (
    <Card className="flex-1 shadow-none flex flex-col h-full overflow-y-auto justify-between">
      <TrainingContainerHeader trainingData={trainingData} />
      <TrainingContainerMain trainingData={trainingData} />
      <TrainingContainerFooter trainingData={trainingData}/>
    </Card>
  );
}
