/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-25T01:44:44-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-08-06T09:00:35-03:00
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { KnownLocales, TrainingPlanId, TrainingPlanThinFront } from "@/types/global";
import { trainingPlansAvailableFront } from "@/lib/constants";

import {NextIntlClientProvider} from 'next-intl';

import messages from '@/i18n/messages/en.json';

/* For inspect some configs, and mainly reactStrictMode
import { getConfig } from '@testing-library/react';
console.log('DBG: NODE_ENV, @testing-library/react getConfig',  process.env.NODE_ENV,  getConfig());
//*/
const locale :KnownLocales = 'en';

const languageSwitcherText = 'The LanguageSwither Button';
jest.mock('@/components/ui/custom/languageSwitcher', () => ({
  __esModule: true, // <-- important for default exports
  default: jest.fn(() => <button>{languageSwitcherText}</button>), // stub component
}));

const planSelectorText = 'The PlanSelector Button';
jest.mock('@/components/ui/custom/planSelector', () => ({
  __esModule: true, // <-- important for default exports
  default: jest.fn(() => <button>{planSelectorText}</button>), // stub component
}));

const raceSelectorText = 'The RaceDateSelector Button';
jest.mock('@/components/ui/custom/raceDateSelector', () => ({
  __esModule: true, // <-- important for default exports
  default: jest.fn(() => <button>{raceSelectorText}</button>), // stub component
}));


import { useAppStore } from '@/stores/useAppStore';

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

const otherTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[locale][2];
const otherRaceDate = '2024-12-11';

import ConfigDialog from '@/components/ui/custom/configDialog';

describe('ConfigDialog ...', () => {
  it('Should Cancel button close the dialog, and not call the callback',  () => {
    const props = {
      trainingPlansAvailable: [],
      trainingPlanId: undefined, raceDate: undefined,
      useFavoritesEnabled: false,
      loadNewPlanData: jest.fn()
    }

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigDialog {...props} />
      </NextIntlClientProvider>
    );

    //Open the Dialog
    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    // Check elements exists
    const heading = screen.getByRole('heading', { level: 2, name: messages.configBar.selectorTitle});
    expect(heading).toBeInTheDocument();

    const canceltBtn = screen.getByRole('button', {name: messages.commons.btnCancel})
    expect(canceltBtn).toBeInTheDocument();

    // check behaviour
    fireEvent.click(canceltBtn);

    const heading2 =  screen.queryByRole('heading', { level: 2, name: messages.configBar.selectorTitle});
    expect(heading2).not.toBeInTheDocument();

    expect(props.loadNewPlanData).toHaveBeenCalledTimes(0);    
  });

  it('Should language selector be present', () => {
    const props = {
      trainingPlansAvailable: [],
      trainingPlanId: undefined, raceDate: undefined,
      useFavoritesEnabled: false,
      loadNewPlanData: jest.fn()
    }

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigDialog {...props} />
      </NextIntlClientProvider>
    );

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    // check is rendered the mock
    const languageSwitcher = screen.getByRole('button', {name: languageSwitcherText});
    expect(languageSwitcher).toBeInTheDocument();
  });

  it('Should load favorite values button be present and disabled', () => {
    const props = {
      trainingPlansAvailable: [],
      trainingPlanId: undefined, raceDate: undefined,
      useFavoritesEnabled: false,
      loadNewPlanData: jest.fn()
    }

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigDialog {...props} />
      </NextIntlClientProvider>
    );

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    const loadFavoriteBtn = screen.getByRole('button', {name: messages.configBar.useFavoriteLabel});
    expect(loadFavoriteBtn).toBeInTheDocument();
    expect(loadFavoriteBtn).toHaveAttribute('disabled');
  });

  it('Should load favorite values be enabled', () => {
    const props = {
      trainingPlansAvailable: [],
      trainingPlanId: undefined, raceDate: undefined,
      useFavoritesEnabled: true,
      loadNewPlanData: jest.fn()
    }

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigDialog {...props} />
      </NextIntlClientProvider>
    );

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    const loadFavoriteBtn = screen.getByRole('button', {name: messages.configBar.useFavoriteLabel});
    expect(loadFavoriteBtn).not.toHaveAttribute('disabled');
  });

  it('Should load favorite call the callback when clicked', () => {
    const props = {
      trainingPlansAvailable: [],
      trainingPlanId: undefined, raceDate: undefined,
      useFavoritesEnabled: true,
      loadNewPlanData: jest.fn()
    }

    // Set up store with favorite values
    useAppStore.setState({
      trainingPlanId: aTrainingPlan.id,
      raceDate: aRaceDate,
      favoriteTrainingPlanId: otherTrainingPlan.id,
      favoriteRaceDate: otherRaceDate,
    });

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigDialog {...props} />
      </NextIntlClientProvider>
    );

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    const loadFavoriteBtn = screen.getByRole('button', {name: messages.configBar.useFavoriteLabel});
    fireEvent.click(loadFavoriteBtn);

    const accepttBtn = screen.getByRole('button', {name: messages.commons.btnAcept})
    fireEvent.click(accepttBtn);
    
    // the training date should be equal to the favorite values
    expect(props.loadNewPlanData).toHaveBeenCalledWith({ trainingPlanId: otherTrainingPlan.id, raceDate: otherRaceDate })
    
  });

    it('Should plan selector be present', () => {
    const props = {
      trainingPlansAvailable: [],
      trainingPlanId: undefined, raceDate: undefined,
      useFavoritesEnabled: false,
      loadNewPlanData: jest.fn()
    }

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigDialog {...props} />
      </NextIntlClientProvider>
    );

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    const loadFavoriteBtn = screen.getByRole('button', {name: planSelectorText});
    expect(loadFavoriteBtn).toBeInTheDocument();
  });

  it('Should raceDate selector be present', () => {
    const props = {
      trainingPlansAvailable: [],
      trainingPlanId: undefined, raceDate: undefined,
      useFavoritesEnabled: false,
      loadNewPlanData: jest.fn()
    }

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <ConfigDialog {...props} />
      </NextIntlClientProvider>
    );

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    const loadFavoriteBtn = screen.getByRole('button', {name: raceSelectorText});
    expect(loadFavoriteBtn).toBeInTheDocument();
  });
});
