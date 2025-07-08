/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-25T01:44:44-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-07T10:05:22-03:00
 */


import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { KnownLocales, TrainingPlanThinFront } from "@/types/global";
import { trainingPlansAvailableFront } from "@/lib/constants";
import paths from '@/lib/paths';
import { useConfig, useConfigDispatch } from '@/contexts/config';

import {NextIntlClientProvider} from 'next-intl';

import messages from '../../../../messages/en.json';
const locale :KnownLocales = 'en';

const pushMock = jest.fn(); // a shared one for when on the component useEffect should be redirection


// If the tested component uses features from Next.js, you have to mock them.
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({push: pushMock}),
  useParams: () => ({locale: locale}),
  useSelectedLayoutSegment: () => ({locale: locale})
}));

jest.mock('next-auth/react', () => ({
  useSession: () => jest.fn(),
}));

jest.mock('@/contexts/config', () => ({
  useConfig: jest.fn(),
  useConfigDispatch: jest.fn(),
}));

const useConfigMock  = useConfig as jest.Mock;

const dispatchFnMock = jest.fn();
const useConfigDispatchMock = useConfigDispatch as jest.Mock;
useConfigDispatchMock.mockReturnValue(dispatchFnMock);



beforeEach(() => {
  jest.clearAllMocks();
  //pushMock.mockClear();
  //dispatchFnMock.mockClear();
  useConfigMock.mockReset(); // history and implementation, mainly for by test (no global) custom implementations
  useConfigMock.mockImplementation(jest.requireActual('@/contexts/config').useConfig); // this is like an inline applyDefaultMockImplementation, with unmocked original functionality
 // applyDefaultMockImplementation(); // ✅ apply default custom default mock implementation if wanted
 //


});

let aUndefined;

const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[locale][1];
const otheraTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[locale][2];


import ConfigBar from '@/components/ui/custom/configBar';

describe('ConfigBar ...', () => {
  it('Should show placeholders on subtitles when some initial state undefined.', () => {
    const initialState = {trainingPlanId: aUndefined, raceDate: aUndefined, favoriteTrainingPlanId: aUndefined, favoriteRaceDate: aUndefined};
    useConfigMock.mockReturnValue(initialState);
    render(
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]}/>
      </NextIntlClientProvider>
    );

    const theText =   screen.getByText('Plan: Select one');

    expect(theText).toBeInTheDocument();

    const theDate =  screen.getByText('Race Date: ( Select one )');
    expect(theDate).toBeInTheDocument();     
  })

  it('Should render the popup with its childs initialized with the param initialState.',  () => {
    const aRaceDate = '2024-12-01';
    const initialState = {trainingPlanId: aTrainingPlan.id, raceDate: aRaceDate, favoriteTrainingPlanId: aUndefined, favoriteRaceDate: aUndefined};
    useConfigMock.mockReturnValue(initialState);

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} />
      </NextIntlClientProvider>
    );
    const thePopupTrigger = screen.getByRole('button', {name: 'Config Popup'});

    fireEvent.click(thePopupTrigger);

    const theText =  screen.getByText(aTrainingPlan.label);

    expect(theText).toBeInTheDocument();

    const theDate =  screen.getByDisplayValue(aRaceDate);
    expect(theDate).toBeInTheDocument(); 
  })

  it('Should not initialy redirect to the initialState past param.', () => {
    const aRaceDate = '2024-12-01';
    const initialState = {trainingPlanId: aTrainingPlan.id, raceDate: aRaceDate, favoriteTrainingPlanId: aUndefined, favoriteRaceDate: aUndefined};
    useConfigMock.mockReturnValue(initialState);

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]}/>
      </NextIntlClientProvider>
    );
    expect(pushMock).not.toHaveBeenCalled();
  })

  it('Should redirect, if changed to a valid plan.', () => {

    const aDate = '2024-12-01';
    const initialState = {trainingPlanId: aTrainingPlan.id, raceDate: aDate, favoriteTrainingPlanId: aUndefined, favoriteRaceDate: aUndefined};
    useConfigMock.mockReturnValue(initialState);

    const { rerender } = render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]}/>
      </NextIntlClientProvider>
    );

    /*
    const thePopupTrigger = screen.getByRole('button', {name: 'Config Popup'});

    fireEvent.click(thePopupTrigger);

    const combo = screen.getByRole('combobox', {name: 'Plan Selector'});

    fireEvent.click(combo);


    // Filter options by text
    const optionElement = screen.getAllByRole('option').filter(option => {
      return option.textContent?.includes(otheraTrainingPlan.label);    
    });
    */
    // all the ui simulations make no sense in this strategy where we mock the state (the unique thing which finally will produce the effect)
    useConfigMock.mockReturnValue({...initialState, trainingPlanId: otheraTrainingPlan.id});
    // Any way, can be added tests for check the ui flow works as expected in the sense of open a pop up, unroll options, etc.

    //fireEvent.click(optionElement[0]);
    rerender(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]}/>
      </NextIntlClientProvider>
    );
    const expectedRoute = `/${locale}${paths.trainingPlanShow({...initialState, trainingPlanId: otheraTrainingPlan.id})}`;

    //expect(dispatchFnMock).toHaveBeenCalledTimes(1);
    //expect(dispatchFnMock).toHaveBeenCalledWith({ type: 'CHANGE_PLAN', payload: {trainingPlanId: otheraTrainingPlan.id} });

    expect(pushMock).toHaveBeenCalledWith(expectedRoute);
    expect(pushMock).toHaveBeenCalledTimes(1);    
  })


  it('Should redirect, if changed to a valid race date.', () => {

    const aDate = '2024-12-01';
    const initialState = {trainingPlanId: aTrainingPlan.id, raceDate: aDate, favoriteTrainingPlanId: aUndefined, favoriteRaceDate: aUndefined};
    useConfigMock.mockReturnValue(initialState);

    const { rerender } = render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]}/>
      </NextIntlClientProvider>
    );
    /*
    const thePopupTrigger = screen.getByRole('button', {name: 'Config Popup'});
    fireEvent.click(thePopupTrigger);

    const theDate = screen.getByDisplayValue(aDate)

    fireEvent.click(theDate);
    */
    const otherDate = '2024-11-02';
    useConfigMock.mockReturnValue({...initialState, raceDate: otherDate});
    //fireEvent.change(theDate, {target: {value: otherDate}});
    rerender(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]}/>
      </NextIntlClientProvider>
    );
    const expectedRoute = `/${locale}${paths.trainingPlanShow({...initialState, raceDate: otherDate})}`;

    expect(pushMock).toHaveBeenCalledWith(expectedRoute);
    expect(pushMock).toHaveBeenCalledTimes(1);  
  })

  it('Should not redirect, if changed to the same values.', () => {
    const aDate = '2024-12-01';
    const initialState = {trainingPlanId: aTrainingPlan.id, raceDate: aDate, favoriteTrainingPlanId: aUndefined, favoriteRaceDate: aUndefined};
    useConfigMock.mockReturnValue(initialState);

    const { rerender } = render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} />
      </NextIntlClientProvider>
    );

    rerender(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]}/>
      </NextIntlClientProvider>
    );

    
    expect(pushMock).toHaveBeenCalledTimes(0);
  })
});
