/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-07T01:28:30-03:00
 */

import { KnownLocales, PlanDataParams, TrainingDataParams } from "@/types/global";


const paths = {
  home () {
    return '/';
  }
  , trainingPlanShow ({trainingPlanId, raceDate}: PlanDataParams) {
    return `/plan/${trainingPlanId}/raceDate/${raceDate}`;
  }/*
  , trainingShow({trainingPlanId, raceDate, trainingOrder}: {trainingPlanId: string; raceDate: string, trainingOrder?: number}) {
    return `/plan/${trainingPlanId}/raceDate/${raceDate}/trainingOrder/${trainingOrder}`;
  }*/
  , api : {
    trainingDataFetch( trainingDataParams: TrainingDataParams, locale: KnownLocales ) {
      return `/${locale}/api/plans/${trainingDataParams.trainingPlanId}/${trainingDataParams.raceDate}/${trainingDataParams.order}`;
    }
  }
};

export default paths;