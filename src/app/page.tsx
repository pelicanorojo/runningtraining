/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-25T01:31:34-03:00
 */


import ConfigBar from '@/components/ui/custom/configBar';
import { initialState } from '@/reducers/configReducer';
import React from 'react';
export default function HomePage() {

  return (
    <>
    <ConfigBar initialState={initialState}/>
    <div className="flex gap-6 h-[calc(100vh-240px)]">
      No plan and/or race selected yet....
    </div>
    </>
  )
}
