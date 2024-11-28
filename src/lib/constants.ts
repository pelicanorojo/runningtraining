/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-26T10:41:38-03:00
 */


import {TrainingPlanThinBackList, TrainingPlanThinFrontList} from '@/types/global';

export const trainingPlansAvailableBack: TrainingPlanThinBackList = [
  {id: 'test', label: 'a test', fileName: 'test.json'},
  {id: '21k110m4wbw5m', label: '21k 1h10m 4workByWeek 5 months plan', fileName: '21k-0110-4wobyweek-5months.json'},
  {id: '21k110m6wbw5m', label: '21k 1h10m 6workByWeek 5 months plan', fileName: '21k-0110-6wobyweek-5months.json'},
  {id: '21k120m6wbw5m', label: '21k 1h20m 6workByWeek 5 months plan', fileName: '21k-0120-6wobyweek-5months.json'},
  {id: '42k230m4wbw5m', label: '42k 2h30m 4workByWeek 5 months plan', fileName: '42k-0230-4wobyweek-5months.json'},
  {id: '42k230m6wbw5m', label: '42k 2h30m 6workByWeek 5 months plan', fileName: '42k-0230-6wobyweek-5months.json'},
  {id: '42k240m4wbw5m', label: '42k 2h40m 4workByWeek 5 months plan', fileName: '42k-0240-4wobyweek-5months.json'},
  {id: '42k240m6wbw5m', label: '42k 2h40m 6workByWeek 5 months plan', fileName: '42k-0240-6wobyweek-5months.json'},
  {id: '42k250m4wbw5m', label: '42k 2h50m 4workByWeek 5 months plan', fileName: '42k-0250-4wobyweek-5months.json'},
  {id: '42k250m6wbw5m', label: '42k 2h50m 6workByWeek 5 months plan', fileName: '42k-0250-6wobyweek-5months.json'}
];

export const trainingPlansAvailableFront:TrainingPlanThinFrontList = trainingPlansAvailableBack.map( p => {
  return {id: p.id, label: p.label};
})

export const plansSubFolder = 'data/plans';