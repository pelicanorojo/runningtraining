/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-20T01:33:51-03:00
 */


'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch } from 'react';

import { TrainingPlanThinFrontList, TrainingPlanThinFront, TrainingPlanId } from "@/types/global";
import { ConfigReducerAction } from "@/types/global";

interface PlanSelectorProps {
  availablePlans: TrainingPlanThinFrontList;
  selectedPlanId?: TrainingPlanId;
  dispatch: Dispatch<ConfigReducerAction>
}

export default function PlanSelector ({selectedPlanId, availablePlans, dispatch}: PlanSelectorProps) {

  const handleSelect = (value: TrainingPlanId) => {
    dispatch({type: 'CHANGE_PLAN', payload: {trainingPlanId: value}});
  };

  const renderTrainingsList = (trainingList: TrainingPlanThinFrontList) => {
    return trainingList.map( (p: TrainingPlanThinFront) => {
      return (
        <SelectItem key={p.id} value={p.id} >{p.label}</SelectItem>
      );
    })
  }
  return (
      <Select value={selectedPlanId} onValueChange={handleSelect}>
        <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select training plan" />
        </SelectTrigger>
        <SelectContent>
          {renderTrainingsList(availablePlans)}
        </SelectContent>
      </Select>
  );
}
