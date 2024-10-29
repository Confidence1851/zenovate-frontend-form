import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

interface Step {
	id: string;
	title: string;
	content: string;
}

interface SliderProps {
	stepData: Step[];
}

const AccordionSlider: React.FC<SliderProps> = ({ stepData }) => {
	return (
		<div className="flex flex-col gap-6 lg:hidden py-5">
			<Accordion
				type="single"
				collapsible
				className="gap-5 flex flex-col"
			>
				{stepData.map((item) => (
					<AccordionItem
						value={item.id}
						className="border-Gray-100 border rounded-sm"
						key={item.id}
					>
						<AccordionTrigger className="uppercase transition-transform duration-500 text-[14px] md:text-base px-2 font-semibold border-b-0 data-[state=open]:bg-Black-100 data-[state=open]:text-White-100 data-[state=open]:no-underline data-[state=open]:rounded-t-[5px] ">
							{item.title}
						</AccordionTrigger>
						<AccordionContent className="p-3 leading-4 md:leading-6 text-base md:text-lg">
							{item.content}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};

export default AccordionSlider;
