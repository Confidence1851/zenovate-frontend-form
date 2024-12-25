import React from 'react';
import { Circle } from 'rc-progress';

const CircularProgressBar = ({
	step,
	totalSteps,
}: {
	step: number;
	totalSteps: number;
}) => {
	const percentage = (step / totalSteps) * 100;

	return (
		<div
			style={{ width: 60, height: 60, position: 'relative' }}
			className="z-1"
		>
			<Circle
				percent={percentage}
				strokeWidth={8}
				trailWidth={8}
				strokeColor="#162c15"
			/>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					fontSize: '14px',
					fontWeight: '500',
					color: '#162c15',
				}}
			>
				{`${step}/${totalSteps}`}
			</div>
		</div>
	);
};

export default CircularProgressBar;
