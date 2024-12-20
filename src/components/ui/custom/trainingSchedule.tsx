/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-26T10:46:13-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-19T11:10:54-03:00
 */


'use client';
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
  order?: number;
  onOrderChange(order: number): void;
}

export const TrainingSelectedMarker = ({localizationId}: {localizationId: string}) => (<span className="mx-1" data-testid={localizationId}>*</span>); 

export default function TrainingSchedule({scheduledTrainings,  order, onOrderChange}: trainingScheduleProps) {
  const onTrainingOrderClick = (aOrder: number) => {
    if (aOrder !== order) {
      onOrderChange(aOrder);
    }
  }

  return (
    <>
      <Card className="flex flex-col w-[7rem] shadow-none h-full">
        <CardHeader className="p-3">
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        {/*        <ScrollArea className="h-[calc(100vh-340px)]">*/}
        <ScrollArea className="h-[calc(100vh-250px)]">
          <CardContent className="p-0">
            {scheduledTrainings.length > 0 &&
              <div className="space-y-1">
                {scheduledTrainings.map((item) => (
                  <Button
                    key={item.trainingDate}
                    variant={order === item.order ? "secondary" : "ghost"}
                    className="w-full justify-start px-3 py-0 h-7"
                    onClick={() => onTrainingOrderClick(item.order)}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm">{item.trainingDate}{order === item.order && <TrainingSelectedMarker localizationId={item.trainingDate}/>}</span>
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
