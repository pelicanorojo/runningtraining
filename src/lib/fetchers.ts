/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-12-03T11:38:28-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-04T01:52:14-03:00
 */

import { TrainingDataParams } from '@/types/global';
import paths from '@/lib/paths';

export async function fetchTrainingData( trainingDataParams: TrainingDataParams) {
  const endpoint = paths.api.trainingDataFetch(trainingDataParams);

  const res = await fetch(endpoint);
  return res.json();
}
