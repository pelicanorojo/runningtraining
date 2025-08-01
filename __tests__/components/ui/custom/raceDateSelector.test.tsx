/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-23T01:02:15-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-31T12:08:27-03:00
 */


import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { useAppStore } from '@/stores/useAppStore';

// No mock needed by now for the store, simply spy, and use the helper reset.
beforeEach(() => {
  jest.clearAllMocks();
  const state = useAppStore.getState();
  state.reset();
});

afterEach(() => {
  jest.restoreAllMocks(); // IMPORTANT: This cleans up the spy
});

// Despite Jest hoists jest.mock, best practice is to write the module to test, which use the mock after the mock.
// cause no root jest.mock, arent hoisted, like ones on beforeEach for instance. 
import RaceDateSelector from '@/components/ui/custom/raceDateSelector';
describe('RaceDate Selector ...', () => {
  it('Should render without a date selected', () => {
    render(<RaceDateSelector raceDate={undefined}/>);
    const theDate = screen.getByDisplayValue('')
    expect(theDate).toBeInTheDocument(); 
  })

  it('Should render with a date selected.', () => {
    const aRaceDate = '2025-11-11'
    render(<RaceDateSelector raceDate={aRaceDate}/>);
    const theDate = screen.getByDisplayValue(aRaceDate)
    expect(theDate).toBeInTheDocument();
  })

  it('Should dispatch an action when is selected a RaceDate',  () => {
    const actionSpy = jest.spyOn(useAppStore.getState(), 'setRaceDateAction');

    const aDate = '2024-11-01'
    render(<RaceDateSelector raceDate={aDate}/>);

    const theDate = screen.getByDisplayValue(aDate)
    fireEvent.click(theDate);

    const otherDate = '2024-11-02';
    fireEvent.change(theDate, {target: {value: otherDate}});

    expect(actionSpy).toHaveBeenCalledTimes(1);
    expect(actionSpy).toHaveBeenCalledWith(otherDate);
  })
});
