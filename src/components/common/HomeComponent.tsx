'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from '@/components/ui/carousel';

import styles from '@/styles/homecomponent.module.css';

import { useEffect, useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import AccordionSlider from '../home-page/AccordionSlider';
import { stepOne, stepThree, stepTwo } from '../home-page/slider';
import dynamic from 'next/dynamic';
const TooltipSlider = dynamic(() => import('../home-page/TooltipSlider'), { ssr: false });
import useScreenWidth from '@/hooks/useScreenWidth';

const HomeComponent = () => {
	const [current, setCurrent] = useState(0);
	const [_, setCount] = useState(0);
	const [api, setApi] = useState<CarouselApi>();
	const screenWidth = useScreenWidth();

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	const sliderData = [
		<AccordionSlider stepData={stepOne} />,
		<AccordionSlider stepData={stepTwo} />,
		<AccordionSlider stepData={stepThree} />,
	];
	const toolTipData = [
		<TooltipSlider stepData={stepOne} />,
		<TooltipSlider stepData={stepTwo} />,
		<TooltipSlider stepData={stepThree} />,
	];

	const router = useRouter();
	const handleStart = async () => {
		//logic to handle session and naviagting to dynamic session page
		const sessionId = 'abssb-dff44-566-78888ff-gggh'; //place holder sessionID
		router.push(`${sessionId}`);
	};

	return (
		<div className=" min-h-[70dvh] pb-10 overflow-hidden">
			<div className="mb-8 space-y-4 border-b border-Gray-100 pb-4 px-2">
				<h1 className="title t-h1">START YOUR JOURNEY</h1>
				<h3 className="title t-h3">Why Choose Zenovate?</h3>
				<div className="mx-auto">
					<p className="max-w-prose text-center text-sm md:text-base font-medium mx-auto">
						At Zenovate, we understand that choosing the right
						healthcare products is crucial for your well-being.
						Here’s why you can trust us to provide superior products
						for home use
					</p>
				</div>
			</div>

			<Carousel
				opts={{
					align: 'start',
				}}
				className="px-2 max-w-[1100px] mx-auto"
				setApi={setApi}
			>
				{screenWidth <= 1024 ? (
					<CarouselContent className="ml-0 min-w-0 gap-2">
						{sliderData.map((item, i) => (
							<CarouselItem key={i} className="pl-0">
								{item}
							</CarouselItem>
						))}
					</CarouselContent>
				) : (
					<CarouselContent className="ml-0 min-w-0 gap-2">
						{toolTipData.map((item, i) => (
							<CarouselItem key={i} className="pl-0">
								{item}
							</CarouselItem>
						))}
					</CarouselContent>
				)}

				<div className="flex justify-between gap-10 items-center min-w-0 flex-wrap py-6">
					<CarouselPrevious
						className={styles.button}
						buttonText="Previous"
						variant={'green'}
						size={'lg'}
					/>

					{current !== sliderData.length ? (
						<CarouselNext
							className={styles.button}
							buttonText="Next"
							variant={'green'}
							size={'lg'}
						/>
					) : (
						<Button
							size={'lg'}
							variant={'green'}
							className={styles.button}
							onClick={handleStart}
						>
							<span>start</span>
							<ArrowRightIcon className="h-4 w-4" />
						</Button>
					)}
				</div>
			</Carousel>
		</div>
	);
};

export default HomeComponent;
