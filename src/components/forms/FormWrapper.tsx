import { ReactNode } from "react";

type FormWrapperProps = {
  children: ReactNode;
  formTitle: string;
  formSubtitle?: string;
};

const FormWrapper = ({
  children,
  formSubtitle,
  formTitle,
}: FormWrapperProps) => {
  return (
    <>
      <div className="mb-8 space-y-1 border-b border-Gray-400 pb-8">
        <h1 className="title t-h1">
          {formTitle}
        </h1>
        {formSubtitle && (
          <h3 className="title t-h3">
            {formSubtitle}
          </h3>
        )}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </>
  );
};

export default FormWrapper;
