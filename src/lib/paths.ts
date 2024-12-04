/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-04T12:53:49-03:00
 */

import { PlanDataParams, TrainingDataParams } from "@/types/global";


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
    trainingDataFetch( trainingDataParams: TrainingDataParams ) {
      return `/api/plans/${trainingDataParams.trainingPlanId}/${trainingDataParams.raceDate}/${trainingDataParams.order}`;
    }
  }
};

export default paths;