import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import Header from '@/components/ui/custom/header';


describe('Header testing...', () => {
  it('Should render header properly', () => {
    render(<Header />);
    const header = screen.getByRole('header');
    expect(header).toBeInTheDocument();
  })
});