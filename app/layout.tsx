// app/layout.tsx
"use client";
import { useEffect, useState } from 'react';
import { Raleway } from 'next/font/google';
import './globals.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DesktopSidePanel from './components/layout/DesktopSidePanel';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-raleway',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const sidePanelEvents = { open: 'desktopSidePanel:open', close: 'desktopSidePanel:close' } as const;

  useEffect(() => {
    const handleOpen = () => setIsSideOpen(true);
    const handleClose = () => setIsSideOpen(false);
    window.addEventListener(sidePanelEvents.open, handleOpen);
    window.addEventListener(sidePanelEvents.close, handleClose);
    return () => {
      window.removeEventListener(sidePanelEvents.open, handleOpen);
      window.removeEventListener(sidePanelEvents.close, handleClose);
    };
  }, []);

  return (
    <html lang="en" data-theme="dark" className={raleway.variable}>
      <body>
        <Header />
        <main id="primary" className="site-main">
          {children}
        </main>
        <Footer />
        {/* Global desktop side panel, decoupled from Header position */}
        <DesktopSidePanel open={isSideOpen} onClose={() => setIsSideOpen(false)} />
      </body>
    </html>
  );
}
