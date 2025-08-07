/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-22T10:12:07-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-08-06T09:18:16-03:00
 */

'use client'

import { useState } from 'react';
import { useTranslations} from 'next-intl';

import {  
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {  Settings } from 'lucide-react';

import { PlanConfig, TrainingPlanThinFrontList, uTrainingPlanId, uRaceDate } from "@/types/global";

import PlanSelector from '@/components/ui/custom/planSelector';

import RaceDateSelector from '@/components/ui/custom/raceDateSelector';

import LanguageSwitcher from '@/components/ui/custom/languageSwitcher';

import { useAppStore } from '@/stores/useAppStore';
import { Button } from '../button';


interface ConfigDialogProps {
  trainingPlansAvailable: TrainingPlanThinFrontList;
  trainingPlanId: uTrainingPlanId;
  raceDate: uRaceDate;
  useFavoritesEnabled: boolean;
  loadNewPlanData: (planConfig: PlanConfig) => void;
};

export default function ConfigDialog ({trainingPlansAvailable, trainingPlanId, raceDate, useFavoritesEnabled, loadNewPlanData}: ConfigDialogProps)  {
  const [open, setOpen] = useState(false);
  const t = useTranslations('configBar');
  const tc = useTranslations('commons');

  const favoriteTrainingPlanId = useAppStore((s) => s.favoriteTrainingPlanId);
  const favoriteRaceDate = useAppStore((s) => s.favoriteRaceDate);

  const origTrainingData = { trainingPlanId, raceDate };

  const [planConfig, setPlanConfig] = useState<PlanConfig>(origTrainingData);

 
  const onChangePlan = (value: uTrainingPlanId) => {
    setPlanConfig( s => ({...s, trainingPlanId: value })); 
  };

  const onChangeDate = (value: uRaceDate) => {
    setPlanConfig( s => ({...s, raceDate: value  })); 
  };
  
  const onUseFavorites = () => {
    setPlanConfig({
      trainingPlanId: favoriteTrainingPlanId,
      raceDate: favoriteRaceDate
    });
  };

  const onCancel = () => {
    setPlanConfig(origTrainingData);
    setOpen(false);
  };

  const onAccept = () => {
    setOpen(false);
    loadNewPlanData(planConfig);
  }


return (<Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button aria-label={t('selectorTitle')} variant="default" size="icon">
        <Settings className="h-5 w-5" />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogDescription>{t('selectorDescription')}</DialogDescription>
      <DialogHeader>
        <DialogTitle>{t('selectorTitle')}</DialogTitle>
      </DialogHeader>
      <LanguageSwitcher/>
      <div className="flex flex-row items-end gap-2 place-content-between">
        <Button 
        aria-label={t('useFavoriteLabel')}
            onClick={onUseFavorites} disabled={!useFavoritesEnabled}>        
           {t('useFavoriteLabel')}
        </Button>
      </div>
      <div className="flex flex-row items-center gap-2 place-content-between">
        <h3>{t('planLabel')}: </h3>
       {<PlanSelector availablePlans={trainingPlansAvailable} selectedPlanId={planConfig.trainingPlanId} placeHolder={t('planPlaceHolder')} onChangePlan={onChangePlan}/>}
      </div>
      <div className="flex flex-row items-center gap-2 place-content-between">
      <h3>{t('raceDateLabel')}: </h3>
      <RaceDateSelector raceDate={planConfig.raceDate} onChangeDate={onChangeDate}/>
      </div>
      <div className='flex flex-row items-center gap-2 place-content-between'>
        <Button aria-label={tc('btnCancel')} variant="default" onClick={onCancel}>{tc('btnCancel')}</Button>
        <Button aria-label={tc('btnAcept')}  variant="default" onClick={onAccept}>{tc('btnAcept')}</Button>
      </div>
    </DialogContent>
  </Dialog>);  
}
