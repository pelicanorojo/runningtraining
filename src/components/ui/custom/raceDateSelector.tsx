
/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-20T01:35:15-03:00
 */


//import { Calendar } from 'lucide-react';
import { Input } from "@/components/ui/input"


import { Dispatch } from 'react';
import { ConfigReducerAction } from "@/types/global";

interface RaceDateSelectorProps {
  raceDate: string | undefined;
  dispatch: Dispatch<ConfigReducerAction>
}

export default function RaceDateSelector({raceDate, dispatch}: RaceDateSelectorProps) {

  return (
      <Input
        type="date"
        defaultValue={raceDate}
        className="w-[160px]"
        onChange={(e) => {
          dispatch({
            type: 'CHANGE_RACEDATE'
            , payload: {raceDate: e.target.value}
          });
        }}
      />
  );
}
// the icon is redundant with the Input date calendar       <Calendar className="h-4 w-4 text-muted-foreground" />
