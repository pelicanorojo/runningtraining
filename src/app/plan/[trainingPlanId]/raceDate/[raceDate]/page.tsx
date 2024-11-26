/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-25T01:49:06-03:00
 */


import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import ConfigBar from '@/components/ui/custom/configBar';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"


// next are wrong types, define similar but for training workout lists...
import {TrainingPlanThinFrontList, TrainingPlanId} from "@/types/global"; 

interface ShowPlanPageProps {
  params: {
    trainingPlanId: string;
    raceDate: string;
  }
}

export default function ShowPlanPage({params}: ShowPlanPageProps) {
  const {trainingPlanId, raceDate} = params;
  const initialState = {trainingPlanId, raceDate};
  
  //const [selectedTraining, setSelectedTraining] = useState(5);
  //const [trainingDates, setTrainingDates] = useState(['2024-10-01', '2024-10-03']);
  const selectedTrainingId: undefined | TrainingPlanId = undefined;
  const trainingItems:TrainingPlanThinFrontList = [];
/*  const trainingItems = [
    {id: 0, date: '2024-10-01', week: 1}
    , {id: 1, date: '2024-10-03', week: 1}
    , {id: 2, date: '2024-10-05', week: 1}
    , {id: 3, date: '2024-10-06', week: 1}
  ]
*/
  return (
    <>
    <ConfigBar initialState={initialState}/> 
    <div className="flex gap-6 h-[calc(100vh-240px)]">
    {/* Left Panel - Dates */}
    <Card className="w-[240px] shadow-none">
      <CardHeader>
        <CardTitle>Training Schedule</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[calc(100vh-340px)]">
        <CardContent className="p-0">
          {trainingItems.length > 0 ? (
            <div className="space-y-1">
              {trainingItems.map((item) => (
                <Button
                  key={item.date}
                  variant={selectedTrainingId === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start px-3"                  
                >{/*onClick={() => setSelectedDate(item.date)}*/}
                  <div className="flex flex-col items-start">
                    <span className="text-sm">{item.date}</span>
                    {/*<span className="text-xs text-muted-foreground">Week {item.week}</span>*/}
                  </div>
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground p-4">
              Select a race date to view schedule
            </p>
          )}
        </CardContent>
      </ScrollArea>
    </Card>

    {/* Right Panel - Training Details */}
    <Card className="flex-1 shadow-none">
      <CardHeader>
        <CardTitle>Training Details</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedTrainingId ? (
          <div className="space-y-4">
            <p>Select one Training details for {selectedTrainingId} will be shown here.</p>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Select a date to view training details
          </div>
        )}
      </CardContent>
    </Card>
  </div>
  </>
  )
}
