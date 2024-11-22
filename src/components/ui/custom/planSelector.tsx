'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import {TrainingPlanThinFrontList, TrainingPlanThinFront, TrainingPlanId} from "@/types/global";
import { useRouter } from 'next/navigation';
import paths from '@/lib/paths';


interface PlanSelectorProps {
  availablePlans: TrainingPlanThinFrontList;
  selectedPlanId?: TrainingPlanId;

}

export default function PlanSelector ({selectedPlanId, availablePlans}: PlanSelectorProps) {
  const router = useRouter();

  const handleSelect = (value: TrainingPlanId) => {
    console.log('DBG: handSelected')
    router.push(paths.trainingPlanShow(value)); // Replace with your desired route
  };

  const renderTrainingsList = (trainingList: TrainingPlanThinFrontList) => {
    return trainingList.map( (p: TrainingPlanThinFront) => {
      return (
        <SelectItem key={p.id} value={p.id} >{p.label}</SelectItem>
      );
    })
  }

  return (
    <div className="flex items-center space-x-4">
      <Select value={selectedPlanId} onValueChange={handleSelect}>
        <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select training plan" />
        </SelectTrigger>
        <SelectContent>
          {renderTrainingsList(availablePlans)}
        </SelectContent>
      </Select>
    </div>
  );
}