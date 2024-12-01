/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-30T10:30:09-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-01T12:57:06-03:00
 */

import '@testing-library/jest-dom';
import {  render, screen } from '@testing-library/react';
import  TrainingContainerMain, {
  seconds2Minutes, stripTitleBuilder, stripLabelBuilder, getStripCsslWidth
  , zoneToColorClassMap, zoneToMarginsMap
  , Strip
} from '@/components/ui/custom/trainingContainerMain';

import { Zone } from '@/types/global';
import { aSampleTrainingData } from '@/lib/mockConstants';

//const unSearcheableString = 'unSearcheableString';

describe('seconds2Minutes ...', () => {
  it('Should convert 0 to 30 seconds to 0 minute.', () => {
    expect(seconds2Minutes(0)).toBe(0);
    expect(seconds2Minutes(29)).toBe(0);
  })

  it('Should convert 30 to 89 seconds to 1 minute.', () => {
    expect(seconds2Minutes(30)).toBe(1);
    expect(seconds2Minutes(89)).toBe(1);
  })
});

describe('stripTitleBuilder ...', () => {
  it('Should build well a 59 seconds green zone title.', () => {
    const zone: Zone = 'green'; const seconds = 59;
    const title = stripTitleBuilder(zone, seconds);
    expect(title).toEqual(`59 seconds in zone ${zone}.`);
  })
  
  it('Should build well a 89 seconds green zone title.', () => {
    const zone: Zone = 'green'; const seconds = 89;
    const title = stripTitleBuilder(zone, seconds);
    expect(title).toEqual(`1 minutes in zone ${zone}.`);
  })
});

describe('stripLabelBuilder ...', () => {
  it('Should build well a 59 seconds label.', () => {
    const seconds = 59;
    const label = stripLabelBuilder(seconds);
    expect(label).toEqual('59 s');
  })
  
  it('Should build well a 89 seconds label.', () => {
    const seconds = 89;
    const title = stripLabelBuilder( seconds);
    expect(title).toEqual('1 m');
  })
});

describe('getStripCsslWidth ...', () => {
  it('Should construct well the width css for different strip times and total times.', () => {
    const time = 125; const totalTime = 1800;
    const width = getStripCsslWidth(time, totalTime);
    expect(width).toEqual(`${100 * time / totalTime}%`)
  });
});

describe('Strip ...', () => {
  it('Should the strip container and strip be present.', () => {
    const zone = 'green'; const seconds = 95; const totalTime = 1800;
    render(<Strip zone={zone} secondsInZone={seconds} totalTime={totalTime}/>)

    const theContainer = screen.getByRole('stripContainer');
    const theStrip = screen.getByRole('strip');

    expect(theContainer).toBeInTheDocument();
    expect(theStrip).toBeInTheDocument();
  });

  it('Should have the label inside.', () => {
    const zone = 'green'; const seconds = 95; const totalTime = 1800;
    const label = stripLabelBuilder(seconds);

    render(<Strip zone={zone} secondsInZone={seconds} totalTime={totalTime}/>)

    const theText = screen.getByText(label);
    expect(theText).toBeInTheDocument();
  });
  
  it('Should the strip container have well computing the width.', () => {
    const zone = 'green'; const seconds = 95; const totalTime = 1800;
    const width = getStripCsslWidth(seconds, totalTime);

    render(<Strip zone={zone} secondsInZone={seconds} totalTime={totalTime}/>)

    const theContainer = screen.getByRole('stripContainer');
    expect(theContainer).toHaveStyle({width: width});
  });

  it('Should the srip have applied the css for the zone.', () => {
    const zone = 'green'; const seconds = 95; const totalTime = 1800;
    const label = stripLabelBuilder(seconds);
    const colorCssClass = zoneToColorClassMap[zone];
    const marginCssClass = zoneToMarginsMap[zone];

    render(<Strip zone={zone} secondsInZone={seconds} totalTime={totalTime}/>)

    const theText = screen.getByText(label);

    expect(theText).toHaveClass(colorCssClass);
    expect(theText).toHaveClass(marginCssClass);
  });
});

describe('TrainingContainerMain ...', () => {
  it('Should have inside all the srip as intervals in the training.', () => {
    const intervals = aSampleTrainingData.intervals
    const nStripes = intervals.length;

    render(<TrainingContainerMain trainingData={aSampleTrainingData}/>)

    const theContainer = screen.getAllByRole('stripContainer');
    expect(theContainer.length).toEqual(nStripes);
    theContainer.forEach( (c, i) => {
      const seconds = intervals[i].totalTimeInZone;
      const totalTime = aSampleTrainingData.recommendedTime;
      const width = getStripCsslWidth(seconds, totalTime);
      
      expect(c).toHaveStyle({width: width});
    })
   
    const theStrips = screen.getAllByRole('strip');
    expect(theStrips.length).toEqual(nStripes);
    theStrips.forEach( (s, i) => {
      const zone = intervals[i].zone;
      const colorCssClass = zoneToColorClassMap[zone];
      expect(s).toHaveClass(colorCssClass);
    })
  });
});
