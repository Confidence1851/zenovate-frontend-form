import React from 'react';
import { Line } from 'rc-progress';

const CircularProgressBar = ({
	step,
	totalSteps,
}: {
	step: number;
	totalSteps: number;
}) => {
	const percentage = (step / totalSteps) * 100;

	return (
		<div className="relative w-full max-w-md">
			<Line
				percent={percentage}
				strokeWidth={4}
				trailWidth={4}
				strokeColor="hsl(188 21% 36%)"
				trailColor="hsl(180 60% 94%)"
				strokeLinecap="butt"
			/>
		</div>
	);
};

export default CircularProgressBar;