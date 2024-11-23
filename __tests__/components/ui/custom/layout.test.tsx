/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-21T11:35:53-03:00
 */


import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Layout from '@/components/ui/custom/layout';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Renders layout properly', () => {
  it('Should render Header, Main with Child, and Footer', () => {

    const MockChild = () => <div>Child Content</div>;

    render(
      <Layout>
        <MockChild />
      </Layout>
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
