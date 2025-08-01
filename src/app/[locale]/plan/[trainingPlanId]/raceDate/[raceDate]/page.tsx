/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-08-01T01:13:51-03:00
 */


import ConfigBar from '@/components/ui/custom/configBar';
import TrainingContainer from '@/components/ui/custom/trainingContainer';

import { generateScheduleFromPlan, formatDate } from '@/lib/helpers';

import { loadRawPlanData } from '@/lib/loaders';
import { trainingPlansAvailableFront } from "@/lib/constants";
import { KnownLocales, RaceDate, TrainingPlanId, isValidRaceDate, isValidTrainingPlanId } from '@/types/global';

interface ShowPlanPageProps {
  params: {
    trainingPlanId: TrainingPlanId;
    raceDate: RaceDate;
    locale: KnownLocales;
  }
}

export default async function ShowPlanPage({params}: ShowPlanPageProps) {
  const {trainingPlanId, raceDate, locale} = params;
  const today = formatDate(new Date());  

  const validPlanId = isValidTrainingPlanId(trainingPlanId);
  const validRaceDate = isValidRaceDate(raceDate);

  let rawPlanData 
  
  if (validPlanId) {
    rawPlanData = await loadRawPlanData(trainingPlanId , locale);
  }

  let scheduledTrainings, defaultOrder;

  if (validPlanId && validRaceDate && rawPlanData) {
    scheduledTrainings = generateScheduleFromPlan(rawPlanData, raceDate);
    defaultOrder = scheduledTrainings.find( t => t.trainingDate >= today)?.order || scheduledTrainings.length;
  }

  return (
      <>
      <ConfigBar
        trainingPlansAvailable={trainingPlansAvailableFront[locale]}
        origTrainingPlanId={validPlanId ? trainingPlanId : undefined}
        origRaceDate={validRaceDate ? raceDate : undefined}        
      />
      {scheduledTrainings && <TrainingContainer  scheduledTrainings={scheduledTrainings} planDataParams={params} defaultOrder={defaultOrder}/>}
      </>
    )
}
