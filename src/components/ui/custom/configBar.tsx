/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-22T10:12:07-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-27T10:45:22-03:00
 */

'use client'
import PlanSelector from '@/components/ui/custom/planSelector';
import RaceDateSelector from '@/components/ui/custom/raceDateSelector';
import { useRouter } from 'next/navigation';

import { PlanConfig, TrainingPlanThinFrontList } from "@/types/global";
import { useReducer, useEffect, useRef } from 'react';
import { configReducer } from '@/reducers/configReducer';
import paths from '@/lib/paths';

function isValidDate(dateString: string | undefined): boolean {
  // is defined?
  let valid = typeof dateString !== 'undefined';
  if (!valid) return valid;

  // is well formatted?
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  valid = dateRegex.test(dateString as string)
  if (!valid) return valid;

  // is a valid date?
  const date = new Date(dateString as string);
  valid = !isNaN(date.getTime());

  return valid;
}

function isValidRouteData (availablePlans: TrainingPlanThinFrontList, {trainingPlanId, raceDate}: PlanConfig) {
  const selectedPlanOk = availablePlans.filter( p => p.id === trainingPlanId).length === 1;
  const selectedRaceDateOk = isValidDate(raceDate);
  return selectedPlanOk && selectedRaceDateOk
}

interface ConfigBarProps {
  trainingPlansAvailable: TrainingPlanThinFrontList;
  initialState: PlanConfig;
};

export default function ConfigBar({trainingPlansAvailable, initialState}: ConfigBarProps) {
  const [state, dispatch] = useReducer(configReducer, initialState);
  const router = useRouter();
  const prevState = useRef(initialState);

  useEffect(() => {
    if (prevState.current.trainingPlanId !== state.trainingPlanId || prevState.current.raceDate !== state.raceDate) {
      if (isValidRouteData(trainingPlansAvailable, state)) {
        router.push(paths.trainingPlanShow(state as {trainingPlanId: string; raceDate:string}))
      }
    }
  }, [state, router, trainingPlansAvailable])

  return (
    <div className="container py-4">
      <div className="flex flex-row gap-10 items-center">
        <PlanSelector availablePlans={trainingPlansAvailable} selectedPlanId={state.trainingPlanId} dispatch={dispatch}/>
        <RaceDateSelector raceDate={state.raceDate} dispatch={dispatch}/>
      </div>
    </div>
  );
}
