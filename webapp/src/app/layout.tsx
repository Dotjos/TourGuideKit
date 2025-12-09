
import "./globals.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from './providers';

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Tour Builder Dashboard',
  description: 'Create and manage interactive onboarding tours',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
