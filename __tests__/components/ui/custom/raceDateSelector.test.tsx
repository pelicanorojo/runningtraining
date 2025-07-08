/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-23T01:02:15-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-07T11:25:55-03:00
 */


import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import * as configModule from '@/contexts/config';

const dispatchFnMock = jest.fn();
const useConfigDispatchMock = jest.fn(() => dispatchFnMock); // here useConfigDispatchMock (...args: any[]) => any
// Except I manually do: const useConfigDispatchMock: jest.Mock<() => (action: { type: string }) => void> = jest.fn(); assuming is the right signature


// mock implementation
jest.mock('@/contexts/config', () => {
  const originalModule =
    jest.requireActual<typeof import('@/contexts/config')>('@/contexts/config');

  return {
    __esModule: true,
    ...originalModule,
    // this is needed for overwrite the one on ...originalModule. Actually could be useConfigDispatchMock, but this way we separate the wiring from the implementation,
    //  which could be insided each test for instance.
    useConfigDispatch: jest.fn() // this is a placeholder that jest.mocked will replace with a right signature on mockedConfig.useConfigDispatch (needed cause is a partial mock, if weren't , wouldnt needed.)
  }
});

// pick right types from configModule, the one to mock
const mockedConfig = jest.mocked(configModule);

// 🛠 Override the `useConfigDispatch` mock implementation
mockedConfig.useConfigDispatch.mockImplementation(useConfigDispatchMock); // useConfigDispatchMock is just the implementation, just needed be called the right way, and return the right type.


beforeEach(() => {
  jest.clearAllMocks();
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
    const aDate = '2024-11-01'
    render(<RaceDateSelector raceDate={aDate}/>);

    const theDate = screen.getByDisplayValue(aDate)
    fireEvent.click(theDate);

    const otherDate = '2024-11-02';
    fireEvent.change(theDate, {target: {value: otherDate}});

    expect(dispatchFnMock).toHaveBeenCalledTimes(1);
    expect(dispatchFnMock).toHaveBeenCalledWith({ type: 'CHANGE_RACEDATE', payload: {raceDate: otherDate} });
  })
});
