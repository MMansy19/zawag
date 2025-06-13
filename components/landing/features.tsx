"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Shield,
  Book,
  Gift,
  Globe,
  Target,
  Handshake,
  Zap,
  Lock,
  Star,
} from "lucide-react";

export function LandingFeatures() {
  const features = [
    {
      icon: Shield,
      title: "التوافق مع الشريعة",
      description: "خدمة تتوافق مع تعاليم الإسلام، مع بيئة آمنة ومحترمة.",
    },
    {
      icon: Users,
      title: "دعم التقاليد",
      description: "نؤمن بأهمية العائلة ودورها في بناء زواج ناجح وربط الأسر.",
    },
    {
      icon: Lock,
      title: "حفظ الكرامة",
      description: "معلومات المتقدمين متاحة للأعضاء المسجلين والمعتمدين فقط.",
    },
    {
      icon: Book,
      title: "الالتزام بالدين",
      description: "بيئة مثالية للعثور على شركاء يشاركونك نفس القيم الإسلامية.",
    },
    {
      icon: Gift,
      title: "المجانية",
      description: "خدماتنا مجانية 100% بدون أي رسوم أو مبالغ مالية.",
    },
    {
      icon: Globe,
      title: "الشمول",
      description:
        "متاح لجميع المسلمين بغض النظر عن الخلفية أو الموقع الجغرافي.",
    },
    {
      icon: Target,
      title: "الجدية",
      description: "بيئة للبحث الجاد عن الشريك المناسب بدون مراسلات عاطفية.",
    },
    {
      icon: Handshake,
      title: "التوافق",
      description: "أسئلة متخصصة لزيادة فرص العثور على الشريك المناسب.",
    },
    {
      icon: Zap,
      title: "السرعة",
      description: "تسهيل الانتقال من العالم الافتراضي إلى الواقع بسرعة.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-10 h-10 ml-3 text-amber-500" />
            <h2 className="text-4xl font-bold text-gray-900">الميزات</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            باستخدام موقعنا، تستفيد من مجموعة من الميزات والفوائد:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="h-full hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="flex justify-center mb-3">
                      <IconComponent className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-right">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LandingFeatures;
