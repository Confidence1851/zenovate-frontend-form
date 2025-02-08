'use client'

import React from 'react';
import {
	Tooltip,
	TooltipProvider,
	TooltipContent,
	TooltipTrigger,
} from '../ui/tooltip';
import { Info } from 'lucide-react';
interface Step {
	id: string;
	title: string;
	content: string;
}

interface SliderProps {
	stepData: Step[];
}

const TooltipSlider: React.FC<SliderProps> = ({ stepData }) => {

	return (
		<div suppressHydrationWarning={true}>
			<TooltipProvider delayDuration={300}>
				<div className="gap-x-5 gap-y-10 grid grid-cols-2">
					{stepData.map((item) => (
						<Tooltip key={item.id}>
							<TooltipTrigger
								className="border-zinc-400 border rounded-sm flex justify-between items-center p-3 w-full"
								type="button"
							>
								<h3 className="uppercase text-base font-semibold ">
									{item.title}
								</h3>
								<Info className="material-symbols-sharp text-[#48696E]" />
							</TooltipTrigger>
							<TooltipContent
								className="bg-Black-100 text-White-100 w-full max-w-[500px] p-4 rounded-sm rela z-40 !-top-10"
								side="top"
							>
								<p className="text-base">{item.content}</p>
							</TooltipContent>
						</Tooltip>
					))}
				</div>
			</TooltipProvider>
		</div>
	);
};

export default TooltipSlider;
