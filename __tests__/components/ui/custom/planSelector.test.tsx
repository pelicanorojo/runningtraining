/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-23T01:30:28-03:00
 */


import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PlanSelector from '@/components/ui/custom/planSelector';
import {PlanConfig, TrainingPlanThinFrontList, TrainingPlanThinFront} from "@/types/global";
import {trainingPlansAvailableBack} from "@/lib/constants";
import { useReducer } from 'react';

const trainingPlansAvailableFront:TrainingPlanThinFrontList = trainingPlansAvailableBack.map( p => {
  return {id: p.id, label: p.label};
})

const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[1];

//const recreateMocks = () => {
  //jest.clearAllMocks();
//TODO: check how mock in an between tests decoupled way, but sharing a given text mock instance, with the used by the component tested.
//*
  const sharedRouterMock = jest.fn();

  jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useReducer: jest.fn(),
  }));  
  //*/ 
//};
//recreateMocks();

describe('Plan Selector ...', () => {
  it('Should render without a plan selected, show placeholder.', () => {
    render(<PlanSelector availablePlans={trainingPlansAvailableFront} dispatch={jest.fn()}/>);
    const theText = screen.getByText('Select training plan');
    expect(theText).toBeInTheDocument();
  })

  it('Should render without a plan selected, should list once each training plan all unselected when unfolded.', () => {
    render(<PlanSelector availablePlans={trainingPlansAvailableFront} dispatch={jest.fn()}/>);

    const combo = screen.getByRole('combobox');

    fireEvent.click(combo);


    const options = screen.getAllByRole('option');

    trainingPlansAvailableFront.forEach( (plan, index) => {
      expect(options[index]).toHaveTextContent(plan.label);
    })

    //const checkedOptions = screen.getAllByRole('option', {selected: true}); dig more, if all un select, explode instead of return an empty array.

    const checkedOptions = options.filter(
      container => container.getAttribute('data-state') === 'checked'
    );

   expect(checkedOptions.length).toBe(0);
  })

  it('Should render with a plan selected.', () => {

    render(<PlanSelector availablePlans={trainingPlansAvailableFront} selectedPlanId={aTrainingPlan.id} dispatch={jest.fn()}/>);

    const theText = screen.getByText(aTrainingPlan.label);
    expect(theText).toBeInTheDocument();
  })

  it('Should render with a plan selected, should list once each training plan when unfolded, with the selected one checked.', () => {
    const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[0];

    render(<PlanSelector availablePlans={trainingPlansAvailableFront}  selectedPlanId={aTrainingPlan.id} dispatch={jest.fn()} />);

    const combo = screen.getByRole('combobox');

    fireEvent.click(combo);

    const theText = screen.getAllByText(aTrainingPlan.label);
    expect(theText.length).toBe(2);

    // Find all options with the "checked" state
    const checkedOptions = screen.getAllByRole('option').filter(
      container => container.getAttribute('data-state') === 'checked'
    );

    expect(checkedOptions.length).toBe(1);

    
    //const componentHtml = screen.debug();
    //console.log(componentHtml);
    //
  })

  it('Should dispatch an action when is selected an option', async () => {
    const mockDispatch = jest.fn();
    jest.mocked(useReducer).mockReturnValue([{ }, mockDispatch]);

    const state: PlanConfig  = {
      trainingPlanId: undefined,
      raceDate: undefined
    }

    render(<PlanSelector availablePlans={trainingPlansAvailableFront} dispatch={mockDispatch}/>);

    const combo = screen.getByRole('combobox');

    fireEvent.click(combo);

    const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[2];

    // Filter options by text
    const optionElement = screen.getAllByRole('option').filter(option => {
      return option.textContent.includes(aTrainingPlan.label);
    });
    
    fireEvent.click(optionElement[0]);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CHANGE_PLAN', payload: {trainingPlanId: aTrainingPlan.id} });
  })
});
