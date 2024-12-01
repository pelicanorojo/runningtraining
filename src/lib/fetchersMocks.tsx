
/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-28T08:52:19-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-29T01:05:53-03:00
 */

import { TrainingData, TrainingPathData } from '@/types/global';
import { aSampleTrainingData,  aLongSampleTrainingData } from '@/lib/mockConstants';

export function fetchTrainingData(pathData: TrainingPathData, responseMS: number = 0, useOrder: boolean = false): Promise<TrainingData | null> {
  let mockData: TrainingData | null;

  if (useOrder && typeof pathData.trainingOrder !== 'undefined') { // for a fix training.
    mockData = aLongSampleTrainingData.find( t => t.order === (pathData.trainingOrder)) || null;;
  } else {
    mockData = aSampleTrainingData;
  }
  const r = new Promise((rs) => {
      setTimeout( () => rs(pathData.trainingOrder ? mockData : null), responseMS);
    }) as Promise<TrainingData | null>;

  return r;
}
