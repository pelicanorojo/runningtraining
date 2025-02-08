/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-06T12:00:44-03:00
 */


import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Layout from '@/components/ui/custom/layout';
import { defaultLocale } from '@/lib/constants';
import messages from '../../../../messages/en.json';
import {NextIntlClientProvider} from 'next-intl';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

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
