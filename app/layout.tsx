import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  image: `${siteConfig.url}/images/vip-hero.png`,
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
    "transfert aeroport Agadir",
    "transfert aeroport Marrakech",
    "location voiture avec chauffeur",
    "AYYI TOUR",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
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
    images: ["/images/vip-hero.png"],
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
        {children}
      </body>
    </html>
  );
}
