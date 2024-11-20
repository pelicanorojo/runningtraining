import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  //const [selectedTraining, setSelectedTraining] = useState(5);
  //const [trainingDates, setTrainingDates] = useState(['2024-10-01', '2024-10-03']);
  const selectedTraining = 1;
  const trainingItems = [
    {id: 0, date: '2024-10-01', week: 1}
    , {id: 1, date: '2024-10-03', week: 1}
    , {id: 2, date: '2024-10-05', week: 1}
    , {id: 3, date: '2024-10-06', week: 1}
  ]

  return (
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
                  variant={selectedTraining === item.id ? "secondary" : "ghost"}
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
        {selectedTraining ? (
          <div className="space-y-4">
            <p>Training details for {selectedTraining} will be shown here.</p>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Select a date to view training details
          </div>
        )}
      </CardContent>
    </Card>
  </div>
  )
}
