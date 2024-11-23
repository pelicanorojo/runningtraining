/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-22T10:12:07-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-23T12:19:24-03:00
 */

'use client'
import PlanSelector from '@/components/ui/custom/planSelector';
import RaceDateSelector from '@/components/ui/custom/raceDateSelector';
import { Button } from '@/components/ui/button';

import {TrainingPlanThinFrontList} from "@/types/global";
import {trainingPlansAvailableBack} from "@/lib/constants";
import  { useReducer } from 'react';
import { initialState, configReducer } from '@/reducers/configReducer';

const trainingPlansAvailableFront:TrainingPlanThinFrontList = trainingPlansAvailableBack.map( p => {
  return {id: p.id, label: p.label};
})

export default function ConfigBar() {
  const [state, dispatch] = useReducer(configReducer, initialState);

  return (
    <div className="container py-4">
      <div className="flex flex-row gap-10 items-center">
        <PlanSelector availablePlans={trainingPlansAvailableFront} selectedPlanId={state.trainingPlanId} dispatch={dispatch}/>
        <RaceDateSelector raceDate={state.raceDate} dispatch={dispatch}/>
        <Button>Go</Button>
      </div>
    </div>
  );
}
