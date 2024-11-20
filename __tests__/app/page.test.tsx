import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '@/app/page';
 
describe('Page', () => {
  const setup = () =>  render(<Page />);

  it('renders a heading', () => {
    setup();
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})