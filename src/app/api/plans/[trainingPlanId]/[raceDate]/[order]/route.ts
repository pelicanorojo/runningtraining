import { NextRequest, NextResponse } from 'next/server';
import { loadTrainingData } from '@/lib/loaders';

// /api/plans/[trainingPlanId]/[raceDate]/[order].js
export async function GET(request: NextRequest, { params } : {params: {trainingPlanId: string, raceDate: string, order: string }}) {
  const {trainingPlanId, raceDate, order } = params;
  const response = await loadTrainingData({trainingPlanId, raceDate, order: parseInt(order, 10) });
  return NextResponse.json(response);
}