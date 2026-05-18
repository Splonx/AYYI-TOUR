import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AYYI TOUR Transport Service VIP",
    template: "%s | AYYI TOUR",
  },
  description:
    "Transport VIP, chauffeur prive, transferts aeroport et flotte executive au Maroc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
