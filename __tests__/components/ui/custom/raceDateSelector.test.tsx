/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-23T01:02:15-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-27T08:32:36-03:00
 */


import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import RaceDateSelector from '@/components/ui/custom/raceDateSelector';
import { useReducer } from 'react';
//TODO: show the dates in a shape selectable by the user.

//const recreateMocks = () => {
  //jest.clearAllMocks();
//TODO: check how mock in an between tests decoupled way, but sharing a given text mock instance, with the used by the component tested.
//*

  jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useReducer: jest.fn(),
  }));  
  //*/ 
//};
//recreateMocks();

describe('RaceDate Selector ...', () => {
  it('Should render without a date selected', () => {
    render(<RaceDateSelector raceDate={undefined} dispatch={jest.fn()}/>);
    const theDate = screen.getByDisplayValue('')
    expect(theDate).toBeInTheDocument(); 
  })

  it('Should render with a date selected.', () => {
    const aRaceDate = '2025-11-11'
    render(<RaceDateSelector raceDate={aRaceDate} dispatch={jest.fn()}/>);
    const theDate = screen.getByDisplayValue(aRaceDate)
    expect(theDate).toBeInTheDocument();
  })

  it('Should dispatch an action when is selected a RaceDate',  () => {
    const mockDispatch = jest.fn();
    jest.mocked(useReducer).mockReturnValue([{ }, mockDispatch]);

    const aDate = '2024-11-01'
    render(<RaceDateSelector raceDate={aDate}  dispatch={mockDispatch}/>);

    const theDate = screen.getByDisplayValue(aDate)
    fireEvent.click(theDate);

    const otherDate = '2024-11-02';
    fireEvent.change(theDate, {target: {value: otherDate}});


    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CHANGE_RACEDATE', payload: {raceDate: otherDate} });
  })
});
