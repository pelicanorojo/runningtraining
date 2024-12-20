/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-26T10:53:01-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-20T12:44:32-03:00
 */


import '@testing-library/jest-dom';
import * as helpers from  '@/lib/helpers';
import { RawPlanData, TrainingPlanThinBack } from "@/types/global";

import { trainingPlansAvailableBack, plansSubFolder } from "@/lib/constants";
import * as process from 'process';
import path from 'path';
import aRawPlanData from  "@/data/plans/test.json";

const aTrainingPlan: TrainingPlanThinBack = trainingPlansAvailableBack[1];

jest.mock('process', () => ({
  ...jest.requireActual('process'),
  cwd: jest.fn().mockReturnValue('/Users/xxxxx/yyyyy'),
}));

describe('Helper getPlanJsonPath', () => {
  it('Should construct the json path as cwd/src/${plansSubFolder}/${aTrainingPlan.fileName', () => {
    const aPath = helpers.getPlanJsonPath(aTrainingPlan.id);
    const expectedPath = path.join(process.cwd(), `src/${plansSubFolder}/${aTrainingPlan.fileName}`)
    expect(aPath).toEqual(expectedPath); 
  });
});

describe('Helper createUTCDateFromString', () => {
  it('Should create well some UTC dates with strings like YYYY-MM-DD.', () => {
    let year = 2024, month = 11, date = 23;
    let sSampleDate = `${year}-${month}-${date}`;
    let aSampleUTCDate = helpers.createUTCDateFromString(sSampleDate);

    let aYear = aSampleUTCDate.getUTCFullYear(), aMonthIndex = aSampleUTCDate.getUTCMonth(), aDate = aSampleUTCDate.getUTCDate();
    let aHour = aSampleUTCDate.getUTCHours(), aMinute = aSampleUTCDate.getUTCMinutes(), aSecond = aSampleUTCDate.getUTCSeconds();
    let aMillisecond = aSampleUTCDate.getUTCMilliseconds();

    expect(aYear).toEqual(year); expect(aMonthIndex).toEqual(month - 1); expect(aDate).toEqual(date);
    expect(aHour).toEqual(0); expect(aMinute).toEqual(0); expect(aSecond).toEqual(0); expect(aMillisecond).toEqual(0);

    year = 2024; month = 12; date = 31;
    sSampleDate = `${year}-${month}-${date}`;
    aSampleUTCDate = helpers.createUTCDateFromString(sSampleDate);

    aYear = aSampleUTCDate.getUTCFullYear(); aMonthIndex = aSampleUTCDate.getUTCMonth();  aDate = aSampleUTCDate.getUTCDate();
    aHour = aSampleUTCDate.getUTCHours(); aMinute = aSampleUTCDate.getUTCMinutes(); aSecond = aSampleUTCDate.getUTCSeconds();
    aMillisecond = aSampleUTCDate.getUTCMilliseconds();

    expect(aYear).toEqual(year); expect(aMonthIndex).toEqual(month - 1); expect(aDate).toEqual(date);
    expect(aHour).toEqual(0); expect(aMinute).toEqual(0); expect(aSecond).toEqual(0); expect(aMillisecond).toEqual(0);

    year = 2024; month = 1; date = 1;
    sSampleDate = `${year}-${month}-${date}`;
    aSampleUTCDate = helpers.createUTCDateFromString(sSampleDate);

    aYear = aSampleUTCDate.getUTCFullYear(); aMonthIndex = aSampleUTCDate.getUTCMonth();  aDate = aSampleUTCDate.getUTCDate();
    aHour = aSampleUTCDate.getUTCHours(); aMinute = aSampleUTCDate.getUTCMinutes(); aSecond = aSampleUTCDate.getUTCSeconds();
    aMillisecond = aSampleUTCDate.getUTCMilliseconds();

    expect(aYear).toEqual(year); expect(aMonthIndex).toEqual(month - 1); expect(aDate).toEqual(date);
    expect(aHour).toEqual(0); expect(aMinute).toEqual(0); expect(aSecond).toEqual(0); expect(aMillisecond).toEqual(0);
  });
});

describe('createUTCDate', () => {
  it('Should create well an utc date from year, month, date, with 0 the rest of components', () => {
    let year = 2024, month = 12, date = 31;
    let aSampleUTCDate = helpers.createUTCDate(year, month, date);

    let aYear = aSampleUTCDate.getUTCFullYear(), aMonthIndex = aSampleUTCDate.getUTCMonth(), aDate = aSampleUTCDate.getUTCDate();
    let aHour = aSampleUTCDate.getUTCHours(), aMinute = aSampleUTCDate.getUTCMinutes(), aSecond = aSampleUTCDate.getUTCSeconds();
    let aMillisecond = aSampleUTCDate.getUTCMilliseconds();

    expect(aYear).toEqual(year); expect(aMonthIndex).toEqual(month - 1); expect(aDate).toEqual(date);
    expect(aHour).toEqual(0); expect(aMinute).toEqual(0); expect(aSecond).toEqual(0); expect(aMillisecond).toEqual(0);

    year = 2024; month = 1; date = 1;
    aSampleUTCDate = helpers.createUTCDate(year, month, date);

    aYear = aSampleUTCDate.getUTCFullYear(); aMonthIndex = aSampleUTCDate.getUTCMonth();  aDate = aSampleUTCDate.getUTCDate();
    aHour = aSampleUTCDate.getUTCHours(); aMinute = aSampleUTCDate.getUTCMinutes(); aSecond = aSampleUTCDate.getUTCSeconds();
    aMillisecond = aSampleUTCDate.getUTCMilliseconds();

    expect(aYear).toEqual(year); expect(aMonthIndex).toEqual(month - 1); expect(aDate).toEqual(date);
    expect(aHour).toEqual(0); expect(aMinute).toEqual(0); expect(aSecond).toEqual(0); expect(aMillisecond).toEqual(0);
  });
});


describe('Helper formatDate', () => {
  it('Should show a date as tring in YYYY-MM-DD format.', () => {
    let oDate = {y: 2024, m: 12, d: 31};
    let oPaddedDate = {y: '2024', m: '12', d: '31'};

    let formatedDate = helpers.formatDate(helpers.createUTCDate(oDate.y, oDate.m, oDate.d));

    expect(formatedDate).toEqual(`${oPaddedDate.y}-${oPaddedDate.m}-${oPaddedDate.d}`);

    oDate = {y: 2024, m: 1, d: 1};
    oPaddedDate = {y: '2024', m: '01', d: '01'};

     formatedDate = helpers.formatDate(helpers.createUTCDate(oDate.y, oDate.m, oDate.d));

    expect(formatedDate).toEqual(`${oPaddedDate.y}-${oPaddedDate.m}-${oPaddedDate.d}`);
  });
});

describe('Helper shiftDate', () => {
  it('Should unchange a date if shift is 0 Day', () => {
    let aDate = helpers.createUTCDateFromString('2025-12-31');
    let shiftedDate = helpers.shiftDate(aDate, 0);
    expect(shiftedDate).toEqual(aDate);

    aDate = helpers.createUTCDateFromString('2025-1-1');
    shiftedDate = helpers.shiftDate(aDate, 0);
    expect(shiftedDate).toEqual(aDate);
  });

  it('Should compute well following dates', () => {
    let aDate = helpers.createUTCDateFromString('2025-12-31');
    let aShiftedDate = helpers.createUTCDateFromString('2026-1-1');

    let shiftedDate = helpers.shiftDate(aDate, 1);
    expect(shiftedDate).toEqual(aShiftedDate);

    aDate = helpers.createUTCDateFromString('2026-1-1');
    aShiftedDate = helpers.createUTCDateFromString('2025-12-31');

    shiftedDate = helpers.shiftDate(aDate, -1);
    expect(shiftedDate).toEqual(aShiftedDate);
  });
});

//TODO: dateDiff tests

//generateScheduleFromPlan
describe('generateScheduleFromPlan', () => {
  const raceDate = '2024-12-15';
  const aDateBeforeTheRace = helpers.shiftDate(helpers.createUTCDateFromString(raceDate), -1);

  const theRawData = aRawPlanData as RawPlanData;
  const theScheduleData = helpers.generateScheduleFromPlan(theRawData, raceDate);
  const lastTraining = theScheduleData[theScheduleData.length -1];
  //console.log(helpers.createUTCDateFromString(theRawData.results[0].scheduledDate))

  const lastTrainingDate = helpers.createUTCDateFromString(lastTraining.trainingDate);
  expect(theScheduleData.length).toEqual(theRawData.results.length);
  expect(lastTrainingDate).toEqual(aDateBeforeTheRace);  
});
