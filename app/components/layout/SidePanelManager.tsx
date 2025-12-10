"use client";

import { useEffect, useState } from "react";
import DesktopSidePanel from "./DesktopSidePanel";
import { FooterContent } from "./FooterData";

interface SidePanelManagerProps {
  footerData: FooterContent;
}

export default function SidePanelManager({ footerData }: SidePanelManagerProps) {
  const [isSideOpen, setIsSideOpen] = useState(false);
  
  // Define events
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
  }, []);

  return (
    <DesktopSidePanel
      open={isSideOpen}
      onClose={() => setIsSideOpen(false)}
      data={footerData}
    />
  );
}
