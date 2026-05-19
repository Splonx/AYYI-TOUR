import type { Metadata } from "next";
import { FloatingActions } from "@/components/layout/floating-actions";
import { PremiumLoader } from "@/components/layout/premium-loader";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  image: `${siteConfig.url}/brand/og-ayyi-tour.png`,
  logo: `${siteConfig.url}/brand/logo-icon-transparent.png`,
  telephone: "+212672508363",
  areaServed: ["Agadir", "Marrakech", "Maroc"],
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
    "transport VIP Maroc",
    "chauffeur prive Maroc",
    "chauffeur prive Agadir",
    "chauffeur prive Marrakech",
    "transfert aeroport Agadir",
    "transfert aeroport Marrakech",
    "location voiture avec chauffeur",
    "transport VIP Agadir",
    "transport VIP Marrakech",
    "AYYI TOUR",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/brand/favicon.svg",
    apple: "/brand/favicon.png",
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
        url: "/brand/og-ayyi-tour.png",
        width: 1200,
        height: 630,
        alt: "Logo AYYI TOUR Transport Service VIP",
      },
      {
        url: "/images/vip-hero.png",
        width: 1717,
        height: 916,
        alt: "AYYI TOUR transport VIP au Maroc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/brand/og-ayyi-tour.png"],
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
    <html lang="fr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <PremiumLoader />
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
