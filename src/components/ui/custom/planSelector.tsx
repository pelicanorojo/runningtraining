/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-08-02T09:32:24-03:00
 */


'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TrainingPlanThinFrontList, TrainingPlanThinFront, TrainingPlanId, uTrainingPlanId } from "@/types/global";

import { useAppStore } from '@/stores/useAppStore';


interface PlanSelectorProps {
  availablePlans: TrainingPlanThinFrontList;
  selectedPlanId?: uTrainingPlanId;
  placeHolder?: string;
}

export default function PlanSelector ({selectedPlanId, availablePlans, placeHolder}: PlanSelectorProps) {
  const setTrainingPlanId = useAppStore((s) => s.setTrainingPlanIdAction);

  const handleSelect = (value: TrainingPlanId) => {
    setTrainingPlanId(value)
  };

  const renderTrainingsList = (trainingList: TrainingPlanThinFrontList) => {
    return trainingList.map( (p: TrainingPlanThinFront) => {
      return (
        <SelectItem key={p.id} value={p.id} >{p.label}</SelectItem>
      );
    })
  }
  const selectValue = selectedPlanId || '';
  return (
      <Select value={selectValue} onValueChange={handleSelect}>
        <SelectTrigger className="w-[280px]"  aria-label="Plan Selector">
        <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          {renderTrainingsList(availablePlans)}
        </SelectContent>
      </Select>
  );
}
