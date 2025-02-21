/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-20T10:25:48-03:00
 */


import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import Header from '@/components/ui/custom/header';
import {NextIntlClientProvider} from 'next-intl';
import { defaultLocale } from '@/lib/constants';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useParams: () => jest.fn(),
  usePathname: () => ({
    startsWith: jest.fn()
  }),
}));

//import { useSession, signIn, signOut } from "next-auth/react";
jest.mock('next-auth/react', () => ({
  useSession: () => jest.fn(),
  signIn: () => jest.fn(),
  signOut: () => jest.fn(),
}));

describe('Header testing...', () => {
  it('Should render header properly', () => {

    render(
      <NextIntlClientProvider messages={{}} locale={defaultLocale}>
        <Header title="Page name"/>
      </NextIntlClientProvider>
    );

    const header = screen.getByRole('header');
    expect(header).toBeInTheDocument();
  })
});