/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-23T01:02:15-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-08-05T12:46:37-03:00
 */


import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { uString } from "@/types/global";


const onChangeDateMock = jest.fn();

beforeEach(() => {
  //jest.clearAllMocks();// Clean the mock calls and instances
  jest.resetAllMocks(); // Clean any mock implementation
  //jest.restoreAllMocks(); // IMPORTANT: This cleans up the spy
});

import RaceDateSelector from '@/components/ui/custom/raceDateSelector';
describe('RaceDate Selector ...', () => {
  it('Should render without a date selected', () => {
    render(<RaceDateSelector raceDate={undefined} onChangeDate={onChangeDateMock}/>);
    const theDate = screen.getByDisplayValue('')
    expect(theDate).toBeInTheDocument(); 
  })

  it('Should render with a date selected.', () => {
    const aRaceDate = '2025-11-11'
    render(<RaceDateSelector raceDate={aRaceDate} onChangeDate={onChangeDateMock}/>);
    const theDate = screen.getByDisplayValue(aRaceDate)
    expect(theDate).toBeInTheDocument();
  })

  it('Should dispatch an action when is selected a RaceDate',  () => {
    onChangeDateMock.mockImplementation((date: uString) => {});

    const aDate = '2024-11-01'
    render(<RaceDateSelector raceDate={aDate} onChangeDate={onChangeDateMock}/>);

    const theDate = screen.getByDisplayValue(aDate)
    fireEvent.click(theDate);

    const otherDate = '2024-11-02';
    fireEvent.change(theDate, {target: {value: otherDate}});

    expect(onChangeDateMock).toHaveBeenCalledTimes(1);
    expect(onChangeDateMock).toHaveBeenCalledWith(otherDate);
  })
});
