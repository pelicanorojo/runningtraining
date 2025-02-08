/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-06T10:45:13-03:00
 */


import {TrainingPlanId, TrainingPlansAvailableBack, TrainingPlansAvailableFront} from '@/types/global';

export const supportedLocales = ['en', 'es']
export const localesRegExPart = supportedLocales.join('|')

export const defaultLocale = supportedLocales[0];

export const trainingPlansAvailableLabels = {
  "es": {
    "test": "Un test",
    "21k110m4wbw5m": "21k 1h10m 4 trabajosPorSemana 5 meses",
    "21k110m6wbw5m": "21k 1h10m 6 trabajosPorSemana 5 meses",
    "21k120m6wbw5m": "21k 1h20m 6 trabajosPorSemana 5 meses",
    "42k230m4wbw5m": "42k 2h30m 4 trabajosPorSemana 5 meses",
    "42k230m6wbw5m": "42k 2h30m 6 trabajosPorSemana 5 meses",
    "42k240m4wbw5m": "42k 2h40m 4 trabajosPorSemana 5 meses",
    "42k240m6wbw5m": "42k 2h40m 6 trabajosPorSemana 5 meses",
    "42k250m4wbw5m": "42k 2h50m 4 trabajosPorSemana 5 meses",
    "42k250m6wbw5m": "42k 2h50m 6 trabajosPorSemana 5 meses"
  },
  "en": {
    "test": "A test",
    "21k110m4wbw5m": "21k 1h10m 4 worksPerWeek 5 months",
    "21k110m6wbw5m": "21k 1h10m 6 worksPerWeek 5 months",
    "21k120m6wbw5m": "21k 1h20m 6 worksPerWeek 5 months",
    "42k230m4wbw5m": "42k 2h30m 4 worksPerWeek 5 months",
    "42k230m6wbw5m": "42k 2h30m 6 worksPerWeek 5 months",
    "42k240m4wbw5m": "42k 2h40m 4 worksPerWeek 5 months",
    "42k240m6wbw5m": "42k 2h40m 6 worksPerWeek 5 months",
    "42k250m4wbw5m": "42k 2h50m 4 worksPerWeek 5 months",
    "42k250m6wbw5m": "42k 2h50m 6 worksPerWeek 5 months"
  }
}


const trainingPlansAvailable: {id: TrainingPlanId, fileName: string}[] = [
  {id: 'test', fileName: 'test.json'},
  {id: '21k110m4wbw5m', fileName: '21k-0110-4wobyweek-5months.json'},
  {id: '21k110m6wbw5m', fileName: '21k-0110-6wobyweek-5months.json'},
  {id: '21k120m6wbw5m', fileName: '21k-0120-6wobyweek-5months.json'},
  {id: '42k230m4wbw5m', fileName: '42k-0230-4wobyweek-5months.json'},
  {id: '42k230m6wbw5m', fileName: '42k-0230-6wobyweek-5months.json'},
  {id: '42k240m4wbw5m', fileName: '42k-0240-4wobyweek-5months.json'},
  {id: '42k240m6wbw5m', fileName: '42k-0240-6wobyweek-5months.json'},
  {id: '42k250m4wbw5m', fileName: '42k-0250-4wobyweek-5months.json'},
  {id: '42k250m6wbw5m', fileName: '42k-0250-6wobyweek-5months.json'}
];


export const trainingPlansAvailableBack: TrainingPlansAvailableBack = {
  "en": trainingPlansAvailable.map( ({id, fileName}) => ({id, fileName, label: trainingPlansAvailableLabels['en'][id]})),
  "es": trainingPlansAvailable.map( ({id, fileName}) => ({id, fileName, label: trainingPlansAvailableLabels['es'][id]}))
}

export const trainingPlansAvailableFront : TrainingPlansAvailableFront = {
  "en": trainingPlansAvailable.map( ({id}) => ({id, label: trainingPlansAvailableLabels['en'][id]})),
  "es": trainingPlansAvailable.map( ({id}) => ({id, label: trainingPlansAvailableLabels['es'][id]}))
}

export const plansSubFolder = 'data/plans';
