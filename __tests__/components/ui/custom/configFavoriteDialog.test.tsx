/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-25T01:44:44-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-08-05T10:56:54-03:00
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { KnownLocales, TrainingPlanThinFront } from "@/types/global";
import { trainingPlansAvailableFront } from "@/lib/constants";

import {NextIntlClientProvider} from 'next-intl';

import messages from '@/i18n/messages/en.json';

/* For inspect some configs, and mainly reactStrictMode
import { getConfig } from '@testing-library/react';
console.log('DBG: NODE_ENV, @testing-library/react getConfig',  process.env.NODE_ENV,  getConfig());
//*/
const locale :KnownLocales = 'en';

beforeEach(() => {
  jest.clearAllMocks();

});

afterEach(() => {
  jest.restoreAllMocks(); // IMPORTANT: This cleans up the spy
});

const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[locale][1];
const aRaceDate = '2024-12-01';

import FavoriteDialog from '@/components/ui/custom/configFavoriteDialog';

describe('FavoriteDialog ...', () => {
  it('Should be disabled', async () => {
    const props = {
      disabled: true, isFavorite: false,
      trainingLabel: aTrainingPlan.label, raceDate: aRaceDate,
      favoriteIconStyle: {opacity: 1, color: 'green', cursor: 'pointer'},
      dispatch: () => {}
    }

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <FavoriteDialog {...props} />
      </NextIntlClientProvider>
    );

    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('disabled')
  });

  it('Should be enabled', async () => {
    const props = {
      disabled: false, isFavorite: false,
      trainingLabel: aTrainingPlan.label, raceDate: aRaceDate,
      favoriteIconStyle: {opacity: 1, color: 'green', cursor: 'pointer'},
      dispatch: () => {}
    }

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <FavoriteDialog {...props} />
      </NextIntlClientProvider>
    );

    const btn = screen.getByRole('button');
    expect(btn).not.toHaveAttribute('disabled')
  });

  it('Cancel button should close the dialog, and not call the callback',  () => {
    const props = {
      disabled: false, isFavorite: true,
      trainingLabel: aTrainingPlan.label, raceDate: aRaceDate,
      favoriteIconStyle: {opacity: 1, color: 'green', cursor: 'pointer'},
      dispatch: jest.fn()
    }

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <FavoriteDialog {...props} />
      </NextIntlClientProvider>
    );
    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    const heading = screen.getByRole('heading', { level: 2, name: messages.configBar.unsetFavoriteTitle});
    expect(heading).toBeInTheDocument();

    const canceltBtn = screen.getByRole('button', {name: messages.commons.btnCancel})
    expect(canceltBtn).toBeInTheDocument();

    fireEvent.click(canceltBtn);

    const heading2 =  screen.queryByRole('heading', { level: 2, name: messages.configBar.unsetFavoriteTitle});
    expect(heading2).not.toBeInTheDocument();

    expect(props.dispatch).toHaveBeenCalledTimes(0);
  });

  it('Should be enabled and mark favorite selected, and content for unset favorite',  () => {
    const props = {
      disabled: false, isFavorite: true,
      trainingLabel: aTrainingPlan.label, raceDate: aRaceDate,
      favoriteIconStyle: {opacity: 1, color: 'green', cursor: 'pointer'},
      dispatch: jest.fn()
    }

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <FavoriteDialog {...props} />
      </NextIntlClientProvider>
    );
    const btn = screen.getByRole('button');
    const icon = btn.firstChild as SVGElement;
    expect(icon).toHaveAttribute('fill', 'orange');

    fireEvent.click(btn);

    const heading = screen.getByRole('heading', { level: 2, name: messages.configBar.unsetFavoriteTitle});
    expect(heading).toBeInTheDocument();

    const theText = screen.getByText(`${messages.configBar.planLabel}: ${aTrainingPlan.label}`);
    expect(theText).toBeInTheDocument();
    const theDate = screen.getByText(`${messages.configBar.raceDateLabel}: (${aRaceDate})`);
    expect(theDate).toBeInTheDocument();
    

    const acceptBtn = screen.getByRole('button', {name: messages.commons.btnAcept})
    expect(acceptBtn).toBeInTheDocument();

    fireEvent.click(acceptBtn);

    const heading2 =  screen.queryByRole('heading', { level: 2, name: messages.configBar.unsetFavoriteTitle});
    expect(heading2).not.toBeInTheDocument();

    expect(props.dispatch).toHaveBeenCalledTimes(1);
  });


  it('Should be enabled and mark favorite unselected, and content for set favorite', () => {
    const props = {
      disabled: false, isFavorite: false,
      trainingLabel: aTrainingPlan.label, raceDate: aRaceDate,
      favoriteIconStyle: {opacity: 1, color: 'green', cursor: 'pointer'},
      dispatch: jest.fn()
    }

    render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <FavoriteDialog {...props} />
      </NextIntlClientProvider>
    );
    const btn = screen.getByRole('button');
    const icon = btn.firstChild as SVGElement;
    expect(icon).toHaveAttribute('fill', 'white');

    fireEvent.click(btn);

    const heading = screen.getByRole('heading', { level: 2, name: messages.configBar.setFavoriteTitle});
    expect(heading).toBeInTheDocument();

    const theText = screen.getByText(`${messages.configBar.planLabel}: ${aTrainingPlan.label}`);
    expect(theText).toBeInTheDocument();
    const theDate = screen.getByText(`${messages.configBar.raceDateLabel}: (${aRaceDate})`);
    expect(theDate).toBeInTheDocument();
    

    const acceptBtn = screen.getByRole('button', {name: messages.commons.btnAcept})
    expect(acceptBtn).toBeInTheDocument();

    fireEvent.click(acceptBtn);

    const heading2 =  screen.queryByRole('heading', { level: 2, name: messages.configBar.setFavoriteTitle});
    expect(heading2).not.toBeInTheDocument();

    expect(props.dispatch).toHaveBeenCalledTimes(1);
  });
});
