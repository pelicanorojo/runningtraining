/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-23T01:52:05-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-25T12:09:37-03:00
 */


'use client'

import { Button } from '@/components/ui/button';

import {TrainingPlanThinFrontList, TrainingPlanId, ConfigReducerAction} from "@/types/global";
import {trainingPlansAvailableBack} from "@/lib/constants";
import  { Dispatch, ReactNode } from 'react';

const trainingPlansAvailableFront:TrainingPlanThinFrontList = trainingPlansAvailableBack.map( p => {
  return {id: p.id, label: p.label};
})


interface GoButtonProps {
  children: ReactNode;
  availablePlans: TrainingPlanThinFrontList;
  selectedPlanId?: TrainingPlanId;
  selectedRaceDate?: string;
  go(): void;
}


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

export default function GoButton({children, availablePlans, selectedPlanId, selectedRaceDate, go}: GoButtonProps) {
  const selectedPlanOk = availablePlans.filter( p => p.id === selectedPlanId).length === 1;
  const selectedRaceDateOk = isValidDate(selectedRaceDate);

  let title = ''

  title += selectedPlanOk ? '' : 'Select well the plan.'
  title += selectedRaceDateOk ? '' : 'Select well the race date.'

  const enabled = selectedRaceDateOk && selectedPlanOk;
  
  return (
    <Button disabled={!enabled} title={title} variant={"default"} onClick={go} >{children}</Button>
  );
}
