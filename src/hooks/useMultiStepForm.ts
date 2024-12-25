import { useFormStore } from '@/stores/formStore';
import { ReactElement } from 'react';

export function useMultistepForm(steps: ReactElement[]) {
	const currentStepIndex = useFormStore.getState().currentStepIndex;
	const currentFormStep = useFormStore.getState().currentFormStep;
	const gotoNextStep = useFormStore.getState().gotoNextStep;
	const gotoPrevStep = useFormStore.getState().gotoPrevStep;
	const setCurrentFormStepNext =
		useFormStore.getState().setCurrentFormStepNext;
	const setCurrentFormStepBack =
		useFormStore.getState().setCurrentFormStepBack;

	function next() {
		gotoNextStep();
	}

	function back() {
		gotoPrevStep();
	}

	function goTo() {
		gotoNextStep();
	}

	return {
		setCurrentFormStepNext,
		setCurrentFormStepBack,
		currentStepIndex,
		currentFormStep,
		step: steps[currentStepIndex],
		steps,
		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,
		goTo,
		next,
		back,
	};
}
