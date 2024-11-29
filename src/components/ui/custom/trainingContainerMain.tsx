/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-27T10:39:18-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-28T10:10:58-03:00
 */


import { CardContent } from "@/components/ui/card";
import { TrainingData } from "@/types/global";


interface TrainingContainerMainProps {
  trainingData: TrainingData | null;
  emptyText?: string;
}

export default function TrainingContainerMain({trainingData, emptyText}: TrainingContainerMainProps) {
  const trainingOrder = trainingData?.order;

  return (
      <CardContent className="grow">
        {trainingOrder ? (
          <div className="space-y-4">
            <p>Selected one Training details for {trainingOrder} intervals:</p>
            {trainingData.intervals.map((i, j) => (<p key={j}>{j}, {i.intervalType}</p>))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            {emptyText || 'Select a date to view training details.'}
          </div>
        )}
      </CardContent>
  );
}
