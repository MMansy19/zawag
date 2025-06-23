import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface InfoPageLayoutProps {
  title: string;
  subtitle: string;
  badgeText: string;
  badgeIcon: LucideIcon;
  children: ReactNode;
}

export function InfoPageLayout({
  title,
  subtitle,
  badgeText,
  badgeIcon: BadgeIcon,
  children,
}: InfoPageLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="badge-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              <BadgeIcon className="w-4 h-4 ml-2" />
              {badgeText}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-amiri text-white">
              {title}
            </h1>
            <p className="text-xl text-primary-lighter leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">{children}</div>
    </div>
  );
}
