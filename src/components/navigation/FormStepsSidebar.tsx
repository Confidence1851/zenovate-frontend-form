'use client';
import { formSidebarMenu } from '@/utils/form';
import Logo from './Logo';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { useFormStore } from '@/stores/formStore';
import Link from 'next/link';
import { ROUTES } from '@/utils/routes';
import styles from '@/styles/sidebar.module.css';
import { ArrowLeft2 } from 'iconsax-react';
import { useMultistepForm } from '@/hooks/useMultiStepForm';

const FormStepsSidebar = () => {
	const stepHighlight = useFormStore((state) => state.stepHighlight);
	const currentStepIndex = useFormStore((state) => state.currentStepIndex);
	const { back } = useMultistepForm([]);

	return (
		<div className={styles.sidebar}>
			<div className={styles.sidebar_wrapper}>
				<div className="space-y-10 ">
					<Logo className="text-xl text-Gray-100 border-b border-Gray-400 pb-6 " />
					<Button
						variant={'green'}
						size={'lg'}
						className="w-full flex justify-between items-center"
						onClick={back}
						disabled={currentStepIndex === 0}
					>
						<ArrowLeft2
							size="24"
							className="text-secondary-foreground"
						/>
						<span className="uppercase">Back</span>
					</Button>

					{/* middle  */}
					<div className="relative fade-container">
						<div className="flex flex-col gap-4">
							{formSidebarMenu.map((item, index) => (
								<div
									className="flex gap-2 items-start"
									key={item.title}
								>
									<div
										className={`${
											stepHighlight ===
											item.stepHighlights
												? 'text-Green-100'
												: 'text-Gray-400'
										} my-1 pb-2 rounded-sm`}
									>
										{item.icon(
											stepHighlight ===
												item.stepHighlights
												? '#162C15'
												: '#9ca3af',
										)}
									</div>

									<div className="transition-opacity duration-500 space-y-1">
										<h3 className="prose text-sm font-semibold">
											{item.title}
										</h3>
										<p className="prose text-xs font-medium text-Gray-100 font-raleway">
											{item.subheading}
										</p>
									</div>
								</div>
							))}
						</div>
						<div
							className={` ${
								stepHighlight === 'questions' ||
								stepHighlight === 'sign'
									? ' bg-gradient-to-t from-transparent to-OffWhite-100 from-20%'
									: ' bg-gradient-to-b from-transparent to-OffWhite-100 from-20%'
							} absolute -top-40 left-0 w-full h-[500px] pointer-events-none duration-700 `}
						/>
					</div>
				</div>

				{/* bottom  */}
				<div className="flex justify-between">
					<Link href={ROUTES.HOME}>
						<Button className="p-0 flex justify-between gap-2 bg-transparent uppercase text-primary shadow-none font-semibold">
							<ArrowLeft size="16" color="#162c15" />
							<span>back to home</span>
						</Button>
					</Link>
					<Link href={ROUTES.SIGNIN}>
						<Button className="p-0 bg-transparent uppercase text-primary shadow-none font-semibold">
							sign in
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default FormStepsSidebar;
