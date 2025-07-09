/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-30T10:30:09-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-07T11:52:38-03:00
 */

import '@testing-library/jest-dom';
import {  render, screen } from '@testing-library/react';
import  TrainingContainerMain, {
  seconds2Minutes,seconds2TimeComponents, stripTitleBuilder, stripLabelBuilder, getStripCsslWidth
  , zoneToColorClassMap, zoneToMarginsMap
  , Strip
} from '@/components/ui/custom/trainingContainerMain';

import { Zone } from '@/types/global';
import { aSampleTrainingData } from '@/lib/mockConstants';

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

describe('seconds2TimeComponents ...', () => {
  it('Should convert well 0 to 59 seconds.', () => {
    expect(seconds2TimeComponents(0)).toEqual({h: 0, m: 0, s: 0});
    expect(seconds2TimeComponents(59)).toEqual({h: 0, m: 0, s: 59});
  });

  it('Should convert well 60 seconds.', () => {
    expect(seconds2TimeComponents(60)).toEqual({h: 0, m: 1, s: 0});
  });

  it('Should convert well 61 to 3599 seconds.', () => {
    expect(seconds2TimeComponents(61)).toEqual({h: 0, m: 1, s: 1});
    expect(seconds2TimeComponents(3599)).toEqual({h: 0, m: 59, s: 59});
  });
  
  it('Should convert well 3600 to infinite seconds.', () => {
    expect(seconds2TimeComponents(3600)).toEqual({h: 1, m: 0, s: 0});
    expect(seconds2TimeComponents(3660)).toEqual({h: 1, m: 1, s: 0});
    expect(seconds2TimeComponents(3661)).toEqual({h: 1, m: 1, s: 1});
    expect(seconds2TimeComponents(3601)).toEqual({h: 1, m: 0, s: 1});
  });
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
    expect(title).toEqual(`1 minutes 29 seconds in zone ${zone}.`);
  })
});

describe('stripLabelBuilder ...', () => {
  it('Should build well a 59 seconds label.', () => {
    const seconds = 59;
    const label = stripLabelBuilder(seconds);
    expect(label).toEqual('59s');
  })
  
  it('Should build well a 89 seconds label.', () => {
    const seconds = 89;
    const title = stripLabelBuilder( seconds);
    expect(title).toEqual('1m29s');
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
