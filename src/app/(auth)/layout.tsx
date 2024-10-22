export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="lg:flex h-[100dvh]">
			<div className="w-2/3 flex justify-center items-center flex-col h-full p-2">
				{children}
			</div>
			<div className="w-1/3 lg:flex-1 h-full p-4 hidden lg:block lg:min-w-[600px] xl:min-w-[800px]  max-w-[1000px]">
				<div className="h-full w-full bg-[url('/auth-image.jpg')]  bg-no-repeat bg-cover rounded-sm bg-right"></div>
			</div>
		</main>
	);
}
