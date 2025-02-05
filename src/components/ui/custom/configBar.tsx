/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-22T10:12:07-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-05T01:31:59-03:00
 */

'use client'

import { useReducer, useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations} from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Settings, MoveRightIcon } from 'lucide-react';

import { trainingPlansAvailableFront } from '@/lib/constants';
import { PlanConfig, TrainingPlanThinFrontList } from "@/types/global";
import { configReducer } from '@/reducers/configReducer';
import paths from '@/lib/paths';

import PlanSelector from '@/components/ui/custom/planSelector';
import RaceDateSelector from '@/components/ui/custom/raceDateSelector';



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
  initialState: PlanConfig;
};

//function ClientConfigBar({trainingPlansAvailable, initialState}: ConfigBarProps) {
export default function ConfigBar({trainingPlansAvailable, initialState}: ConfigBarProps) {
    const [state, dispatch] = useReducer(configReducer, initialState);
  const router = useRouter();
  const prevState = useRef(initialState);

  const trainingLabel = trainingPlansAvailableFront.find( t => t.id === state.trainingPlanId)?.label;

  useEffect(() => {
    if (prevState.current.trainingPlanId !== state.trainingPlanId || prevState.current.raceDate !== state.raceDate) {
      if (isValidRouteData(trainingPlansAvailable, state)) {
        router.push(paths.trainingPlanShow(state as {trainingPlanId: string; raceDate:string}))
      }
    }
  }, [state, router, trainingPlansAvailable])

  const t = useTranslations('configBar');

  return (

    <div className="container w-full">
      {/*<div className="flex flex-row gap-6 items-center"><div className="flex items-center justify-between p-4 bg-background border-b">*/}
      <div className="flex flex-row items-center gap-6 p-4 bg-background border-b">
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
        <Dialog>
          <DialogTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogDescription>{t('selectorDescription')}</DialogDescription>
            <DialogHeader>
              <DialogTitle>{t('selectorTitle')}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-row items-center gap-2 place-content-between">
              <h3>{t('planLabel')}: </h3>
              <PlanSelector availablePlans={trainingPlansAvailable} selectedPlanId={state.trainingPlanId} dispatch={dispatch} placeHolder={t('planPlaceHolder')}/>
            </div>
            <div className="flex flex-row items-center gap-2 place-content-between">
            <h3>{t('raceDateLabel')}: </h3>
            <RaceDateSelector raceDate={state.raceDate} dispatch={dispatch} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

/* Finally worked without this wrapping :)
export default function ConfigBar({trainingPlansAvailable, initialState}: ConfigBarProps) {
  // Receive messages provided in `i18n/request.ts` …
  const messages = useMessages();
  const locale = useLocale();
 
  return (
    <NextIntlClientProvider
      messages={messages.configBar}
      locale={locale}
    >
      <ClientConfigBar trainingPlansAvailable={trainingPlansAvailable} initialState={initialState}/>
    </NextIntlClientProvider>
  );
}
*/