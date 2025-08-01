
/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-29T09:28:18-03:00
 */


//import { Calendar } from 'lucide-react';
import { Input } from "@/components/ui/input"


import { uString } from "@/types/global";

import { useAppStore } from '@/stores/useAppStore';

interface RaceDateSelectorProps {
  raceDate: uString;
}

export default function RaceDateSelector({raceDate}: RaceDateSelectorProps) {
  const setRaceDate = useAppStore((s) => s.setRaceDateAction);

  return (
      <Input
        type="date"
        defaultValue={raceDate}
        className="w-[160px]"
        onChange={ e => setRaceDate(e.target.value) }
      />
  );
}
// the icon is redundant with the Input date calendar       <Calendar className="h-4 w-4 text-muted-foreground" />
