import type {Metadata} from 'next';
import { Poppins } from 'next/font/google';
import './globals.css'; // Global styles

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Shoppers Heaven | E-commerce Store',
  description: 'Premium E-Commerce Landing Page for Shoppers Heaven',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans bg-[#fffafc] text-gray-900 scroll-smooth antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
