import { Raleway } from "next/font/google";
import "./globals.css";
import { Header, Footer, SidePanelManager, getFooterData } from "./components/layout";
import { NewsletterSection } from "./components/home";
import { A11Y } from "@/lib/constants";

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

export const metadata = {
  title: "PCE Website",
  description: "PCE Website",
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
      </body>
    </html>
  );
}

