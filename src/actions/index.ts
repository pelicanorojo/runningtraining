"use server";

import { prisma as db } from "@/prisma"; 
import { TrainingPlan } from '@prisma/client';

export async function setFavorite (data: {userId: string, raceDate: string, trainingPlanId: string}) {
  try {
    await db.user.update({
      where: {id: data.userId},
      data: {
        raceDate: data.raceDate,     
        trainingPlan: 'tp_' +  data.trainingPlanId as TrainingPlan
      }
    });
  } catch (err: unknown ) {
    const errMsg = (err instanceof Error)
      ? err.message
      : 'Something went wrong...';
    return {
      errors: {
        _form: [errMsg],
      }
    };
  }
}

export async function unsetFavorite (data: {userId: string, raceDate: string, trainingPlanId: string}) {
  try {
    await db.user.update({
      where: {id: data.userId, raceDate: data.raceDate, trainingPlan: 'tp_' +  data.trainingPlanId as TrainingPlan},
      data: {
        raceDate: null,     
        trainingPlan: null
      }
    });
  } catch (err: unknown ) {
    const errMsg = (err instanceof Error)
      ? err.message
      : 'Something went wrong...';
    return {
      errors: {
        _form: [errMsg],
      }
    };
  }
}

export async function clearFavorite (data: {userId: string, raceDate: string, trainingPlanId: string}) {
  try {
    await db.user.update({
      where: {id: data.userId, raceDate: data.raceDate, trainingPlan: 'tp_' +  data.trainingPlanId as TrainingPlan},
      data: {
        raceDate: null,     
        trainingPlan: null
      }
    });
  } catch (err: unknown ) {
    const errMsg = (err instanceof Error)
      ? err.message
      : 'Something went wrong...';
    return {
      errors: {
        _form: [errMsg],
      }
    };
  }
}
