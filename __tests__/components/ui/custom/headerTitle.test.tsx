import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HeaderTitle from '@/components/ui/custom/headerTitle';

describe('HeaderTitle testing...', () => {
  it('Should render HeaderTitle properly', () => {
    const theTitle = 'A beautiful Title';

    render(<HeaderTitle title={theTitle} />);

    const title = screen.getByText(theTitle);
    expect(title).toBeInTheDocument();
  })
});