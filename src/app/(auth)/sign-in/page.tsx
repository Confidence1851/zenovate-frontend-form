import SignInForm from '@/components/forms/SignInForm';
import Logo from '@/components/navigation/Logo';
import { ROUTES } from '@/utils/routes';
import Link from 'next/link';
import { Quicksand } from 'next/font/google';
const quicksand = Quicksand({ subsets: ['latin'] });

const SignInPage = () => {
	return (
		<div className=" space-y-16 w-full max-w-[600px] mx-auto">
			<div className="space-y-4">
				<h1 className="text-2xl md:text-4xl font-bold text-Black-100 uppercase">
					Welcome back!
				</h1>
				<h2
					className={`${quicksand.className} prose-lg font-semibold text-Gray-200 uppercase`}
				>
					sign in to continue your health journey with us
				</h2>
			</div>
			<SignInForm />
			<Link href={ROUTES.HOME} className="block">
				<Logo className="text-center text-2xl" />
			</Link>
		</div>
	);
};

export default SignInPage;
