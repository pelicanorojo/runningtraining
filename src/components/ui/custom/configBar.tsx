/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-22T10:12:07-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-08-05T07:34:35-03:00
 */

'use client'

import { useEffect } from 'react';
import { useSession } from "next-auth/react";

import { useRouter } from '@/i18n/routing';
import { useTranslations} from 'next-intl';


import { MoveRightIcon } from 'lucide-react';

import { PlanConfig, TrainingPlanThinFrontList, uTrainingPlanId, uRaceDate, PlanDataParams, isValidRaceDate, isValidTrainingPlanId, TrainingPlanId } from "@/types/global";
import paths from '@/lib/paths';

import ConfigDialog from '@/components/ui/custom/configDialog';
import FavoriteDialog from '@/components/ui/custom/configFavoriteDialog';

import { useAppStore } from '@/stores/useAppStore';
import { Button } from '../button';



function isValidRouteData (availablePlans: TrainingPlanThinFrontList, {trainingPlanId, raceDate}: PlanConfig) {
  const selectedPlanOk = isValidTrainingPlanId(trainingPlanId);
  const selectedRaceDateOk = isValidRaceDate(raceDate);
  return selectedPlanOk && selectedRaceDateOk
}

interface ConfigBarProps {
  trainingPlansAvailable: TrainingPlanThinFrontList;
  origTrainingPlanId?: uTrainingPlanId;
  origRaceDate?: uRaceDate;
};

export default function ConfigBar({trainingPlansAvailable, origTrainingPlanId, origRaceDate}: ConfigBarProps) { // Clean plan and date
  const favoriteTrainingPlanId = useAppStore((s) => s.favoriteTrainingPlanId);
  const favoriteRaceDate = useAppStore((s) => s.favoriteRaceDate);
  
  const router = useRouter();

  const session = useSession();
  
  const userId = session.data?.user?.id;
  const userAuthenticated = session.status === 'authenticated';

  const setFavoriteAction = useAppStore((s) => s.setFavoriteAction);
  const clearFavorite = useAppStore((s) => s.clearFavoriteAction);
  const loadFavorites = useAppStore((s) => s.loadFavoritesAction);
  
  useEffect(() => {
    if (userAuthenticated) {
      if (!userId) return;
      loadFavorites(userId);
    }
  }, [ userAuthenticated, userId, loadFavorites]);

  const trainingLabel = trainingPlansAvailable.find( t => t.id === origTrainingPlanId)?.label;

  const changeFavoriteIsEnabled = !!(userAuthenticated && origTrainingPlanId && origRaceDate);

  const favoriteIconStyle = {
    opacity: changeFavoriteIsEnabled ? 1 : 0.5 ,
    color: changeFavoriteIsEnabled ?  'currentColor': '#888', // or your desired color
    cursor: changeFavoriteIsEnabled ? 'pointer' : 'not-allowed',
  };

  const isFavorite = changeFavoriteIsEnabled  &&
    origTrainingPlanId === favoriteTrainingPlanId && origRaceDate === favoriteRaceDate;

  const  useFavoritesEnabled = !!(userAuthenticated && favoriteTrainingPlanId && favoriteRaceDate);
  
  const loadNewPlanData = (planConfig: PlanConfig) => {
    if (isValidRouteData(trainingPlansAvailable, planConfig)) {
      router.push(paths.trainingPlanShow(planConfig as PlanDataParams));
    }
  }

  const onLoadFavorites = () => {
    if (!favoriteTrainingPlanId || !favoriteRaceDate) return;
    loadNewPlanData({
      trainingPlanId: favoriteTrainingPlanId,
      raceDate: favoriteRaceDate
    });
  }

  const t = useTranslations('configBar');
  

  const dispatchSetFavorite = async () => {
    if (!origTrainingPlanId || !origRaceDate) return;
    await setFavoriteAction(userId as string, origTrainingPlanId as TrainingPlanId, origRaceDate as string);
  };

  const dispatchClearFavorite = async () => {
    await clearFavorite(userId as string);
  };

  const dispatchFavorite = isFavorite ? dispatchClearFavorite : dispatchSetFavorite;

  return (
    <div className="container w-full">
      <div className="flex flex-row items-center gap-6 p-4 bg-background border-b">
        <FavoriteDialog disabled={!changeFavoriteIsEnabled} isFavorite={isFavorite} favoriteIconStyle={favoriteIconStyle} trainingLabel={trainingLabel as string} raceDate={origRaceDate} dispatch={dispatchFavorite}/>
        <div className='flex-1 flex flex-col'>
          <div className="flex-1 text-sm">
          {
          trainingLabel
            ? `${t('planLabel')}: ${trainingLabel}`
            : <>{t('planLabel')}: {t('unSelectedPlanValue')} <MoveRightIcon className="inline-block h-4 w-4"/></>
          }
          </div>
          <div className="flex-1 text-sm">
          {
          origRaceDate
            ? `${t('raceDateLabel')}: (${origRaceDate})`
            : <>{t('raceDateLabel')}: ( {t('unSelectedRaceDateValue')} <MoveRightIcon className="inline-block h-4 w-4"/>)</>
          }
          </div>
        </div>
        <Button disabled={!useFavoritesEnabled}
            aria-label={t('goToFavorites')}
            onClick={onLoadFavorites} >        
           {t('goToFavorites')}
        </Button>
        <ConfigDialog  trainingPlansAvailable={trainingPlansAvailable} trainingPlanId={origTrainingPlanId} raceDate={origRaceDate} useFavoritesEnabled={useFavoritesEnabled} loadNewPlanData={loadNewPlanData} />
      </div>
    </div>
  );
}
