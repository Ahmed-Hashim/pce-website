import { Raleway } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer, SidePanelManager, getFooterData } from "./components/layout";
import { NewsletterSection } from "./components/home";
import { A11Y, SITE_URL } from "@/lib/constants";

export const newsletterContent = {
  eyebrow: "Stay Updated",
  title: "Subscribe to Our Newsletter",
  description: "Join our mailing list to receive industry insights, project updates, and announcements.",
  placeholder: "Enter your email",
  buttonLabel: "Subscribe",
  consentText: "By subscribing, you agree to our Terms & Privacy Policy.",
};

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PCE | Precision Consulting Engineering",
    template: "%s | PCE",
  },
  description: "Leading engineering consultancy with 30+ years of experience in infrastructure, construction, and project management across the Middle East and beyond.",
  keywords: ["engineering consulting", "construction management", "infrastructure", "PCE", "precision consulting engineering", "project management", "Saudi Arabia", "Middle East"],
  authors: [{ name: "Precision Consulting Engineering" }],
  creator: "Precision Consulting Engineering",
  publisher: "Precision Consulting Engineering",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PCE - Precision Consulting Engineering",
    title: "PCE | Precision Consulting Engineering",
    description: "Leading engineering consultancy with 30+ years of experience in infrastructure, construction, and project management.",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "PCE - Precision Consulting Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PCE | Precision Consulting Engineering",
    description: "Leading engineering consultancy with 30+ years of experience.",
    images: ["/og_image.png"],
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
    canonical: "/",
  },
  manifest: '/manifest.webmanifest',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerData = await getFooterData();

  return (
    <html lang="en" className={raleway.variable}>
      <body
        className={`bg-background ${raleway.className} text-white antialiased`}
      >
        {/* Skip link for keyboard accessibility */}
        <a
          href={`#${A11Y.SKIP_LINK_TARGET}`}
          className="sr-only focus:not-sr-only focus:absolute focus:z-9999 focus:top-4 focus:left-4 focus:bg-primary-dark focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 focus:ring-primary-medium"
        >
          Skip to main content
        </a>

        <Header />
        <main id={A11Y.SKIP_LINK_TARGET} className="site-main min-h-screen">
          {children}

          <NewsletterSection
            title={newsletterContent.title}
            description={newsletterContent.description}
            placeholder={newsletterContent.placeholder}
            buttonLabel={newsletterContent.buttonLabel}
            consentText={newsletterContent.consentText}
          />
        </main>
        <Footer />

        {/* Global desktop side panel, decoupled from Header position */}
        <SidePanelManager footerData={footerData} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  "name": "PCE - Precision Consulting Engineering",
                  "url": SITE_URL,
                  "logo": {
                    "@type": "ImageObject",
                    "url": `${SITE_URL}/pce-logo.png`,
                    "width": 600,
                    "height": 60
                  },
                  "sameAs": [
                    "https://www.linkedin.com/company/pce",
                    "https://twitter.com/pce"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  "url": SITE_URL,
                  "name": "PCE - Precision Consulting Engineering",
                  "description": "Leading engineering consultancy with 30+ years of experience in infrastructure, construction, and project management.",
                  "publisher": {
                    "@id": `${SITE_URL}/#organization`
                  },
                  "inLanguage": "en-US"
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}

