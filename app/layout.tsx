import { Raleway } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NewsletterSection from "./components/home/NewsletterSection";

import SidePanelManager from "./components/layout/SidePanelManager";
import { getFooterData } from "./components/layout/footerService";
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
        <Header />
        <main id="primary" className="site-main min-h-screen ">
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
