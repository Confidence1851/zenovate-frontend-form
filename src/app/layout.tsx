import './globals.css';
import { Barlow, Raleway } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'Start Your Journey | Zenovate Health',
  description: 'Complete our multi-step form to get started with Zenovate Health services.',
  openGraph: {
    title: 'Start Your Journey | Zenovate Health',
    description: 'Complete our multi-step form to get started with Zenovate Health services.',
  },
})


const barlow = Barlow({
  weight: ['400', '100', '200', '300', '500', '900', '700', '400', '600'],
  subsets: ['latin'],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const raleway = Raleway({
  variable: '--font-raleway',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script defer data-domain="application.zenovate.health" src="https://analytics.aes-studio.com/js/script.js"></script>
      </head>
      <body className={`${barlow.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
