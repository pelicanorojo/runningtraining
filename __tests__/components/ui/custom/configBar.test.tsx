/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-25T01:44:44-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-07T12:36:28-03:00
 */


import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfigBar from '@/components/ui/custom/configBar';
import { KnownLocales, TrainingPlanThinFront } from "@/types/global";
import { trainingPlansAvailableFront } from "@/lib/constants";
import { useRouter } from 'next/navigation';

import paths from '@/lib/paths';

import {NextIntlClientProvider} from 'next-intl';

import messages from '../../../../messages/en.json';
const locale :KnownLocales = 'en';


// If the tested component uses features from Next.js, you have to mock them.
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: jest.fn()/*() => ({
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn()
  })*/,
  useParams: () => ({locale: locale}),
  useSelectedLayoutSegment: () => ({locale: locale})
}));

const mockPush = jest.fn(); // a shared one

const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[locale][1];
const otheraTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[locale][2];

describe('ConfigBar ...', () => {
  it('Should show placeholders on subtitles when some initial state undefined.', () => {
    let aUndefined;

    const initialState = {trainingPlanId: aUndefined, raceDate: aUndefined};

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    render(
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} initialState={initialState}/>
      </NextIntlClientProvider>
    );

    const theText =   screen.getByText('Plan: Select one');

    expect(theText).toBeInTheDocument();

    const theDate =  screen.getByText('Race Date: ( Select one )');
    expect(theDate).toBeInTheDocument();     
  })

  it('Should render the popup with its childs initialized with the param initialState.',  () => {
    const aRaceDate = '2024-12-01';
    const initialState = {trainingPlanId: aTrainingPlan.id, raceDate: aRaceDate};

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} initialState={initialState}/>
      </NextIntlClientProvider>
    );
    const thePopupTrigger = screen.getByRole('button');
    fireEvent.click(thePopupTrigger);

    const theText =  screen.getByText(aTrainingPlan.label);

    expect(theText).toBeInTheDocument();

    const theDate =  screen.getByDisplayValue(aRaceDate);
    expect(theDate).toBeInTheDocument(); 
  })

  it('Should not initialy redirect to the initialState past param.', () => {
    
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const aRaceDate = '2024-12-01';
    const initialState = {trainingPlanId: aTrainingPlan.id, raceDate: aRaceDate};

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} initialState={initialState}/>
      </NextIntlClientProvider>
    );
    expect(mockPush).not.toHaveBeenCalled();
  })

  it('Should redirect, if changed to a valid plan.', () => {

    const mockPush = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const aDate = '2024-12-01';
    const initialState = {trainingPlanId: aTrainingPlan.id, raceDate: aDate};

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} initialState={initialState}/>
      </NextIntlClientProvider>
    );
    const thePopupTrigger = screen.getByRole('button');
    fireEvent.click(thePopupTrigger);

    const combo = screen.getByRole('combobox');

    fireEvent.click(combo);


    // Filter options by text
    const optionElement = screen.getAllByRole('option').filter(option => {
      return option.textContent?.includes(otheraTrainingPlan.label);
    });
    
    fireEvent.click(optionElement[0]);
    const expectedRoute = `/${locale}${paths.trainingPlanShow({...initialState, trainingPlanId: otheraTrainingPlan.id})}`;

    expect(mockPush).toHaveBeenCalledWith(expectedRoute);
    expect(mockPush).toHaveBeenCalledTimes(1);
  })


  it('Should redirect, if changed to a valid race date.', () => {

    const mockPush = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const aDate = '2024-12-01';
    const initialState = {trainingPlanId: aTrainingPlan.id, raceDate: aDate};

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} initialState={initialState}/>
      </NextIntlClientProvider>
    );
    const thePopupTrigger = screen.getByRole('button');
    fireEvent.click(thePopupTrigger);

    const theDate = screen.getByDisplayValue(aDate)

    fireEvent.click(theDate);

    const otherDate = '2024-11-02';

    fireEvent.change(theDate, {target: {value: otherDate}});
    
    const expectedRoute = `/${locale}${paths.trainingPlanShow({...initialState, raceDate: otherDate})}`;

    expect(mockPush).toHaveBeenCalledWith(expectedRoute);
    expect(mockPush).toHaveBeenCalledTimes(1);
  })

  it('Should not redirect, if changed to the same values.', () => {
    const mockPush = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const aDate = '2024-12-01';
    const initialState = {trainingPlanId: aTrainingPlan.id, raceDate: aDate};

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} initialState={initialState}/>
      </NextIntlClientProvider>
    );

    const thePopupTrigger = screen.getByRole('button');
    fireEvent.click(thePopupTrigger);

    const theDate = screen.getByDisplayValue(aDate)

    fireEvent.click(theDate);

    const otherDate = aDate;

    fireEvent.change(theDate, {target: {value: otherDate}});
    
    expect(mockPush).toHaveBeenCalledTimes(0);
  })
});
