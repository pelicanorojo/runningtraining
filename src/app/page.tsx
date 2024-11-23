/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-22T10:20:43-03:00
 */


import ConfigBar from '@/components/ui/custom/configBar';
import React from 'react';
export default function Home() {

  return (
    <>
    <ConfigBar/> 
    <div className="flex gap-6 h-[calc(100vh-240px)]">
      No plan and/or race selected yet....
    </div>
    </>
  )
}
