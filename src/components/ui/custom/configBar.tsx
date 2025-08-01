/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-22T10:12:07-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-30T10:45:01-03:00
 */

'use client'

import {  useEffect, useRef } from 'react';
import { useSession } from "next-auth/react";

import { useRouter } from '@/i18n/routing';
import { useTranslations} from 'next-intl';

import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Star, Settings, MoveRightIcon } from 'lucide-react';

import { PlanConfig, TrainingPlanThinFrontList, uTrainingPlanId, uRaceDate, PlanDataParams, isValidRaceDate, isValidTrainingPlanId } from "@/types/global";
import paths from '@/lib/paths';

import PlanSelector from '@/components/ui/custom/planSelector';

import RaceDateSelector from '@/components/ui/custom/raceDateSelector';

import LanguageSwitcher from '@/components/ui/custom/languageSwitcher';

import { useAppStore } from '@/stores/useAppStore';



function isValidRouteData (availablePlans: TrainingPlanThinFrontList, {trainingPlanId, raceDate}: PlanConfig) {
  const selectedPlanOk = isValidTrainingPlanId(trainingPlanId);
  const selectedRaceDateOk = isValidRaceDate(raceDate);
  return selectedPlanOk && selectedRaceDateOk
}

interface FavoriteDialogProps {
  disabled: boolean;
  isFavorite: boolean;
  favoriteIconStyle: {opacity: number; color: string; cursor: string};
  trainingLabel: string;
  raceDate: uRaceDate;  
  t: (x: string) => string;
  dispatch: () => void;
};


const FavoriteDialog = ({disabled, isFavorite, favoriteIconStyle, trainingLabel, raceDate, t, dispatch}: FavoriteDialogProps) => {
  const tc = useTranslations('commons');
  const favoriteDistpatch = () => (
    dispatch()
  )
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button disabled={disabled} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Favorite Popup">
          <Star className="h-5 w-5" fill={isFavorite? 'orange' : 'white'} style={favoriteIconStyle}/>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogDescription>{t("favoriteDescription")}</DialogDescription>
        <DialogHeader>
          <DialogTitle>{t(isFavorite ? 'unsetFavoriteTitle' : 'setFavoriteTitle')}</DialogTitle>
        </DialogHeader>
        <div className='flex-1 flex flex-col'>
          <div className="flex-1 text-sm">
          {`${t('planLabel')}: ${trainingLabel}`}    
          </div>
          <div className="flex-1 text-sm">
          {`${t('raceDateLabel')}: (${raceDate})`}
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 place-content-between">
          <DialogClose asChild>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Favorite Cancel">{tc('btnCancel')}</button>
          </DialogClose>
          <DialogClose asChild>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Favorite Acept" onClick={favoriteDistpatch}>{tc('btnAcept')}</button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ConfigDialogProps {
  trainingPlansAvailable: TrainingPlanThinFrontList;
  trainingPlanId: uTrainingPlanId;
  raceDate: uRaceDate;
  t: (x: string) => string;
};

const ConfigDialog = ({trainingPlansAvailable, trainingPlanId, raceDate, t}: ConfigDialogProps) => {
    return (<Dialog>
    <DialogTrigger asChild>
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Config Popup">
        <Settings className="h-5 w-5" />
      </button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogDescription>{t('selectorDescription')}</DialogDescription>
      <DialogHeader>
        <DialogTitle>{t('selectorTitle')}</DialogTitle>
      </DialogHeader>
      <LanguageSwitcher/>
      <div className="flex flex-row items-center gap-2 place-content-between">
        <h3>{t('planLabel')}: </h3>
        <PlanSelector availablePlans={trainingPlansAvailable} selectedPlanId={trainingPlanId} placeHolder={t('planPlaceHolder')}/>
      </div>
      <div className="flex flex-row items-center gap-2 place-content-between">
      <h3>{t('raceDateLabel')}: </h3>
      <RaceDateSelector raceDate={raceDate} />
      </div>
    </DialogContent>
  </Dialog>);
}


interface ConfigBarProps {
  trainingPlansAvailable: TrainingPlanThinFrontList;
  origTrainingPlanId?: uTrainingPlanId;
  origRaceDate?: uRaceDate;
};

export default function ConfigBar({trainingPlansAvailable, origTrainingPlanId, origRaceDate}: ConfigBarProps) {
  const initialized = useAppStore((s) => s.initialized);
  const init = useAppStore((s) => s.init);

  useEffect(() => {
    if (initialized) return;

    // Initialize the store with the original values if they are provided
    init({
      trainingPlanId: origTrainingPlanId,
      raceDate: origRaceDate,
    });
  }, [initialized, origTrainingPlanId, origRaceDate, init]);

  const trainingPlanId = useAppStore(s => s.trainingPlanId);
  
  const raceDate = useAppStore(s => s.raceDate);

  const favoriteTrainingPlanId = useAppStore((s) => s.favoriteTrainingPlanId);
  const favoriteRaceDate = useAppStore((s) => s.favoriteRaceDate);
  
  const router = useRouter();

  const prevTrainingPlanId = useRef(trainingPlanId);
  const prevRaceDate = useRef(raceDate);

  const session = useSession();

  const setFavoriteAction = useAppStore((s) => s.setFavoriteAction);
  const clearFavorite = useAppStore((s) => s.clearFavoriteAction);
  const loadFavorites = useAppStore((s) => s.loadFavoritesAction);
  
  useEffect(() => {
    if (session.status === 'authenticated' && !useAppStore.getState().initializedFavorites) {
      loadFavorites(session.data?.user?.id as string);
    }
  }, [session.status, session.data, loadFavorites]);

  const trainingLabel = trainingPlansAvailable.find( t => t.id === trainingPlanId)?.label;

  const favoriteIsEnabled = !!(session.status === 'authenticated' && trainingPlanId && raceDate);

  const favoriteIconStyle = {
    opacity: favoriteIsEnabled ? 1 : 0.5 ,
    color: favoriteIsEnabled ?  'currentColor': '#888', // or your desired color
    cursor: favoriteIsEnabled ? 'pointer' : 'not-allowed',
  };

  const isFavorite = favoriteIsEnabled  &&
    trainingPlanId === favoriteTrainingPlanId && raceDate === favoriteRaceDate;

  useEffect(() => {

    if (!initialized) {
      prevTrainingPlanId.current = origTrainingPlanId;
      prevRaceDate.current = origRaceDate;
    }
  }, [initialized, origTrainingPlanId, , origRaceDate])


  useEffect(() => {
    if (!initialized) {return;}

    if (
      prevTrainingPlanId.current !== trainingPlanId ||
      prevRaceDate.current !== raceDate
    ) {
      if (isValidRouteData(trainingPlansAvailable, { trainingPlanId, raceDate} as PlanConfig)) {
        router.push(paths.trainingPlanShow({ trainingPlanId, raceDate} as PlanDataParams));
      }
    }
  }, [initialized, trainingPlanId, raceDate, router, trainingPlansAvailable])

  const t = useTranslations('configBar');
  
  const userId = session.data?.user?.id;

  const dispatchSetFavorite = async () => {
    if (!trainingPlanId || !raceDate) return;
    await setFavoriteAction(userId as string, trainingPlanId , raceDate as string);
  };

  const dispatchClearFavorite = async () => {
    await clearFavorite(userId as string);
  };

  const dispatchFavorite = isFavorite ? dispatchClearFavorite : dispatchSetFavorite

  return (
    <div className="container w-full">
      <div className="flex flex-row items-center gap-6 p-4 bg-background border-b">
        <FavoriteDialog disabled={!favoriteIsEnabled} isFavorite={isFavorite} favoriteIconStyle={favoriteIconStyle} trainingLabel={trainingLabel as string} raceDate={raceDate} t={t} dispatch={dispatchFavorite}/>
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
          raceDate
            ? `${t('raceDateLabel')}: (${raceDate})`
            : <>{t('raceDateLabel')}: ( {t('unSelectedRaceDateValue')} <MoveRightIcon className="inline-block h-4 w-4"/>)</>
          }
          </div>
        </div>
        <ConfigDialog  trainingPlansAvailable={trainingPlansAvailable} trainingPlanId={trainingPlanId} raceDate={raceDate} t={t} />
      </div>
    </div>
  );
}
