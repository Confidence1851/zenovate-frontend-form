import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FormState {
	formData: Record<string, any>;
	fields: Record<string, any>;
	currentStepIndex: number;
	sessionId: string;
	totalPrice: number;
	selectedProducts: Product[];
	stepHighlight: Highlights;
	paid: boolean;
}
interface FormActions {
	setField: (field: string, value: any) => void;
	updateFormData: (field: string, value: any) => void;
	setSelectedProducts: (data: Product[]) => void;
	setFormData: (data: Record<string, any>) => void;
	setSessionId: (id: string) => void;
	gotoNextStep: () => void;
	gotoPrevStep: () => void;
	setCurrentStepIndex: (index: number) => void;
	updateSelectedProducts: (product: Product) => void;
	updateStepHighlight: (step: Highlights) => void;
	updatePaid: () => void;
	resetState: () => void;
}



const useFormStore = create(
	persist<FormState & FormActions>(
		(set) => ({
			fields: {},
			formData: {},
			currentStepIndex: 0,
			sessionId: '',
			totalPrice: 0,
			selectedProducts: [],
			stepHighlight: 'info',
			paid: false,
			updatePaid: () => set({ paid: true }),
			updateStepHighlight: (step: Highlights) =>
				set({ stepHighlight: step }),
			updateSelectedProducts: (product) => {
				set((state) => {
					const check = state.selectedProducts.find(
						(item) => item === product,
					);
					const updatedProducts = check
						? state.selectedProducts.filter(
							(item) =>
								item.name.toLowerCase() !==
								product.name.toLowerCase(),
						)
						: [...state.selectedProducts, product];

					const updatedPrice = check
						? state.totalPrice - product.price
						: state.totalPrice + product.price;

					return {
						selectedProducts: updatedProducts,
						totalPrice: updatedPrice,
					};
				});
			},
			updateFormData: (field: string, value: any) =>
				set((state) => {
					const newState = {
						formData: { ...state.formData, [field]: value },
					};
					return newState;
				}),
			setField: (field: string, value: any) =>
				set((state) => {
					const newState = {
						fields: { ...state.fields, [field]: value },
					};
					return newState;
				}),
			setFormData: (data) => set(() => ({ formData: data })),
			setSelectedProducts: (data) => set(() => ({ selectedProducts: data })),
			gotoNextStep: () =>
				set((state) => ({
					currentStepIndex: state.currentStepIndex + 1,
				})),
			gotoPrevStep: () =>
				set((state) => ({
					currentStepIndex: state.currentStepIndex - 1,
				})),
			setCurrentStepIndex: (index: number) =>
				set(() => ({ currentStepIndex: index })),
			setSessionId: (id: string) =>
				set(() => ({ sessionId: id })),
			resetState: () => {
				set(() => ({
					fields: {},
					formData: {},
					currentStepIndex: 0,
					sessionId: '',
					totalPrice: 0,
					selectedProducts: [],
					stepHighlight: 'info',
					paid: false
				}))
			}
		}),

		{
			name: 'form-storage',
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				// 
			},
		},
	),
);

export { useFormStore };
