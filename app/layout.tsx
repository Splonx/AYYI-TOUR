import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { FloatingActions } from "@/components/layout/floating-actions";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const textFont = Manrope({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  image: `${siteConfig.url}/logo/og-image.png`,
  logo: `${siteConfig.url}/logo/favicon.png`,
  telephone: "+212672508363",
  areaServed: ["Agadir", "Marrakech", "Maroc"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "MA",
    addressRegion: "Souss-Massa / Marrakech-Safi",
  },
  priceRange: "$$$",
  sameAs: [siteConfig.whatsappUrl],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: "%s | AYYI TOUR",
  },
  description: siteConfig.description,
  keywords: [
    "transport VIP Agadir",
    "chauffeur prive Marrakech",
    "transfert aeroport Agadir",
    "transport prive Maroc",
    "chauffeur prive Agadir",
    "transfert aeroport Marrakech",
    "transport VIP Maroc",
    "AYYI TOUR",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      { url: "/logo/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/logo/favicon.png",
    apple: "/logo/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/logo/og-image.png",
        width: 1200,
        height: 630,
        alt: "AYYI TOUR Transport VIP Agadir et Marrakech",
      },
      {
        url: "/images/vip-hero.png",
        width: 1717,
        height: 916,
        alt: "Transport VIP AYYI TOUR au Maroc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/logo/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${textFont.variable} ${displayFont.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
