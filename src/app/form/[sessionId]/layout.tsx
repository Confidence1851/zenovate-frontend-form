import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
    title: 'Get Started | Zenovate Health',
    description: 'Complete our multi-step form to get started with Zenovate Health services.',
    openGraph: {
        title: 'Get Started | Zenovate Health',
        description: 'Complete our multi-step form to get started with Zenovate Health services.',
    },
})

export default function SessionLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}