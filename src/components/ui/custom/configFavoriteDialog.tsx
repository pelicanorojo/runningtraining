/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-22T10:12:07-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-08-05T10:20:00-03:00
 */

'use client'

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

import { Star } from 'lucide-react';

import { uRaceDate } from "@/types/global";
import { Button } from '../button';



interface FavoriteDialogProps {
  disabled: boolean;
  isFavorite: boolean;
  favoriteIconStyle: {opacity: number; color: string; cursor: string};
  trainingLabel: string;
  raceDate: uRaceDate;  
  dispatch: () => void;
};


export default function FavoriteDialog({disabled, isFavorite, favoriteIconStyle, trainingLabel, raceDate, dispatch}: FavoriteDialogProps) {
  const t = useTranslations('configBar');
  const tc = useTranslations('commons');
  const favoriteDistpatch = () => (
    dispatch()
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled}  aria-label={t('favoriteDescription')} variant="outline" size="icon" >
          <Star className="h-5 w-5" fill={isFavorite? 'orange' : 'white'} style={favoriteIconStyle}/>
        </Button>
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
            <Button aria-label={tc('btnCancel')} variant="default">{tc('btnCancel')}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button aria-label={tc('btnAcept')} variant="default" onClick={favoriteDistpatch}>{tc('btnAcept')}</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
