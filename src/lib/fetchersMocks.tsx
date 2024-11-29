
/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-28T08:52:19-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-29T12:04:57-03:00
 */

import { TrainingData, TrainingPathData } from '@/types/global';
import { aSampleTrainingData } from '@/lib/mockConstants';

export function fetchTrainingData(pathData: TrainingPathData, responseMS: number = 0): Promise<TrainingData | null> {
  const r = new Promise((rs) => {
      setTimeout( () => rs(pathData.trainingOrder ? aSampleTrainingData : null), responseMS);
    }) as Promise<TrainingData | null>;

  return r;
}
