/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-21T11:35:31-03:00
 */


import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import Header from '@/components/ui/custom/header';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Header testing...', () => {
  it('Should render header properly', () => {
    render(<Header />);
    const header = screen.getByRole('header');
    expect(header).toBeInTheDocument();
  })
});