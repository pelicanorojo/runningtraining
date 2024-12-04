/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-27T01:21:04-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-03T10:29:03-03:00
 */


import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TrainingSchedule from '@/components/ui/custom/trainingSchedule';
import { RawPlanData } from "@/types/global";
import { generateScheduleFromPlan } from '@/lib/helpers';
import aRawPlanData from  "@/data/plans/test.json";

//TODO: show the dates in a shape selectable by the user.

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const unSearcheableString = 'unSearcheableString';

describe('TrainingSchedule ...', () => {
  it('Should render with its childs initialized with the param initialState, with the right number of items, with no item selected.',  () => {

    const planData = aRawPlanData as RawPlanData;
    const raceDate = '2025-03-11';
    const aDayBeforeRaceDate = '2025-03-10';

    const scheduledTrainings = generateScheduleFromPlan(planData, raceDate);
    const lastTraining = scheduledTrainings[0];

    render(<TrainingSchedule scheduledTrainings={scheduledTrainings} onOrderChange={() => {}}/>)

    let theText = screen.queryByText(raceDate);
    expect(theText).not.toBeInTheDocument();

    theText = screen.getByText(aDayBeforeRaceDate);
    expect(theText).toBeInTheDocument();

    theText = screen.getByText(lastTraining.trainingDate);
    expect(theText).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toEqual(scheduledTrainings.length);

    theText = screen.queryByTestId(lastTraining.trainingDate);
    expect(theText).not.toBeInTheDocument();
  })

  it('Should be rendered with an item selected.', () => {
    const planData = aRawPlanData as RawPlanData;
    const raceDate = '2025-03-11';
    const scheduledTrainings = generateScheduleFromPlan(planData, raceDate);
    const trainingOrder = '2';
    const nTrainingOrder = parseInt(trainingOrder, 10)
    const aTraining = scheduledTrainings.find( t => t.order === nTrainingOrder);

    let theText = null;

    render(<TrainingSchedule scheduledTrainings={scheduledTrainings} order={nTrainingOrder} onOrderChange={() => {}}/>)

    theText = screen.getByText(aTraining?.trainingDate || unSearcheableString);
    expect(theText).toBeInTheDocument();

    theText = screen.getByTestId(aTraining?.trainingDate || unSearcheableString);
    expect(theText).toBeInTheDocument();
  })

  it('Should not navigate if clicked an item already selected.', () => {
    const mockEventHandler = jest.fn();


    const planData = aRawPlanData as RawPlanData;
    const raceDate = '2025-03-11';

    const scheduledTrainings = generateScheduleFromPlan(planData, raceDate);
    const trainingOrder = '2';
    const nTrainingOrder = parseInt(trainingOrder, 10)
    const aTraining = scheduledTrainings.find( t => t.order === nTrainingOrder);

    render(<TrainingSchedule scheduledTrainings={scheduledTrainings}  order={nTrainingOrder} onOrderChange={mockEventHandler} />)

    const theSelected = screen.getByTestId(aTraining?.trainingDate || unSearcheableString);

    fireEvent.click(theSelected);
    expect(mockEventHandler).not.toHaveBeenCalled();
  })

  it('Should dispatch event if clicket an order different to the selected one.', () => {
    const mockEventHandler = jest.fn();

    const planData = aRawPlanData as RawPlanData;
    const raceDate = '2025-03-11';
    const scheduledTrainings = generateScheduleFromPlan(planData, raceDate);
    const trainingOrder = 2;

    const otherTrainingOrder = 3;
    const otherTraining = scheduledTrainings.find( t => t.order === otherTrainingOrder); 

    render(<TrainingSchedule scheduledTrainings={scheduledTrainings}  order={trainingOrder} onOrderChange={mockEventHandler} />)

    const theItemToClick = screen.getByText(otherTraining?.trainingDate || unSearcheableString);

    fireEvent.click(theItemToClick);
    expect(mockEventHandler).toHaveBeenCalledWith(otherTrainingOrder);
    expect(mockEventHandler).toHaveBeenCalledTimes(1);
  })
});
