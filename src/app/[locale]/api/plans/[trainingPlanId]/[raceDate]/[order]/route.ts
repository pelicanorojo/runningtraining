/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2025-02-04T12:06:46-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-07T01:49:33-03:00
 */


import { NextRequest, NextResponse } from 'next/server';
import { loadTrainingData } from '@/lib/loaders';
import { KnownLocales, RaceDate, TrainingPlanId } from '@/types/global';

// /api/plans/[trainingPlanId]/[raceDate]/[order].js
export async function GET(request: NextRequest, { params } : {params: {trainingPlanId: TrainingPlanId, raceDate: RaceDate, order: string, locale: KnownLocales }}) {
  const {trainingPlanId, raceDate, order, locale } = params;
  const response = await loadTrainingData({trainingPlanId, raceDate, order: parseInt(order, 10)}, locale);
  return NextResponse.json(response);
}