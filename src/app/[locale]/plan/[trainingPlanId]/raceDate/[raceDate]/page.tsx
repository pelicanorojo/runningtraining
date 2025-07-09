/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-08T09:59:49-03:00
 */


import ConfigBar from '@/components/ui/custom/configBar';
import TrainingContainer from '@/components/ui/custom/trainingContainer';

import { generateScheduleFromPlan, formatDate } from '@/lib/helpers';

import { loadRawPlanData } from '@/lib/loaders';
import { trainingPlansAvailableFront } from "@/lib/constants";
import { KnownLocales, RaceDate, TrainingPlanId } from '@/types/global';

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
  //TODO: check trainingPlanId and raceDate are valid, if not redirect to 404.
  const rawPlanData = await loadRawPlanData(trainingPlanId , locale);
  const scheduledTrainings = generateScheduleFromPlan(rawPlanData, raceDate);
  const defaultOrder = scheduledTrainings.find( t => t.trainingDate >= today)?.order || scheduledTrainings.length;
  return (
    <>
    <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]}/> 
    <TrainingContainer  scheduledTrainings={scheduledTrainings} planDataParams={params} defaultOrder={defaultOrder}/>
    </>
  )
}
