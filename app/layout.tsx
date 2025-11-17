// app/layout.tsx
"use client";
import { useEffect, useState } from "react";
import { Raleway } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import DesktopSidePanel from "./components/layout/DesktopSidePanel";
import NewsletterSection from "./components/home/NewsletterSection";
import { newsletterContent } from "./data/NewsLetter";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const sidePanelEvents = {
    open: "desktopSidePanel:open",
    close: "desktopSidePanel:close",
  } as const;

  useEffect(() => {
    const handleOpen = () => setIsSideOpen(true);
    const handleClose = () => setIsSideOpen(false);
    window.addEventListener(sidePanelEvents.open, handleOpen);
    window.addEventListener(sidePanelEvents.close, handleClose);
    return () => {
      window.removeEventListener(sidePanelEvents.open, handleOpen);
      window.removeEventListener(sidePanelEvents.close, handleClose);
    };
  }, [sidePanelEvents.close, sidePanelEvents.open]);

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
        <DesktopSidePanel
          open={isSideOpen}
          onClose={() => setIsSideOpen(false)}
        />
      </body>
    </html>
  );
}
