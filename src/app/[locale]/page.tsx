/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-07T08:53:38-03:00
 */


import { useTranslations} from 'next-intl';

import ConfigBar from '@/components/ui/custom/configBar';
import { initialState } from '@/reducers/configReducer';
import { trainingPlansAvailableFront } from "@/lib/constants";

import React from 'react';
import { KnownLocales } from '@/types/global';

export default function HomePage({params: {locale}}: {params: {locale: KnownLocales}}) {
  const t = useTranslations('commons');

  return (
    <>
     <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale as KnownLocales]} initialState={initialState}/>
    <div className="flex gap-6 h-[calc(100vh-240px)]">
      {t('rootPageMessage')}
    </div>
    </>
  )
}
