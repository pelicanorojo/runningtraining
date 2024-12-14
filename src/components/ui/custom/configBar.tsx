/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-22T10:12:07-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-14T01:36:54-03:00
 */

'use client'

import { useReducer, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Settings } from 'lucide-react';

import { trainingPlansAvailableFront } from '@/lib/constants';
import { PlanConfig, TrainingPlanThinFrontList } from "@/types/global";
import { configReducer } from '@/reducers/configReducer';
import paths from '@/lib/paths';

import PlanSelector from '@/components/ui/custom/planSelector';
import RaceDateSelector from '@/components/ui/custom/raceDateSelector';



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

  const trainingLabel = trainingPlansAvailableFront.find( t => t.id === state.trainingPlanId)?.label;

  useEffect(() => {
    if (prevState.current.trainingPlanId !== state.trainingPlanId || prevState.current.raceDate !== state.raceDate) {
      if (isValidRouteData(trainingPlansAvailable, state)) {
        router.push(paths.trainingPlanShow(state as {trainingPlanId: string; raceDate:string}))
      }
    }
  }, [state, router, trainingPlansAvailable])

  return (
    <div className="container w-full py-4">
      {/*<div className="flex flex-row gap-6 items-center"><div className="flex items-center justify-between p-4 bg-background border-b">*/}
      <div className="flex flex-row items-center gap-6 p-4 bg-background border-b">
        <div className='flex-1  flex-col'>
        <div className="flex-1 text-sm">
          {`Plan: ${trainingLabel}`}
          </div>
          <div className="flex-1 text-sm">
          {`Race Date: (${state.raceDate})`}
        </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogDescription>This is a popup for select the training plan, and the race date.</DialogDescription>
            <DialogHeader>
              <DialogTitle>Configuration</DialogTitle>
            </DialogHeader>
            <PlanSelector availablePlans={trainingPlansAvailable} selectedPlanId={state.trainingPlanId} dispatch={dispatch}/>
            <RaceDateSelector raceDate={state.raceDate} dispatch={dispatch} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
