import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ThemeProvider } from "@/providers/theme-provider"
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '@/providers/QueryClientProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params: { locale } }: Props) {

  const messages = useMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`root h-screen w-screen relative overflow-hidden ${inter.className} light`} suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages} >
          <QueryProvider>
            <ThemeProvider attribute='class' defaultTheme="light" enableSystem>
              {children}
            </ThemeProvider>
          </QueryProvider>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
