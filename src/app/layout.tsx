import {Mulish, Poppins} from 'next/font/google';

import type {Metadata, Viewport} from 'next';
import StoreProvider from '@/app/StoreProvider';
import {BurgerContacts} from '@/components/BurgerContacts';

const APP_NAME = 'amour____eternel';
const APP_DEFAULT_TITLE = 'Amour Èternel | The Classic Brownies & Butter Cookies';
const APP_TITLE_TEMPLATE = '%s - amour____eternel';
const APP_DESCRIPTION =
  'Amour Èternel | The Classic Brownies & Butter Cookies';

import 'swiper/css';
import '../css/reset.css';
import '../css/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#EEF3FC',
};

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

const mulish = Mulish({
  variable: '--font-mulish',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          position: 'relative',
          margin: '0 auto',
        }}
        className={`${mulish.variable} ${poppins.variable}`}
      >
        <StoreProvider>
          <BurgerContacts />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
