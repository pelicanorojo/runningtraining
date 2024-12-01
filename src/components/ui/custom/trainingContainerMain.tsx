/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-27T10:39:18-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-01T12:24:07-03:00
 */


import { CardContent } from "@/components/ui/card";
import { TrainingData, Zone, Interval } from "@/types/global";



/* all this stuf for use neares tailwind basis- cant be used, cause the srips don't looks proportional.
//----------------- for helpers and constants:
const availableSufixesOrdered = [0,1,2,3,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32,36,40,44,48,52,56,60,64,72,80,96];
const maxAvailableSufix = Math.max(...availableSufixesOrdered);
const findNearestValue = (arr: number[], target: number): number => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return arr[mid];
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // If the target value is not found, return the nearest value
  return arr[left] - target < target - arr[right] ? arr[left] : arr[right];
}

const findNearesSufix = (
  ( availableSufixes: number[] ) => {
    return ( desiredSufix: number ) => findNearestValue(availableSufixes, desiredSufix);
  }
)(availableSufixesOrdered);

const addBasisClassSufixed = (className: string, basisSufix: number):string => `${className} basis-${basisSufix}`;
*/
// next specialized helpers and Strip component are exported only for testing purpuse, actually shouldnt be published.
export const seconds2Minutes = (s: number ): number => Math.round(s / 60);

export const stripTitleBuilder = (zone: Zone, secondsInZone: number): string => {
  return `${( secondsInZone < 60 ) ? `${secondsInZone} seconds`: `${seconds2Minutes(secondsInZone)} minutes`} in zone ${zone}.`;
}

export const stripLabelBuilder = (secondsInZone: number): string => {
  return `${( secondsInZone < 60 ) ? `${secondsInZone} s`: `${seconds2Minutes(secondsInZone)} m`}`;
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
