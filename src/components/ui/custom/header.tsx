/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-21T11:36:49-03:00
 */


import HeaderTitle from '@/components/ui/custom/headerTitle';
import PlanSelector from '@/components/ui/custom/planSelector';
import RaceDateSelector from '@/components/ui/custom/raceDateSelector';
import AuthBox from '@/components/ui/custom/authBox';

import {TrainingPlanThinFrontList} from "@/types/global";
import {trainingPlansAvailableBack} from "@/lib/constants";

const trainingPlansAvailableFront:TrainingPlanThinFrontList = trainingPlansAvailableBack.map( p => {
  return {id: p.id, label: p.label};
})

export default function Header() {
  return (
    <header role="header" className="border-b">
      <HeaderTitle title="Marathon Training Planner"/>
    {/* Controls */}
    <div className="container py-4">
      <div className="flex justify-between items-center">
        <PlanSelector availablePlans={trainingPlansAvailableFront}/>

        {/* Date & User */}
        <div className="flex items-center space-x-6">
          <RaceDateSelector />
          <AuthBox />
        </div>
      </div>
    </div>
    </header>
  );
}