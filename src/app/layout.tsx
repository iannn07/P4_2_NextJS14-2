import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/header-footer/Navbar';
import Footer from '@/components/header-footer/Footer';
import Provider from '@/components/auth/Provider';

export const metadata: Metadata = {
  title: 'Gaussible',
  description: 'Showcase your projects with Gaussible',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
