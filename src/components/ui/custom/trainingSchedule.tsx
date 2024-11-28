/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-26T10:46:13-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-27T08:31:27-03:00
 */


'use client';
import { useRouter } from 'next/navigation';
import paths from '@/lib/paths';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button"
import { PlanData } from "@/types/global"; 

interface trainingScheduleProps {
  scheduledTrainings: PlanData;
  pathData: {
    trainingPlanId: string;
    raceDate: string;
    trainingOrder?: number;
  };
}
export const TrainingSelectedMarker = ({localizationId}: {localizationId: string}) => (<span className="mx-1" data-testid={localizationId}>selected</span>); 

export default function TrainingSchedule({scheduledTrainings,  pathData}: trainingScheduleProps) {
  const router = useRouter();
  const onTrainingOrderClick = (order: number) => {
    if (order !== pathData.trainingOrder) {
      router.push(paths.trainingShow({...pathData, trainingOrder: order}));
    }
  }

  return (
    <>
      <Card className="w-[240px] shadow-none">
      <CardHeader>
        <CardTitle>Training Schedule</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[calc(100vh-340px)]">
        <CardContent className="p-0">
          {scheduledTrainings.length > 0 &&
            <div className="space-y-1">
              {scheduledTrainings.map((item) => (
                <Button
                  key={item.trainingDate}
                  variant={pathData.trainingOrder === item.order ? "secondary" : "ghost"}
                  className="w-full justify-start px-3"
                  onClick={() => onTrainingOrderClick(item.order)}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-sm">{item.trainingDate}{pathData.trainingOrder === item.order && <TrainingSelectedMarker localizationId={item.trainingDate}/>}</span>
                  </div>
                </Button>
              ))}
            </div>
          }
        </CardContent>
      </ScrollArea>
      </Card>
    </>
  );
}