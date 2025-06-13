import { Metadata } from "next";
import { DashboardHome } from "@/components/dashboard/dashboard-home";

export const metadata: Metadata = {
  title: "لوحة التحكم - الزواج السعيد",
  description:
    "إدارة حسابك وملفك الشخصي، تصفح طلبات الزواج، والتفاعل مع الأعضاء في منصة الزواج السعيد.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <DashboardHome />;
}
