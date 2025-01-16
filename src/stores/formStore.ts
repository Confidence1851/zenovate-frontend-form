import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FormState {
	formData: Record<string, any>;
	fields: Record<string, any>;
	currentStepIndex: number;
	currentFormStep: number;
	sessionId: string;
	selectedProducts: SelectedProduct[];
	stepHighlight: Highlights;
	paid: boolean;
}
interface FormActions {
	setField: (field: string, value: any) => void;
	updateFormData: (field: string, value: any) => void;
	setSelectedProducts: (data: SelectedProduct[]) => void;
	setFormData: (data: Record<string, any>) => void;
	setSessionId: (id: string) => void;
	gotoNextStep: () => void;
	gotoPrevStep: () => void;
	setCurrentFormStepNext: () => void;
	setCurrentFormStepBack: () => void;
	setCurrentFormStep: (index: number) => void;
	setCurrentStepIndex: (index: number) => void;
	updateSelectedProducts: (product: SelectedProduct) => void;
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
			currentFormStep: 1,
			sessionId: '',
			selectedProducts: [],
			stepHighlight: 'info',
			paid: false,
			updatePaid: () => set({ paid: true }),
			updateStepHighlight: (step: Highlights) =>
				set({ stepHighlight: step }),
			updateSelectedProducts: (product) => {
				set((state) => {
					let selectedIndex = undefined;

					// Check if the product exists in the array
					state.selectedProducts.filter((selected, i) => {
						if (selected.product_id === product.product_id) {
							selectedIndex = i; 
							return true;
						}
						return false;
					});

					// Remove the product if it exists, or add it if it doesn't
					if (selectedIndex !== undefined) {
						// Remove the product
						if (product.price_id === undefined) {
							// Remove the product if price_id is undefined
							state.selectedProducts.splice(selectedIndex, 1);
						} else {
							// Update the product with the new price_id
							state.selectedProducts[selectedIndex] = {
								...state.selectedProducts[selectedIndex],
								price_id: product.price_id,
							};
						}
					} else {
						// Add the product
						state.selectedProducts.push(product);
					}
					return {
						selectedProducts: state.selectedProducts,
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
			setSelectedProducts: (data) =>
				set(() => ({ selectedProducts: data })),
			
			setCurrentFormStep: (index: number) =>
					set(() => ({ currentFormStep: index })),
			setCurrentFormStepNext: () =>
				set((state) => ({
					currentFormStep: state.currentFormStep + 1,
				})),
			setCurrentFormStepBack: () =>
				set((state) => ({
					currentFormStep: state.currentFormStep - 1,
				})),
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
			setSessionId: (id: string) => set(() => ({ sessionId: id })),
			resetState: () => {
				set(() => ({
					fields: {},
					formData: {},
					currentStepIndex: 0,
					sessionId: '',
					selectedProducts: [],
					stepHighlight: 'info',
					paid: false,
				}));
			},
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
