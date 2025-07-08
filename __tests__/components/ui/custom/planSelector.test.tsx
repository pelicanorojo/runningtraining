/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-07T11:25:16-03:00
 */


import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {  TrainingPlanThinFront } from "@/types/global";
import { trainingPlansAvailableFront } from "@/lib/constants";
import * as configModule from '@/contexts/config';


const locale = 'en';

const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[locale][1];

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

import PlanSelector from '@/components/ui/custom/planSelector';

describe('Plan Selector ...', () => {
  it('Should render without a plan selected, show placeholder.', () => {
    const thePlaceHolder = 'The plan placeholder';
    render(<PlanSelector availablePlans={trainingPlansAvailableFront[locale]} placeHolder={thePlaceHolder}/>);
    const theText = screen.getByText(thePlaceHolder);
    expect(theText).toBeInTheDocument();
  })

  it('Should render without a plan selected, should list once each training plan all unselected when unfolded.', () => {
    render(<PlanSelector availablePlans={trainingPlansAvailableFront[locale]}/>);

    const combo = screen.getByRole('combobox');

    fireEvent.click(combo);


    const options = screen.getAllByRole('option');

    trainingPlansAvailableFront[locale].forEach( (plan, index) => {
      expect(options[index]).toHaveTextContent(plan.label);
    })

    //const checkedOptions = screen.getAllByRole('option', {selected: true}); dig more, if all un select, explode instead of return an empty array.

    const checkedOptions = options.filter(
      container => container.getAttribute('data-state') === 'checked'
    );

   expect(checkedOptions.length).toBe(0);
  })

  it('Should render with a plan selected.', () => {

    render(<PlanSelector availablePlans={trainingPlansAvailableFront[locale]} selectedPlanId={aTrainingPlan.id} />);

    const theText = screen.getByText(aTrainingPlan.label);
    expect(theText).toBeInTheDocument();
  })

  it('Should render with a plan selected, should list once each training plan when unfolded, with the selected one checked.', () => {
    const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[locale][0];

    render(<PlanSelector availablePlans={trainingPlansAvailableFront[locale]}  selectedPlanId={aTrainingPlan.id} />);

    const combo = screen.getByRole('combobox');

    fireEvent.click(combo);

    const theText = screen.getAllByText(aTrainingPlan.label);
    expect(theText.length).toBe(2);

    // Find all options with the "checked" state
    const checkedOptions = screen.getAllByRole('option').filter(
      container => container.getAttribute('data-state') === 'checked'
    );

    expect(checkedOptions.length).toBe(1);
  })

  it('Should dispatch an action when is selected an option', () => {
    render(<PlanSelector availablePlans={trainingPlansAvailableFront[locale]}/>);

    const combo = screen.getByRole('combobox');

    fireEvent.click(combo);

    const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[locale][2];

    // Filter options by text
    const optionElement = screen.getAllByRole('option').filter(option => {
      return option.textContent?.includes(aTrainingPlan.label);
    });
    
    fireEvent.click(optionElement[0]);
    expect(dispatchFnMock).toHaveBeenCalledTimes(1);
    expect(dispatchFnMock).toHaveBeenCalledWith({ type: 'CHANGE_PLAN', payload: {trainingPlanId: aTrainingPlan.id} });
  })
});
