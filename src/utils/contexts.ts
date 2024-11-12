import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface Payment {
	success?: boolean;
	attempts?: number;
	message?: string;
}

interface FormSessionType {
	payment?: Payment;
}

interface FormContextType {
	formSession?: FormSessionType;
	setFormSession?: (session: FormSessionType) => void;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);