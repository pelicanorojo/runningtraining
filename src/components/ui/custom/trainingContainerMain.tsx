/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-27T10:39:18-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-12T12:22:40-03:00
 */


import { CardContent } from "@/components/ui/card";
import { TrainingData, Zone, Interval } from "@/types/global";


// next specialized helpers and Strip component are exported only for testing purpose, actually shouldnt be published.
export const seconds2Minutes = (s: number ): number => Math.round(s / 60);
export const seconds2TimeComponents = (_s: number): {h: number, m: number, s: number} => {
  let s = _s;

  const h = s < 3600 ? 0 : Math.trunc(s / 3600);
  s-= h * 3600;

  const m = s < 60 ? 0 : Math.trunc(s / 60) ;
  s-= m * 60;
  return {h, m, s};
}

export const stripTitleBuilder = (zone: Zone, secondsInZone: number): string => {
  //return `${( secondsInZone < 60 ) ? `${secondsInZone} seconds`: `${seconds2Minutes(secondsInZone)} minutes`} in zone ${zone}.`;
  const tm = seconds2TimeComponents(secondsInZone);
  const t: string[] = [];
  if (tm.h) { t.push(`${tm.h} hours`)}
  if (tm.m) { t.push(`${tm.m} minutes`)}
  if (tm.s) { t.push(`${tm.s} seconds`)};
 return `${t.join(' ')} in zone ${zone}.`;
}

export const stripLabelBuilder = (secondsInZone: number): string => {
  //return `${( secondsInZone < 60 ) ? `${secondsInZone} s`: `${seconds2Minutes(secondsInZone)} m`}`;
  const tm = seconds2TimeComponents(secondsInZone);
  let t = '';
  t += tm.h ? `${tm.h}h` : '';
  t += tm.m ? `${tm.m}m` : '';
  t += tm.s ? `${tm.s}s` : '';
  return t;
}

export const  zoneToColorClassMap = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-400',
  red: 'bg-red-400'
}

export const zoneToMarginsMap = {
  blue: 'mt-36',
  green: 'mt-24',
  yellow: 'mt-12',
  red: 'mt-0'
}

export const getStripCsslWidth = (secondsInZone: number, totalTime: number) => `${100 * secondsInZone / totalTime}%`;

interface StripProps {
  zone: Zone;
  secondsInZone: number;
  totalTime: number;
}

export const Strip = ({zone, secondsInZone, totalTime}: StripProps) => {
  // const basisSufix = findNearesSufix( maxAvailableSufix * secondsInZone/maxZone );
  const title = stripTitleBuilder(zone, secondsInZone);
  const label = stripLabelBuilder(secondsInZone);

  return (
    <div role="stripContainer" className="h-full flex flex-col" style={{ width: getStripCsslWidth(secondsInZone, totalTime) }}>
      <div role="strip" className={`${zoneToColorClassMap[zone]} h-1/4 p-1 ${zoneToMarginsMap[zone]}`} title={title}>{label}</div>
    </div>
  )
}

//-----------------
interface TrainingContainerMainProps {
  trainingData: TrainingData;
}

export default function TrainingContainerMain({ trainingData }: TrainingContainerMainProps) {

  return (
    <CardContent className="grow">
      <div className={`flex grow-0 h-48`}>
        {trainingData.intervals.map( (i: Interval, ind: number) => <Strip key={ind} zone={i.zone} secondsInZone={i.totalTimeInZone}  totalTime={trainingData.recommendedTime}/>)}
      </div>
    </CardContent>
  );
}
/*
  Issues found: some tailwind classes looks as not defined, for instance bg-yellow-500.
  handling widths with basis-number, didn't worked  showing the width selected. So worked around with the style width %
*/
