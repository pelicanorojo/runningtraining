/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-25T12:15:34-03:00
 */


const paths = {
  home () {
    return '/';
  }
  , trainingPlanShow ({trainingPlanId, raceDate}: {trainingPlanId: string; raceDate: string}) {
    return `/plan/${trainingPlanId}/raceDate/${raceDate}`;
  }
};

export default paths;