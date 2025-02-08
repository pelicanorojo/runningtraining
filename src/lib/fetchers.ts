/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-12-03T11:38:28-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-07T01:49:44-03:00
 */

import { KnownLocales, TrainingDataParams } from '@/types/global';
import paths from '@/lib/paths';

export async function fetchTrainingData( trainingDataParams: TrainingDataParams, locale: KnownLocales) {
  const endpoint = paths.api.trainingDataFetch(trainingDataParams, locale);
  const res = await fetch(endpoint);
  return res.json();
}
