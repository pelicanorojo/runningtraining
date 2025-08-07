
/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-08-06T09:18:51-03:00
 */


//import { Calendar } from 'lucide-react';
import { Input } from "@/components/ui/input"


import { uString } from "@/types/global";

interface RaceDateSelectorProps {
  raceDate: uString;
  onChangeDate: (date: uString) => void;
}

export default function RaceDateSelector({raceDate, onChangeDate}: RaceDateSelectorProps) {
  return (
      <Input
        type="date"
        defaultValue={raceDate}
        className="w-[160px]"
        onChange={ e => onChangeDate(e.target.value) }
      />
  );
}
// the icon is redundant with the Input date calendar       <Calendar className="h-4 w-4 text-muted-foreground" />
