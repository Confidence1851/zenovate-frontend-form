import { useFormStore } from "@/stores/formStore";
import { ReactElement } from "react";

export function useMultistepForm(steps: ReactElement[]) {
  const currentStepIndex = useFormStore.getState().currentStepIndex;
  const gotoNextStep = useFormStore.getState().gotoNextStep;
  const gotoPrevStep = useFormStore.getState().gotoPrevStep;

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
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}
