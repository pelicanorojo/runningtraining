/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-25T01:44:44-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-08-06T09:05:48-03:00
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
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



jest.mock('@/components/ui/custom/configFavoriteDialog', () => ({
  __esModule: true, // <-- important for default exports
  default: jest.fn(() => null), // stub component
}));

import FavoriteDialog from '@/components/ui/custom/configFavoriteDialog';
const FavoriteDialogMock = FavoriteDialog as jest.Mock;


jest.mock('@/components/ui/custom/configDialog', () => ({
  __esModule: true, // <-- important for default exports
  default: jest.fn(() => <button>config button</button>), // stub component
}));

import ConfigDialog from '@/components/ui/custom/configDialog';
const ConfigDialogMock = ConfigDialog as jest.Mock;

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({push: pushMock}),
  useParams: () => ({locale: locale}),
  useSelectedLayoutSegment: () => ({locale: locale})
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
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
const aRaceDate = '2024-12-01';

 // Mock for db commands
jest.mock('@/actions/index', () => {
  return {
    setFavorites: jest.fn(async () => undefined),
    clearFavorites: jest.fn(async () => undefined),
    loadFavorites: jest.fn(async () => ({
      trainingId: aTrainingPlan.id,
      raceDate: aRaceDate
    }))
  };
});

import ConfigBar from '@/components/ui/custom/configBar';

describe('ConfigBar ...', () => {
  // Import useSession mock for local override
  const { useSession } = require('next-auth/react');
  describe('Favorite set/unset control', () => {
    it('Should be enable if user authenticated, and training plan data ok.', async () => {
      useSession.mockReturnValue({ status: 'authenticated', data: null });

      render(
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} origTrainingPlanId={aTrainingPlan.id as TrainingPlanId} origRaceDate={aRaceDate} />
        </NextIntlClientProvider>
      );

      // pick the handler from the calls history
      const { disabled } = (FavoriteDialogMock).mock.calls[0][0];

      expect(disabled).toBe(false);
    });

    it('Should be disable if user not authenticated, despite training data be ok', () => {
      useSession.mockReturnValue({ status: 'unauthenticated', data: null });
      render(
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} origTrainingPlanId={aTrainingPlan.id as TrainingPlanId} origRaceDate={aRaceDate} />
        </NextIntlClientProvider>
      );

      // pick the handler from the calls history
      const { disabled } = (FavoriteDialogMock).mock.calls[0][0];

      expect(disabled).toBe(true);
    });

    it('Should be disable if user is authenticated, but training plan data is incomplete.', () => {
      useSession.mockReturnValue({ status: 'authenticated', data: null });
      render(
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]}  />
        </NextIntlClientProvider>
      );

      // pick the handler from the calls history
      const { disabled } = (FavoriteDialogMock).mock.calls[0][0];

      expect(disabled).toBe(true);
    });

    it('Should mark is favorite, if enabled and current plan is the favorite', () => {
      useSession.mockReturnValue({ status: 'authenticated', data: null });

      // Set up store with favorite values
      useAppStore.setState({
        favoriteTrainingPlanId: aTrainingPlan.id,
        favoriteRaceDate: aRaceDate,
      });

      render(
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} origTrainingPlanId={aTrainingPlan.id} origRaceDate={aRaceDate} />
        </NextIntlClientProvider>
      );

      // pick the handler from the calls history
      const { isFavorite } = (FavoriteDialogMock).mock.calls[0][0];

      expect(isFavorite).toBe(true);
    });
  });

  describe('Current training data', () => {
    it('Should show placeholders on subtitles when some initial state undefined.', () => {
      useSession.mockReturnValue({ status: 'unauthenticated', data: null });
      render(
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
          >
            <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]}/>
        </NextIntlClientProvider>
      );

      const theText = screen.getByText(`${messages.configBar.planLabel}: ${messages.configBar.unSelectedPlanValue}`);
      expect(theText).toBeInTheDocument();
      const theDate = screen.getByText(`${messages.configBar.raceDateLabel}: ( ${messages.configBar.unSelectedRaceDateValue} )`);
      expect(theDate).toBeInTheDocument();
    })

      it('Should render subtitles with initial state.', ()  => {
      render(
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} origTrainingPlanId={aTrainingPlan.id as TrainingPlanId} origRaceDate={aRaceDate} />
        </NextIntlClientProvider>
      );  

      const theText = screen.getByText(`${messages.configBar.planLabel}: ${aTrainingPlan.label}`);
      expect(theText).toBeInTheDocument();
      const theDate = screen.getByText(`${messages.configBar.raceDateLabel}: (${aRaceDate})`);
      expect(theDate).toBeInTheDocument();
    })
  });
  
  describe('Go to favorites', () => {
    it('Should be enable if user authenticated, and favorites are setted', async () => {
      useSession.mockReturnValue({ status: 'authenticated', data: null });

      // Set up store with favorite values
      useAppStore.setState({
        favoriteTrainingPlanId: aTrainingPlan.id,
        favoriteRaceDate: aRaceDate,
      });

      render(
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} />
        </NextIntlClientProvider>
      );

      const loadFavBtn = screen.getByRole('button', {name: messages.configBar.goToFavorites});
      expect(loadFavBtn).toBeEnabled();
    });

    it('Should be disable if user not authenticated, despite favorites be ok', () => {
      useSession.mockReturnValue({ status: 'unauthenticated', data: null });

      // Set up store with favorite values
      useAppStore.setState({
        favoriteTrainingPlanId: aTrainingPlan.id,
        favoriteRaceDate: aRaceDate,
      });
      
      render(
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} />
        </NextIntlClientProvider>
      );

      const loadFavBtn = screen.getByRole('button', {name: messages.configBar.goToFavorites});
      expect(loadFavBtn).toBeDisabled();
    });

    it('Should be disable if user authenticated, but favorites are not setted', () => {
      useSession.mockReturnValue({ status: 'authenticated', data: null });

      // Set up store with no favorite values
      useAppStore.setState({
        favoriteTrainingPlanId: undefined,
        favoriteRaceDate: undefined,
      });

      render(
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} />
        </NextIntlClientProvider>
      );

      const loadFavBtn = screen.getByRole('button', {name: messages.configBar.goToFavorites});
      expect(loadFavBtn).toBeDisabled();
    });
  });

  describe('Config button', () => {
    it('Should be present', () => {
      useSession.mockReturnValue({ status: 'authenticated', data: null });

      // Set up store with no favorite values
      useAppStore.setState({
        favoriteTrainingPlanId: undefined,
        favoriteRaceDate: undefined,
      });

      render(
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} />
        </NextIntlClientProvider>
      );

      const configBtn = screen.getByRole('button', {name: 'config button'});
      expect(configBtn).toBeInTheDocument();      
    });
  });

  describe('Events handlers', () => {
    describe('dispatchFavorite', () => {
      it('Should call setFavoriteAction if current plan and date isn\'t favorite yet.', async () => {
        const userId = 'user1';
        
        useSession.mockReturnValue({ status: 'authenticated', data: { user: {id: userId} }    });
        const setFavoriteActionSpy = jest.spyOn(useAppStore.getState(), 'setFavoriteAction');

        render(
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
          >
            <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} origTrainingPlanId={aTrainingPlan.id} origRaceDate={aRaceDate}/>
          </NextIntlClientProvider>
        );

        // pick the handler from the calls history
        const { dispatch: dispatchFavorite } = (FavoriteDialogMock).mock.calls[0][0];
        
        // call manually
        await act(() => dispatchFavorite());
     
        expect(setFavoriteActionSpy).toHaveBeenCalledTimes(1);
        expect(setFavoriteActionSpy).toHaveBeenCalledWith(userId, aTrainingPlan.id, aRaceDate);
   
      });
    });

    describe('onLoadFavorites', () => {
      it('Should call router.push with the favorite training (when no empty)', async () => {
        useSession.mockReturnValue({ status: 'authenticated', data: null });

        useAppStore.setState({
          favoriteTrainingPlanId: aTrainingPlan.id,
          favoriteRaceDate: aRaceDate,
        });

        render(
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
          >
            <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} />
          </NextIntlClientProvider>
        );
        const loadFavBtn = screen.getByRole('button', {name: messages.configBar.goToFavorites});
        fireEvent.click(loadFavBtn);
        const expectedRoute = `/${locale}${paths.trainingPlanShow({raceDate: aRaceDate, trainingPlanId: aTrainingPlan.id})}`;
        expect(pushMock).toHaveBeenCalledWith(expectedRoute);
        expect(pushMock).toHaveBeenCalledTimes(1);
      });

      it('Should not call router.push if favorite training plan is empty', async () => {
        useSession.mockReturnValue({ status: 'authenticated', data: null });

        useAppStore.setState({
          favoriteTrainingPlanId: undefined,
          favoriteRaceDate: aRaceDate,
        });

        render(
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
          >
            <ConfigBar trainingPlansAvailable={trainingPlansAvailableFront[locale]} />
          </NextIntlClientProvider>
        );
        const loadFavBtn = screen.getByRole('button', {name: messages.configBar.goToFavorites});
        fireEvent.click(loadFavBtn);
        expect(pushMock).not.toHaveBeenCalled();
      });
    })
  });
});
