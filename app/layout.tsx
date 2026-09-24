import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SearchProvider } from "@/components/search/search-provider";
import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig } from "@/data/site-config";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

// Fonts are self-hosted from app/fonts (SIL Open Font License), so builds never
// depend on reaching Google Fonts.
const inter = localFont({
  src: "./fonts/Inter-Variable-Latin.woff2",
  variable: "--font-inter",
  weight: "300 800",
  display: "swap",
});
const jakarta = localFont({
  src: "./fonts/PlusJakartaSans-Variable-Latin.woff2",
  variable: "--font-jakarta",
  weight: "500 800",
  display: "swap",
});
const instrument = localFont({
  src: "./fonts/InstrumentSerif-Italic-Latin.woff2",
  variable: "--font-instrument",
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.brand.name}`,
  },
  description: siteConfig.seo.description,
  applicationName: siteConfig.brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: siteConfig.brand.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: "/",
    images: [{ url: siteConfig.brand.ogImage, width: 1200, height: 630, alt: siteConfig.brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.brand.ogImage],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1c1e33",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JavaScript runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <SearchProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
