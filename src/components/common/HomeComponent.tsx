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
import { useFormStore } from '@/stores/formStore';
import { startSession } from '@/server-actions/api.actions';
import { getGeoInfo } from '@/utils/functions';

const HomeComponent = () => {
	const [current, setCurrent] = useState(0);
	const [_, setCount] = useState(0);
	const [api, setApi] = useState<CarouselApi>();
	const screenWidth = useScreenWidth();
	const getLocalSessionId = () => {
		if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
			const storedData = JSON.parse(
				localStorage.getItem('form-storage') ?? '{}',
			);
			return storedData?.state?.sessionId ?? '';
		}
		return ''; // Return a default value when localStorage is not available
	};

	const [formSessionId, setFormSessionId] = useState(getLocalSessionId());
	const setSessionId = useFormStore.getState().setSessionId;

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

	const canProceed = () => {
		return formSessionId?.length > 0;
	};

	useEffect(() => {
		const start = async () => {
			try {
				

				// 4. Send the data to API
				const session = await startSession(await getGeoInfo());
				console.log(session);
				setSessionId(session.data.id);
				setFormSessionId(session.data.id);
			} catch (error) {
				// console.error('Error in starting session:', error);
			}
		};

		if (!(getLocalSessionId()?.length > 0)) {
			start();
		}
	}, [formSessionId]);

	const handleStart = async () => {
		router.push(`${formSessionId}`);
	};

	return (
		<div className=" min-h-[70dvh] pb-10 overflow-hidden" suppressHydrationWarning>
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
							disabled={!canProceed()}
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
