import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShopHub - Your Premium E-Commerce Platform',
  description: 'Discover amazing deals on electronics, fashion, books and more. Fast shipping, secure checkout, and 24/7 customer support.',
  keywords: 'ecommerce, online shopping, electronics, fashion, deals, discounts',
  authors: [{ name: 'ShopHub Team' }],
  openGraph: {
    title: 'ShopHub - Your Premium E-Commerce Platform',
    description: 'Discover amazing deals on electronics, fashion, books and more.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
