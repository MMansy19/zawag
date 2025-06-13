"use client";

import { ReactNode } from "react";
import { LandingNavigation } from "@/components/landing/navigation";
import { LandingFooter } from "@/components/landing/footer";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavigation />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}
