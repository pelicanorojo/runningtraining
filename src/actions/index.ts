/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2025-07-08T10:10:38-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-31T11:50:03-03:00
 */

"use server";

import { prisma as db } from "@/prisma"; 
import { isValidTrainingPlanId, parseTrainingPlanId, RaceDate, TrainingPlanId } from "@/types/global";
import { constructDbTrainingPlanId } from "@/lib/helpers";

export async function setFavorites (data: {userId: string, raceDate: RaceDate, trainingPlanId: TrainingPlanId   }) {

  const parsedId = parseTrainingPlanId(data.trainingPlanId);

  if (!parsedId || !isValidTrainingPlanId(parsedId)) {
    return {
      errors: {
        _form: [`Invalid training plan ID: "${data.trainingPlanId}"`],
      }
    };
  }
  try {
    await db.user.update({
      where: {id: data.userId},
      data: {
        raceDate: data.raceDate,     
        trainingPlan: constructDbTrainingPlanId(parsedId as TrainingPlanId)
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

export async function clearFavorites (data: {userId: string}) {
  try {
    await db.user.update({
      where: {id: data.userId},
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

export async function loadFavorites(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        raceDate: true,
        trainingPlan: true,
      },
    });

    if (!user) {
      return { raceDate: undefined, trainingPlanId: undefined };
    }
    
    const parsedId = parseTrainingPlanId(user.trainingPlan as string);
    
    return {
      raceDate: user.raceDate ?? undefined,
      trainingPlanId: parsedId && isValidTrainingPlanId(parsedId) ? parsedId : undefined,
    };
  } catch {
    return {
      raceDate: undefined,
      trainingPlanId: undefined,
    };
  }
}
