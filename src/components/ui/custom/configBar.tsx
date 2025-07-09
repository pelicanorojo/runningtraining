/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-22T10:12:07-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-07T08:48:56-03:00
 */

'use client'

import { useEffect, useRef } from 'react';
import { setFavorite, unsetFavorite } from '@/actions';
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

import { PlanConfig, TrainingPlanThinFrontList, TrainingPlanId, RaceDate } from "@/types/global";
import paths from '@/lib/paths';

import PlanSelector from '@/components/ui/custom/planSelector';

import RaceDateSelector from '@/components/ui/custom/raceDateSelector';

import LanguageSwitcher from '@/components/ui/custom/languageSwitcher';

import { useConfig, useConfigDispatch } from '@/contexts/config';


function isValidDate(dateString: string | undefined): boolean {
  // is defined?
  let valid = typeof dateString !== 'undefined';
  if (!valid) return valid;

  // is well formatted?
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  valid = dateRegex.test(dateString as string)
  if (!valid) return valid;

  // is a valid date?
  const date = new Date(dateString as string);
  valid = !isNaN(date.getTime());

  return valid;
}

function isValidRouteData (availablePlans: TrainingPlanThinFrontList, {trainingPlanId, raceDate}: PlanConfig) {
  const selectedPlanOk = availablePlans.filter( p => p.id === trainingPlanId).length === 1;
  const selectedRaceDateOk = isValidDate(raceDate);
  return selectedPlanOk && selectedRaceDateOk
}

interface ConfigBarProps {
  trainingPlansAvailable: TrainingPlanThinFrontList;
};


interface FavoriteDialogProps {
  disabled: boolean;
  isFavorite: boolean;
  favoriteIconStyle: {opacity: number; color: string; cursor: string};
  trainingLabel: string;
  raceDate: string;  
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
  trainingPlanId: TrainingPlanId | undefined;
  raceDate: RaceDate | undefined;
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

export default function ConfigBar({trainingPlansAvailable}: ConfigBarProps) {
  const state = useConfig();
  const dispatch = useConfigDispatch()
  const router = useRouter();
  const prevState = useRef(state);
  const session = useSession();


  const trainingLabel = trainingPlansAvailable.find( t => t.id === state.trainingPlanId)?.label;

  const favoriteIsEnabled = session?.status === 'authenticated' && state.trainingPlanId && state.raceDate;

  const favoriteIconStyle = {
    opacity: favoriteIsEnabled ? 1 : 0.5 ,
    color: favoriteIsEnabled ?  'currentColor': '#888', // or your desired color
    cursor: favoriteIsEnabled ? 'pointer' : 'not-allowed',
  };

  const isFavorite = !!(favoriteIsEnabled  &&
    state.trainingPlanId === state.favoriteTrainingPlanId && state.raceDate === state.favoriteRaceDate);

  useEffect(() => {
    if (prevState.current.trainingPlanId !== state.trainingPlanId || prevState.current.raceDate !== state.raceDate) {
      if (isValidRouteData(trainingPlansAvailable, state)) {
        router.push(paths.trainingPlanShow(state as {trainingPlanId: TrainingPlanId; raceDate: string}))
      }
    }
  }, [state, router, trainingPlansAvailable])

  const t = useTranslations('configBar');
  
  const userId = session.data?.user?.id;

  const dispatchSetFavorite = async () => {
    await setFavorite({userId: userId as string, raceDate: state.raceDate as string, trainingPlanId: state.trainingPlanId as string});
    return dispatch({type: 'SET_FAVORITE', payload: {trainingPlanId: state.trainingPlanId, raceDate: state.raceDate}});
  };

  const dispatchUnsetFavorite = async () => {
    await unsetFavorite({userId: userId as string, raceDate: state.raceDate as string, trainingPlanId: state.trainingPlanId as string});
    return dispatch({type: 'UNSET_FAVORITE', payload: null});
  };

  const dispatchFavorite = isFavorite ? dispatchUnsetFavorite : dispatchSetFavorite

  return (
    <div className="container w-full">
      <div className="flex flex-row items-center gap-6 p-4 bg-background border-b">
        <FavoriteDialog disabled={!favoriteIsEnabled} isFavorite={isFavorite} favoriteIconStyle={favoriteIconStyle} trainingLabel={trainingLabel as string} raceDate={state.raceDate as string} t={t} dispatch={dispatchFavorite}/>
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
          state.raceDate
            ? `${t('raceDateLabel')}: (${state.raceDate})`
            : <>{t('raceDateLabel')}: ( {t('unSelectedRaceDateValue')} <MoveRightIcon className="inline-block h-4 w-4"/>)</>
          }
          </div>
        </div>
        <ConfigDialog  trainingPlansAvailable={trainingPlansAvailable} trainingPlanId={state.trainingPlanId} raceDate={state.raceDate} t={t} />
      </div>
    </div>
  );
}
