/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-21T11:35:46-03:00
 */


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