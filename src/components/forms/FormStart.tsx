'use client';
import { useFormStore } from '@/stores/formStore';
import React, { useEffect } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChevronDown, CircleHelp } from 'lucide-react';

const accordionData = [
	{
		id: '1',
		title: 'less painful',
		content:
			'Remember the pain of intramuscular injections? 1 in 3 patients complain of prolonged soreness after IM injections. On the other hand, subcutaneous injections are way less painful, enabling you to become a healthier version of yourself without the pain.',
	},
	{
		id: '2',
		title: 'ease of use',
		content:
			'Remember the pain of intramuscular injections? 1 in 3 patients complain of prolonged soreness after IM injections. On the other hand, subcutaneous injections are way less painful, enabling you to become a healthier version of yourself without the pain.',
	},
	{
		id: '3',
		title: 'long shelf life',
		content:
			'Remember the pain of intramuscular injections? 1 in 3 patients complain of prolonged soreness after IM injections. On the other hand, subcutaneous injections are way less painful, enabling you to become a healthier version of yourself without the pain.',
	},
	{
		id: '4',
		title: 'delivered to your door',
		content:
			'Remember the pain of intramuscular injections? 1 in 3 patients complain of prolonged soreness after IM injections. On the other hand, subcutaneous injections are way less painful, enabling you to become a healthier version of yourself without the pain.',
	},
	{
		id: '5',
		title: 'optimized absorption',
		content:
			'Remember the pain of intramuscular injections? 1 in 3 patients complain of prolonged soreness after IM injections. On the other hand, subcutaneous injections are way less painful, enabling you to become a healthier version of yourself without the pain.',
	},
	{
		id: '6',
		title: 'convenience at home',
		content:
			'Remember the pain of intramuscular injections? 1 in 3 patients complain of prolonged soreness after IM injections. On the other hand, subcutaneous injections are way less painful, enabling you to become a healthier version of yourself without the pain.',
	},
];

const FormStart = () => {
	const updateStepHighlight = useFormStore(
		(state) => state.updateStepHighlight,
	);

	useEffect(() => {
		updateStepHighlight('info');
	}, []);
	return (
		<>
			<div className="min-h-[70dvh] ">
				<div className="mb-8 space-y-3 border-b border-primary pb-8">
					<h1 className="text-center md:text-4xl text-2xl font-semibold text-Black-100 uppercase">
						START YOUR JOURNEY
					</h1>
					<h3 className="text-center md:text-xl text-base  font-semibold text-Gray-100 uppercase">
						WHY CHOOSE ZENOVATE?
					</h3>
					<p className="text-center text-sm md:text-base font-medium">
						At Zenovate, we understand that choosing the right
						healthcare products is crucial for your well-being.
						Here’s why you can trust us to provide superior
						products for home use
					</p>
				</div>
				{/* Mobile accordion */}
				<div className="flex flex-col gap-6 lg:hidden">
					<Accordion
						type="single"
						collapsible
						className="gap-5 flex flex-col "
					>
						{accordionData.map((item) => (
							<AccordionItem
								value={item.id}
								className="border-Gray-100 border rounded-[10px]"
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
				{/* Desktop accordion */}
				<div className=" flex-col gap-6 hidden lg:block py-10 mt-20">
					<TooltipProvider delayDuration={300}>
						<div className="gap-x-5 gap-y-10 grid grid-cols-2">
							{accordionData.map((item) => (
								<Tooltip key={item.id}>
									<TooltipTrigger
										className="border-Gray-100 border rounded-[10px] flex justify-between p-2 w-full"
										type="button"
									>
										<h3 className="uppercase text-base px-2 font-semibold ">
											{item.title}
										</h3>
										<CircleHelp
											className="text-White-100"
											color="#fff"
											fill="#2e522a "
											size={30}
										/>
									</TooltipTrigger>
									<TooltipContent className="bg-Black-100 text-White-100 w-full max-w-[500px] p-4 rounded-[10px] rela z-40 !-top-10">
										<p className="text-base">
											{item.content}
										</p>
										<ChevronDown
											size={36}
											color="#000000"
											strokeWidth={3}
											className="absolute left-1/2 bottom-4 transform -translate-x-1/2 translate-y-full"
										/>
									</TooltipContent>
								</Tooltip>
							))}
						</div>
					</TooltipProvider>
				</div>
			</div>
		</>
	);
};

export default FormStart;
