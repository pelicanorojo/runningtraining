
/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-28T08:52:19-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-03T10:04:13-03:00
 */

import { TrainingData, TrainingDataParams } from '@/types/global';
import { aSampleTrainingData,  aLongSampleTrainingData } from '@/lib/mockConstants';

export function fetchTrainingData(trainingParams: TrainingDataParams, responseMS: number = 0, useOrder: boolean = false): Promise<TrainingData | null> {
  let mockData: TrainingData | null;

  if (useOrder && typeof trainingParams.order !== 'undefined') { // for a fix training.
    mockData = aLongSampleTrainingData.find( t => t.order === (trainingParams.order)) || null;;
  } else {
    mockData = aSampleTrainingData;
  }
  const r = new Promise((rs) => {
      setTimeout( () => rs(trainingParams.order ? mockData : null), responseMS);
    }) as Promise<TrainingData | null>;

  return r;
}
