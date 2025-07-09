/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-07T11:24:05-03:00
 */


import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import {NextIntlClientProvider} from 'next-intl';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useParams: () => jest.fn(),
  usePathname: () => ({
    startsWith: jest.fn()
  }),
}));

import LanguageSwitcher from '@/components/ui/custom/languageSwitcher';

describe('LanguageSwitcher', () => {
  it('Should render with locale en as selected', () => {

    render(
      <NextIntlClientProvider messages={{}} locale={'en'}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    );

    const theText = screen.getByText('English');
    expect(theText).toBeInTheDocument();
  })

  it('Should render with locale es as selected', () => {

    render(
      <NextIntlClientProvider messages={{}} locale={'es'}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    );
    const theText = screen.getByText('Español');
    expect(theText).toBeInTheDocument();
  })

  it('Should render with a language selected, should list once each language when unfolded, with the selected one checked.', () => {
    const selectedLocale = 'en';
    const languageName = 'English';
    render(
      <NextIntlClientProvider messages={{}} locale={selectedLocale}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    );

    const combo = screen.getByRole('combobox');
    
    fireEvent.click(combo);

    const theText = screen.getAllByText(languageName);
    expect(theText.length).toBe(2);

    // Find all options with the "checked" state
    const checkedOptions = screen.getAllByRole('option').filter(
      container => container.getAttribute('data-state') === 'checked'
    );

    expect(checkedOptions.length).toBe(1);
  });
});
