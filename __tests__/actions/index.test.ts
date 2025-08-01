/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2025-07-31T11:12:45-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-08-01T01:06:23-03:00
 */

import * as actions from '@/actions/index';
import * as helpers from '@/types/global';

// Mock Prisma client and utility functions
jest.mock('@/prisma', () => ({
  prisma: {
    user: {
      update: jest.fn(() => Promise.resolve({})),
      findUnique: jest.fn(() => Promise.resolve({})),
    },
  },
}));


jest.mock('@/types/global', () => {
  const actualHelpers = jest.requireActual('@/types/global');

  return {
    ...actualHelpers,
    isValidTrainingPlanId: jest.fn((...args) => actualHelpers.isValidTrainingPlanId(...args))
  };
}); 

import  { prisma } from '@/prisma';
import type { TrainingPlanId, KnownLocales, TrainingPlanThinFront } from '@/types/global';

import { trainingPlansAvailableFront } from "@/lib/constants";
import { constructDbTrainingPlanId } from '@/lib/helpers';

const locale :KnownLocales = 'en';
const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[locale][1];
const aRaceDate = '2025-12-31';

describe('Testing actions/index', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('setFavorites', () => {

    it('Should updates user with valid planId', async () => {
      await actions.setFavorites({ userId: 'u1', raceDate: aRaceDate, trainingPlanId: aTrainingPlan.id });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'u1' },
        data: { raceDate: aRaceDate, trainingPlan: constructDbTrainingPlanId(aTrainingPlan.id) },
      });
    });

    it('Should return error for invalid planId', async () => {      
      // Use a definitely invalid planId
      const result = await actions.setFavorites({ userId: 'u1', raceDate: aRaceDate, trainingPlanId: 'bad' as TrainingPlanId });

      expect(result!.errors._form[0]).toMatch(/Invalid training plan ID/);
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it('Should return error on db failure', async () => {
      (prisma.user.update as jest.Mock).mockImplementation(() => Promise.reject(new Error('fail')));

      const result = await actions.setFavorites({ userId: 'u1', raceDate: aRaceDate, trainingPlanId: aTrainingPlan.id });

      expect(result!.errors._form[0]).toBe('fail');
    });
  });

  describe('clearFavorites', () => {

    it('Should clears user favorite', async () => {
      await actions.clearFavorites({ userId: 'u1' });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'u1' },
        data: { raceDate: null, trainingPlan: null },
      });
    });

    it('Should return error on db failure', async () => {
      (prisma.user.update as jest.Mock).mockImplementation(() => Promise.reject(new Error('fail')));

      const result = await actions.clearFavorites({ userId: 'u1' });

      expect(result!.errors._form[0]).toBe('fail');
    });
  });

  describe('loadFavorites', () => {

    it('Should return user favorites if found and valid', async () => {
      (prisma.user.findUnique as jest.Mock).mockImplementation(() => Promise.resolve({ raceDate: aRaceDate, trainingPlan: aTrainingPlan.id }));

      const result = await actions.loadFavorites('u1');

      expect(result).toEqual({ raceDate: aRaceDate, trainingPlanId: aTrainingPlan.id });
    });

    it('Should return undefineds if user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockImplementation(() => Promise.resolve(null));
      const result = await actions.loadFavorites('u1');

      expect(result).toEqual({ raceDate: undefined, trainingPlanId: undefined });
    });

    it('Should return undefineds on db error', async () => {
      (prisma.user.findUnique as jest.Mock).mockImplementation(() => Promise.reject(new Error('fail')));

      const result = await actions.loadFavorites('u1');

      expect(result).toEqual({ raceDate: undefined, trainingPlanId: undefined });
    });

    it('Should return undefined trainingPlanId if invalid', async () => {
      (prisma.user.findUnique as jest.Mock).mockImplementation(() => Promise.resolve({ raceDate: aRaceDate, trainingPlan: 'tp_invalid' }));

      // Spy on isValidTrainingPlanId to force invalid
      ((helpers.isValidTrainingPlanId as unknown) as jest.Mock).mockReturnValue(false);

      const result = await actions.loadFavorites('u1');

      expect(result).toEqual({ raceDate: aRaceDate, trainingPlanId: undefined });
    });
  });
});
