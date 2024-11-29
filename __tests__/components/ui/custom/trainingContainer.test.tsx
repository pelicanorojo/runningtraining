/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-29T12:04:38-03:00
 */


import '@testing-library/jest-dom';
import { waitFor, render, screen } from '@testing-library/react';
import TrainingContainer, { TrainingContainerHeader, TrainingContainerFooter } from '@/components/ui/custom/trainingContainer';
import { TrainingPathData } from '@/types/global';
import { aSampleTrainingData } from '@/lib/mockConstants';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const unSearcheableString = 'unSearcheableString';

describe('TrainingContainerHeader ...', () => {
  it('Should render with not null trainingData properly.', () => {
    
    const trainingData = aSampleTrainingData;
    const title = trainingData?.workoutName;
    const subTitle = trainingData?.trainingNotes.noteSummary;
    const subsubTitle = `(Training Order ${trainingData?.order || '?'}, Date ${trainingData?.trainingDate || '?'})`;

    render(<TrainingContainerHeader trainingData={trainingData}/>);

    const header = screen.getByText(title || unSearcheableString);
    expect(header).toBeInTheDocument();

    const subHeader1 = screen.getByText(subTitle || unSearcheableString);
    expect(subHeader1).toBeInTheDocument();

    const subHeader2 = screen.getByText(subsubTitle || unSearcheableString);
    expect(subHeader2).toBeInTheDocument();
  })
});

describe('TrainingContainerFooter ...', () => {
  it('Should render with not null trainingData properly.', () => {
    
    const trainingData = aSampleTrainingData;
    const headerText = trainingData?.trainingNotes.noteSummary;
    const headerSubtitle1 = trainingData?.trainingNotes.note;
    const headerSubtitle2 = trainingData?.trainingNotes.secondaryNote;

    render(<TrainingContainerFooter trainingData={trainingData}/>);

    const header = screen.getByText(headerText || unSearcheableString);
    expect(header).toBeInTheDocument();

    const subHeader1 = screen.getByText(headerSubtitle1 || unSearcheableString);
    expect(subHeader1).toBeInTheDocument();

    const subHeader2 = screen.getByText(headerSubtitle2 || unSearcheableString);
    expect(subHeader2).toBeInTheDocument();
  })
});

describe('TrainingContainer ...', () => {
  it('Should works well without trainingOrder', async () => {
    const pathData: TrainingPathData = {
      trainingPlanId: 'noMatters',
      raceDate: 'noMatters',
      //trainingOrder: 1 // should be defined but not used, on mock except for check if present
    };

    render(<TrainingContainer pathData={pathData}/>);
    const content = screen.getByTestId('emptyCardContent');
    expect(content).toBeInTheDocument();    
  })

  it('Should works well with trainingOrder', async () => {
    const pathData: TrainingPathData = {
      trainingPlanId: 'noMatters',
      raceDate: 'noMatters',
      trainingOrder: 1 // should be defined but not used, on mock except for check if present
    };

    render(<TrainingContainer pathData={pathData}/>);

    //initially
    const content = screen.getAllByTestId('emptyCardContent');
    expect(content.length).toBe(1);

    //after fetch
    await waitFor(() => {
      const content = screen.getAllByTestId('trainingContainerHeader');
      expect(content.length).toBe(1);
    });
  })
});
