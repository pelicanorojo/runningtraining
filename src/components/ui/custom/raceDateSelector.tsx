
/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-21T11:37:18-03:00
 */


//import React, {useState} from 'react';
import { Calendar } from 'lucide-react';
import { Input } from "@/components/ui/input"

export default function RaceDateSelector() {
  //const [selectedPlan, setSelectedPlan] = useState('half-marathon-12');
  //const [raceDate, setRaceDate] = useState('');
  const raceDate  = '2024-11-29';

  return (
    <div className="flex items-center space-x-2">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <Input
        type="date"
        defaultValue={raceDate}
        className="w-[160px]"
      />
        {/*onChange={(e) => {
          setRaceDate(e.target.value);
          generateTrainingDates(e.target.value);
        }}
        */}
    </div>
  );
}