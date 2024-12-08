import { Metadata } from 'next'

const SITE_NAME = 'Zenovate Health - Personalized Wellness, Elevated'
const SITE_URL = 'https://application.zenovate.health'
const SITE_DESCRIPTION = 'Evidence-based wellness injections tailored to your unique needs and delivered to your doorstep.'
const SITE_IMAGE = `${SITE_URL}/og-image.jpg`


const sharedMetadata: Partial<Metadata> = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_NAME,
        template: `%s | ${SITE_NAME}`
    },
    description: SITE_DESCRIPTION,
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/og-image.jpg',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: SITE_URL,
        siteName: SITE_NAME,
        images: [
            {
                url: SITE_IMAGE,
                width: 1200,
                height: 630,
                alt: SITE_NAME,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        images: [SITE_IMAGE],
    },
}

export const createMetadata = (pageMetadata: Partial<Metadata> = {}): Metadata => {
    return {
        ...sharedMetadata,
        ...pageMetadata,
        openGraph: {
            ...sharedMetadata.openGraph,
            ...pageMetadata.openGraph,
        },
        twitter: {
            ...sharedMetadata.twitter,
            ...pageMetadata.twitter,
        },
    }
}
export const generateViewport = (): string => {
    return 'width=device-width, initial-scale=1'
}