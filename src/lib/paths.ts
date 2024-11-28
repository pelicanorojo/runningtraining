/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-27T12:50:23-03:00
 */


const paths = {
  home () {
    return '/';
  }
  , trainingPlanShow ({trainingPlanId, raceDate}: {trainingPlanId: string; raceDate: string}) {
    return `/plan/${trainingPlanId}/raceDate/${raceDate}`;
  }
  , trainingShow({trainingPlanId, raceDate, trainingOrder}: {trainingPlanId: string; raceDate: string, trainingOrder?: number}) {
    return `/plan/${trainingPlanId}/raceDate/${raceDate}/trainingOrder/${trainingOrder}`;
  }
};

export default paths;