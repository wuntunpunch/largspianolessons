import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Largs Piano Lessons | Fun Lessons for All Ages",
  description:
    "Master the piano with personalized piano lessons in Largs. Professional instruction tailored to all skill levels. Book your lesson today!",
  keywords:
    "Largs piano lessons, piano instruction, music lessons Largs, learn piano Largs",
  openGraph: {
    title: "Largs Piano Lessons | Fun Lessons for All Ages",
    description:
      "Master the piano with personalized lessons in Largs. Professional instruction tailored to all skill levels. Book your lesson today!",
    url: "https://www.largspianolessons.com",
    siteName: "Largs Piano Lessons",
    images: [
      {
        url: "https://www.largspianolessons.com/largs-piano-lessons-og.png",
        width: 1200,
        height: 630,
        alt: "Largs Piano Lessons",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Largs Piano Lessons | Fun Lessons for All Ages",
    description:
      "Master the piano with personalized lessons in Largs. Professional instruction tailored to all skill levels. Book your lesson today!",
    images: [
      "https://www.largspianolessons.com/largs-piano-lessons-twitter.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.largspianolessons.com",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-Z1QL55TTDP`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z1QL55TTDP');
          `}
        </Script>
      </body>
    </html>
  );
}
