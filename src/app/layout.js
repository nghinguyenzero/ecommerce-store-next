import { Inter } from 'next/font/google'
import './globals.css'
import GlobalState from '@/context'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Zero Store - Fashion & Clothing Online',
    template: '%s | Zero Store',
  },
  description:
    'Shop the latest fashion trends at Zero Store. Discover premium clothing for Men, Women & Kids with free shipping on selected orders.',
  keywords: ['fashion', 'clothing', 'online store', 'men fashion', 'women fashion', 'kids clothing', 'ecommerce'],
  authors: [{ name: 'Zero Store' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: 'Zero Store',
    title: 'Zero Store - Fashion & Clothing Online',
    description:
      'Shop the latest fashion trends at Zero Store. Discover premium clothing for Men, Women & Kids.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zero Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zero Store - Fashion & Clothing Online',
    description:
      'Shop the latest fashion trends at Zero Store. Premium clothing for Men, Women & Kids.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <Navbar/>
          <main className='flex min-h-screen flex-col mt-[80px]'>{children}</main>
          <Footer/>
        </GlobalState>
      </body>
    </html>
  )
}
