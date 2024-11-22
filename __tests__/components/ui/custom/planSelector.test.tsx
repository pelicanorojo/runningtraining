/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-21T11:35:59-03:00
 */


import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PlanSelector from '@/components/ui/custom/planSelector';
import {TrainingPlanThinFrontList, TrainingPlanThinFront} from "@/types/global";
import {trainingPlansAvailableBack} from "@/lib/constants";
import  {useRouter } from 'next/navigation';
import paths from '@/lib/paths';


const trainingPlansAvailableFront:TrainingPlanThinFrontList = trainingPlansAvailableBack.map( p => {
  return {id: p.id, label: p.label};
})

//const recreateMocks = () => {
  //jest.clearAllMocks();
//TODO: check how mock in an between tests decoupled way, but sharing a given text mock instance, with the used by the component tested.
  const sharedRouterMock = jest.fn();

  jest.mock('next/navigation', () => ({
    __esModule: true,
    useRouter: () => ({
      push: sharedRouterMock,
    }),
  }));    
//};
//recreateMocks();

describe('Plan Selector ...', () => {


  it('Should render without a plan selected, show placeholder.', () => {
    render(<PlanSelector availablePlans={trainingPlansAvailableFront}/>);
    const theText = screen.getByText('Select training plan');
    expect(theText).toBeInTheDocument();
  })

  it('Should render without a plan selected, should list once each training plan all unselected when unfolded.', () => {
    render(<PlanSelector availablePlans={trainingPlansAvailableFront}/>);

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
    const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[1];

    render(<PlanSelector availablePlans={trainingPlansAvailableFront} selectedPlanId={aTrainingPlan.id}/>);

    const theText = screen.getByText(aTrainingPlan.label);
    expect(theText).toBeInTheDocument();
  })

  it('Should render with a plan selected, should list once each training plan when unfolded, with the selected one checked.', () => {
    const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[0];

    render(<PlanSelector availablePlans={trainingPlansAvailableFront}  selectedPlanId={aTrainingPlan.id} />);

    const combo = screen.getByRole('combobox');

    fireEvent.click(combo);

    const theText = screen.getAllByText(aTrainingPlan.label);
    expect(theText.length).toBe(2);

    // Find all options with the "checked" state
    const checkedOptions = screen.getAllByRole('option').filter(
      container => container.getAttribute('data-state') === 'checked'
    );

    expect(checkedOptions.length).toBe(1);

    /*
    const componentHtml = screen.debug();
    console.log(componentHtml);
    //*/
  })

  it('Should navigate when is selected an option', async () => {
    render(<PlanSelector availablePlans={trainingPlansAvailableFront}/>);

    const combo = screen.getByRole('combobox');

    fireEvent.click(combo);

    const aTrainingPlan: TrainingPlanThinFront = trainingPlansAvailableFront[2];
    const aRoute = paths.trainingPlanShow(aTrainingPlan.id)

    // Filter options by text
    const optionElement = screen.getAllByRole('option').filter(option => {
      return option.textContent.includes(aTrainingPlan.label);
    });
    
    fireEvent.click(optionElement[0]);
    const router = useRouter();

    expect(router.push).toHaveBeenCalledWith(aRoute);
  })
});
