/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-31T08:40:44-03:00
 */


import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { defaultLocale } from '@/lib/constants';
import messages from '@/i18n/messages/en.json';
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


//import { useSession, signIn, signOut } from "next-auth/react";
jest.mock('next-auth/react', () => ({
  useSession: () => jest.fn(),
  signIn: () => jest.fn(),
  signOut: () => jest.fn(),
}));

import Layout from '@/components/ui/custom/layout';

describe('Renders layout properly', () => {
  it('Should render Header, Main with Child, and Footer', async () => {

    const MockChild = () => <div>Child Content</div>;

    render(
      <NextIntlClientProvider messages={messages} locale={defaultLocale}>
        <Layout>
          <MockChild />
        </Layout>
      </NextIntlClientProvider>
      
    );

    const header = screen.getByRole('header');
    const main = screen.getByRole('main');
    const footer = screen.getByRole('footer');
    const childElement = screen.getByText('Child Content');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
  });
});
