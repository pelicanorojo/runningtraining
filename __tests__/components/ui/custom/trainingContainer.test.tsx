/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-07T08:57:38-03:00
 */

global.Element.prototype.scrollIntoView = jest.fn();

import '@testing-library/jest-dom';
import { waitFor, render, screen, fireEvent, act } from '@testing-library/react';
import TrainingContainer, { TrainingContainerHeader, TrainingContainerFooter } from '@/components/ui/custom/trainingContainer';
import { KnownLocales, PlanDataParams } from '@/types/global';
import { aSampleTrainingData, aLongSampleTrainingData } from '@/lib/mockConstants';
import {NextIntlClientProvider} from 'next-intl';

import messages from '../../../../messages/en.json';


// @ts-expect-error cause yes.
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(aSampleTrainingData),
  })
);
const locale: KnownLocales = 'en';
const unSearcheableString = 'unSearcheableString';

describe('TrainingContainerHeader ...', () => {
  it('Should render with not null trainingData properly.', () => {
    
    const trainingData = aSampleTrainingData;
    const title = trainingData?.workoutName;
    const subTitle = trainingData?.trainingNotes.noteSummary;
    const subsubTitle = `(Training Order ${trainingData?.order || '?'}, Date ${trainingData?.trainingDate || '?'})`;

    render(
        <TrainingContainerHeader trainingData={trainingData}/>
    );

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
    const planParams: PlanDataParams = {
      trainingPlanId: 'test',
      raceDate: '2024-12-12'
    }
    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <TrainingContainer  scheduledTrainings={aLongSampleTrainingData} planDataParams={planParams} />
      </NextIntlClientProvider>
    );

    const content = screen.getByTestId('emptyCardContent');
    expect(content).toBeInTheDocument();
  })

  
  it('Should works well with trainingOrder', async () => {
    const planParams: PlanDataParams = {
      trainingPlanId: 'test',
      raceDate: '2025-03-11'
    }

    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <TrainingContainer  scheduledTrainings={aLongSampleTrainingData} planDataParams={planParams} />
      </NextIntlClientProvider>
    );
    
    //initially
    const content = screen.getAllByTestId('emptyCardContent');
    expect(content.length).toBe(1);

    const aTrainingOrder = 3;
    const training = aLongSampleTrainingData.find( t => t.order === aTrainingOrder); 
    const theItemToClick = screen.getByText(training?.trainingDate || unSearcheableString);

    fireEvent.click(theItemToClick);

    //after fetch
    await waitFor(() => {
      const content = screen.getAllByTestId('trainingContainerHeader');
      expect(content.length).toBe(1);
    });
  })
  
});
