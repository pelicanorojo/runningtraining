/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-25T01:44:44-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-31T08:39:57-03:00
 */


import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { KnownLocales, TrainingPlanId, TrainingPlanThinFront } from "@/types/global";
import { trainingPlansAvailableFront } from "@/lib/constants";
import paths from '@/lib/paths';

import {NextIntlClientProvider} from 'next-intl';

import messages from '@/i18n/messages/en.json';

/* For inspect some configs, and mainly reactStrictMode
import { getConfig } from '@testing-library/react';
console.log('DBG: NODE_ENV, @testing-library/react getConfig',  process.env.NODE_ENV,  getConfig());
//*/
const locale :KnownLocales = 'en';

const pushMock = jest.fn(); // a shared one for when on the component useEffect should redirec

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({push: pushMock}),
  useParams: () => ({locale: locale}),
  useSelectedLayoutSegment: () => ({locale: locale})
}));

jest.mock('next-auth/react', () => ({
  useSession: () => jest.fn(),
}));



import { useAppStore } from '@/stores/useAppStore';

// No mock needed by now for the store, simply spy, and use the helper reset.
beforeEach(() => {
  jest.clearAllMocks();
  const state = useAppStore.getState();
  state.reset();
});

afterEach(() => {
  jest.restoreAllMocks(); // IMPORTANT: This cleans up the spy
});

const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[locale][1];
const otheraTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[locale][2];


import ConfigBar from '@/components/ui/custom/configBar';

describe('ConfigBar ...', () => {
  it('Should show placeholders on subtitles when some initial state undefined.', () => {
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

  it('Should render the popup with its childs initialized with the param initialState.',  async ()  => {
    const aRaceDate = '2024-12-01';
    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} origTrainingPlanId={aTrainingPlan.id as TrainingPlanId} origRaceDate={aRaceDate} />
      </NextIntlClientProvider>
    );  

    const thePopupTrigger = screen.getByRole('button', {name: 'Config Popup'});

    fireEvent.click(thePopupTrigger);

    const theText = screen.getByText(aTrainingPlan.label);

    expect(theText).toBeInTheDocument();

    const theDate =  screen.getByDisplayValue(aRaceDate);
    expect(theDate).toBeInTheDocument(); 
  })

  it('Should not initialy redirect to the initialState past param.', () => {
    const aRaceDate = '2024-12-01';
    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} origTrainingPlanId={aTrainingPlan.id as TrainingPlanId} origRaceDate={aRaceDate} />
      </NextIntlClientProvider>
    );
    expect(pushMock).not.toHaveBeenCalled();
  })

  it('Should redirect, if changed to a valid plan.', async() => {
    const aRaceDate = '2024-12-01';

    // Initial render with the original plan and date
    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} origTrainingPlanId={aTrainingPlan.id as TrainingPlanId} origRaceDate={aRaceDate} />
      </NextIntlClientProvider>
    );


    // Simulate changing the training plan
    await act(async() => {
      const state = useAppStore.getState();
      state.setTrainingPlanIdAction(otheraTrainingPlan.id);
    });

    const expectedRoute = `/${locale}${paths.trainingPlanShow({raceDate: aRaceDate, trainingPlanId: otheraTrainingPlan.id})}`;
    expect(pushMock).toHaveBeenCalledWith(expectedRoute);
    expect(pushMock).toHaveBeenCalledTimes(1);  
   })


  it('Should redirect, if changed to a valid race date.', async () => {

    const aDate = '2024-12-01';

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} origTrainingPlanId={aTrainingPlan.id as TrainingPlanId} origRaceDate={aDate} />
      </NextIntlClientProvider>
    );

    const otherDate = '2024-11-02';
    // Simulate changing the raceDate
    await act(async() => {
      const state = useAppStore.getState();
      state.setRaceDateAction(otherDate);
    });

    const expectedRoute = `/${locale}${paths.trainingPlanShow({raceDate: otherDate, trainingPlanId: aTrainingPlan.id})}`;

    expect(pushMock).toHaveBeenCalledWith(expectedRoute);
    expect(pushMock).toHaveBeenCalledTimes(1);
  })

  it('Should not redirect, if changed to the same values.', () => {
    const aDate = '2024-12-01';

    const { rerender } = render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} origTrainingPlanId={aTrainingPlan.id as TrainingPlanId} origRaceDate={aDate} />
      </NextIntlClientProvider>
    );

    rerender(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} origTrainingPlanId={aTrainingPlan.id as TrainingPlanId} origRaceDate={aDate} />
      </NextIntlClientProvider>
    );

    
    expect(pushMock).toHaveBeenCalledTimes(0);
  })  
});
