import React from "react";
import { formSidebarMenu } from "@/utils/form";
import { useFormStore } from "@/stores/formStore";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";


const FormProgressBar = ({ className }: { className: string }) => {
  const stepHighlight = useFormStore.getState().stepHighlight;
  const setCurrentStepIndex = useFormStore.getState().setCurrentStepIndex;
  return (
    <div className={cn(className, "flex gap-4 items-center w-full py-4")}>
      {formSidebarMenu.map((item, i) => (
        <Button
          key={i}
          variant={"formstep"}
          className={`
            ${item.stepHighlights === stepHighlight
              ? "bg-Green-100"
              : "bg-Gray-400"
            } h-1 w-12 rounded-sm transition-all duration-500 p-0 hover:bg-current `}
          onClick={() => {
            setCurrentStepIndex(i);
          }}
        />
      ))}
    </div>
  );
};

export default FormProgressBar;
