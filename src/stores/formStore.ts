import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FormState {
	formData: Record<string, any>;
	currentStepIndex: number;
	sessionId: string;
	totalPrice: number;
	selectedProducts: Product[];
	stepHighlight: Highlights;
	paid: boolean;
}
interface FormActions {
	updateFormData: (field: string, value: any) => void;
	setSelectedProducts: (data: Record<string, any>) => void;
	setFormData: (data: Record<string, any>) => void;
	setSessionId: (id: string) => void;
	gotoNextStep: () => void;
	gotoPrevStep: () => void;
	setCurrentStepIndex: (index: number) => void;
	updateSelectedProducts: (product: Product) => void;
	updateStepHighlight: (step: Highlights) => void;
	updatePaid: () => void;
}

const useFormStore = create(
	persist<FormState & FormActions>(
		(set) => ({
			formData: {},
			currentStepIndex: 0,
			sessionId: '',
			totalPrice: 0,
			selectedProducts: [],
			stepHighlight: 'info',
			paid: true,
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
		}),

		{
			name: 'form-storage',
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				// console.log("Starting rehydration. Initial state:", state);
				// console.log("Hydration complete. Rehydrated state:", state);
			},
		},
	),
);

export { useFormStore };
