import Header from "@/components/Layout/Header";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/Layout/Footer";
import ToastProvider from "@/components/ui/ToastContainer";
import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  colorScheme: "light",
};

export const metadata: Metadata = {
  title:
    "CEX Webstore - Buy & Sell Games, Phones & Computing | Best Prices Online",
  description:
    "Shop the latest games, smartphones, and computing equipment at unbeatable prices. Buy, sell, and trade with confidence. Fast delivery across Montenegro.",
  keywords: [
    "games",
    "gaming",
    "smartphones",
    "phones",
    "computing",
    "electronics",
    "buy games",
    "sell games",
    "trade games",
    "Montenegro",
    "online store",
    "e-commerce",
    "PlayStation",
    "Xbox",
    "Nintendo",
    "iPhone",
    "Samsung",
    "laptops",
    "PC components",
  ],
  authors: [{ name: "CEX Webstore" }],
  creator: "CEX Webstore",
  publisher: "CEX Webstore",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cex-webstore.vercel.app/",
    title: "CEX Webstore - Buy & Sell Games, Phones & Computing",
    description:
      "Shop the latest games, smartphones, and computing equipment at unbeatable prices. Buy, sell, and trade with confidence.",
    siteName: "CEX Webstore",
    images: [
      {
        url: "/metatags/Logo.png",
        width: 1200,
        height: 630,
        alt: "CEX Webstore - Games, Phones & Computing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CEX Webstore - Buy & Sell Games, Phones & Computing",
    description:
      "Shop the latest games, smartphones, and computing equipment at unbeatable prices.",
    images: ["/metatags/Logo.png"],
  },
  category: "E-commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-col max-w-[1580px] mx-auto">
            <Header />
            <main className="w-6/7 mx-auto">{children}</main>
            <Footer />
          </div>
        </Providers>
        <ToastProvider />
      </body>
    </html>
  );
}
