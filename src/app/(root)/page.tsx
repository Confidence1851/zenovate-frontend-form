// import HomeComponent from '@/components/common/HomeComponent';
import dynamic from 'next/dynamic';
const HomeComponent = dynamic(() => import('@/components/common/HomeComponent'), { ssr: false });

const HomePage = () => {
	return (
		<div className="w-full px-2 max-w-[1550px] mx-auto min-h-screen flex justify-center items-center">
			<HomeComponent />
		</div>
	);
};

export default HomePage;
