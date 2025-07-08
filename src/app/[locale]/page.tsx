/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-04T11:54:35-03:00
 */


import { useTranslations} from 'next-intl';

import ConfigBar from '@/components/ui/custom/configBar';
import { trainingPlansAvailableFront } from "@/lib/constants";

import { KnownLocales } from '@/types/global';

export default function HomePage({params: {locale}}: {params: {locale: KnownLocales}}) {
  const t = useTranslations('commons');

  return (
    <>
     <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale as KnownLocales]} />
    <div className="flex gap-6 h-[calc(100vh-240px)]">
      {t('rootPageMessage')}
    </div>
    </>
  )
}
