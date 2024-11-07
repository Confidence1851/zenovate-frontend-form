'use client';
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
// import { Hand } from "lucide-react";
import Info from '@/components/icons/info';
import { ArrowRight } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useFormStore } from '@/stores/formStore';
import { useEffect, useState } from 'react';
import { startSession } from '@/server-actions/api.actions';

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
const HomeComponent = () => {
	const getLocalSessionId = () => {
		const storedData = JSON.parse(
			localStorage.getItem('form-storage') ?? '{}',
		);
		return storedData?.state?.sessionId ?? '';
	};

	const [formSessionId, setFormSessionId] = useState(getLocalSessionId());
	const setSessionId = useFormStore.getState().setSessionId;
	const router = useRouter();

	const canProceed = () => {
		return formSessionId?.length > 0;
	};

	useEffect(() => {
		const start = async () => {
			try {
				// 1. Get User Agent data
				const userAgent = navigator.userAgent;

				// 2. Get Geolocation data (async)
				const getLocation = () => {
					return new Promise((resolve) => {
						// Check if geolocation is supported
						if (!navigator.geolocation) {
							console.warn(
								'Geolocation is not supported by this browser.',
							);
							resolve(null);
						}
						navigator.geolocation.getCurrentPosition(
							(position) =>
								resolve({
									latitude: position.coords.latitude,
									longitude: position.coords.longitude,
								}),
							(error) => {
								console.warn(
									'Error getting geolocation:',
									error.message,
								);
								resolve(null); // Proceed even if permission is denied or other error
							},
						);
					});
				};

				// Check geolocation permission using Permissions API
				const permissionStatus = await navigator.permissions.query({
					name: 'geolocation',
				});

				let locationData = null;

				if (permissionStatus.state === 'granted') {
					locationData = await getLocation();
				} else if (permissionStatus.state === 'prompt') {
					locationData = await getLocation(); // Request location if not yet granted or denied
				} else {
					console.warn(
						'Geolocation permission was denied. Proceeding without location.',
					);
				}

				// 3. Combine data to send to API
				const postData = {
					userAgent,
					location: locationData,
				};

				// 4. Send the data to API
				const session = await startSession(postData);
				console.log(session);
				setSessionId(session.data.id);
				setFormSessionId(session.data.id);
			} catch (error) {
				console.error('Error in starting session:', error);
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
		<div className=" min-h-[70dvh]">
			<div className="mb-8 space-y-4 border-b border-Gray-100 pb-4">
				<h1 className="title t-h1">START YOUR JOURNEY</h1>
				<h3 className="title t-h3">Why Choose Zenovate?</h3>
				<div className="mx-auto">
					<p className="max-w-prose text-center text-sm md:text-base font-medium">
						At Zenovate, we understand that choosing the right
						healthcare products is crucial for your well-being.
						Here’s why you can trust us to provide superior products
						for home use
					</p>
				</div>
			</div>
			{/* Mobile accordion */}
			<div className="px-4 flex flex-col gap-6 lg:hidden py-5">
				<Accordion
					type="single"
					collapsible
					className="gap-5 flex flex-col "
				>
					{accordionData.map((item) => (
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
			{/* Desktop accordion */}
			<div className="px-4 flex-col gap-6 hidden lg:block py-8 mt-8">
				<TooltipProvider delayDuration={300}>
					<div className="gap-x-5 gap-y-10 grid grid-cols-2">
						{accordionData.map((item) => (
							<Tooltip key={item.id}>
								<TooltipTrigger
									className="border-zinc-400 border rounded-sm flex justify-between items-center p-3 w-full"
									type="button"
								>
									<h3 className="uppercase text-base font-semibold ">
										{item.title}
									</h3>
									<Info className="material-symbols-sharp text-Green-300" />
								</TooltipTrigger>
								<TooltipContent className="bg-Black-100 text-White-100 w-full max-w-[500px] p-4 rounded-sm rela z-40 !-top-10">
									<p className="text-base">{item.content}</p>
								</TooltipContent>
							</Tooltip>
						))}
					</div>
				</TooltipProvider>
			</div>
			<div className="mx-4">
				<Button
					size={'lg'}
					variant={'green'}
					className="w-full text-xl flex justify-between items-center py-4"
					onClick={handleStart}
					disabled={!canProceed()}
				>
					<span className="uppercase">start</span>
					<ArrowRight
						size="24"
						className="text-secondary-foreground"
					/>
				</Button>
			</div>
		</div>
	);
};

export default HomeComponent;
