import '@/styles/globals.css'
import { Inter, Roboto_Slab } from 'next/font/google'
import { ThemeProvider } from "@/providers/theme-provider"
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '@/providers/QueryClientProvider'


const inter = Inter({ subsets: ['latin'] })
const robotoSlab = Roboto_Slab({ subsets: ['latin'] })


type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params: { locale } }: Props) {

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`root h-screen w-screen relative overflow-hidden ${inter.className} ${robotoSlab.className} light`} suppressHydrationWarning={true}>
        <QueryProvider>
          <ThemeProvider attribute='class' defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </QueryProvider>

        <Toaster />
      </body>
    </html>
  )
}
