"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Building,
  Users,
  Shield,
  Book,
  DollarSign,
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
      icon: Building,
      title: "التوافق مع الشريعة",
      description:
        "نحرص على تقديم خدمة تتوافق مع تعاليم الإسلام، حيث نمنع التواصل المباشر بين المتقدمين وتوفير بيئة آمنة ومحترمة دون الحاجة لصور شخصية أو تفاصيل جسدية دقيقة.",
    },
    {
      icon: Users,
      title: "دعم التقاليد",
      description:
        "نؤمن في موقعنا بأهمية العائلة ودورها الراسخ في بناء زواج ناجح وربط الأسر ببعضها البعض. ولهذا، نُتيح للعائلات ووكلاء العريس أو العروس التقدم والتواصل معنا نيابة عنهم في رحلة البحث عن شريك الحياة المناسب. كما نُشجع جميع المتقدمين على جعل عائلاتهم شركاء في هذه الرحلة السعيدة منذ الخطوة الأولى على موقعنا حتى حفل الزفاف.",
    },
    {
      icon: Shield,
      title: "حفظ الكرامة",
      description:
        "تقتصر إمكانية الوصول إلى معلومات المتقدمين على الأعضاء المسجلين والمعتمدين فقط، وليس على جميع زوار الموقع.",
    },
    {
      icon: Book,
      title: "الالتزام بالدين",
      description:
        "غالبية المتقدمين لدينا يتميزون بالتزامهم بالدين والأخلاق الإسلامية، مما يهيئ بيئة مثالية للعثور على شركاء يشاركونك نفس القيم والاهتمامات.",
    },
    {
      icon: DollarSign,
      title: "تيسير الزواج",
      description:
        "نسعى في موقعنا إلى تسهيل الزواج من خلال تشجيع المرأة المسلمة الراغبة في العفاف وولي امرها على خفض تكاليف الزواج والمهر.",
    },
    {
      icon: Gift,
      title: "المجانية",
      description:
        "نقدم خدماتنا بنسبة 100% مجانًا للإخوة والأخوات على حد سواء، ولا يلزمك دفع أي رسوم أو مبالغ مالية في أي مرحلة من العملية.",
    },
    {
      icon: Globe,
      title: "الشمول",
      description:
        "يعتبر موقعنا متاحًا لجميع المسلمين السنة بغض النظر عن العمر، اللون، الأصل، اللغة، المستوى المالي، التعليمي أو الوضع الاجتماعي. تتوافر خدماتنا للمسلمين السنة في جميع أنحاء العالم.",
    },
    {
      icon: Target,
      title: "الجدية",
      description:
        "نحن نعمل على توفير بيئة ملائمة للبحث الجاد عن الشريك المناسب ونضمن أنه لا مجال للمراسلات العاطفية أو العلاقات الجانبية.",
    },
    {
      icon: Handshake,
      title: "التوافق",
      description:
        "نقوم بطرح العديد من الأسئلة التي تسهل عملية التعرف على الشريك المناسب، مما يزيد من فرص العثور على شريك يتماشى مع تطلعاتك واحتياجاتك بشكل أفضل.",
    },
    {
      icon: Zap,
      title: "السرعة",
      description:
        "نقوم بتسهيل تحويل العلاقة من العالم الافتراضي إلى العالم الحقيقي بشكل سريع ونقلها مباشرة إلى الأسرة.",
    },
    {
      icon: Lock,
      title: "الأمان",
      description:
        "نعتمد نظامًا يضمن بيئة آمنة وخالية من التجاوزات، من خلال حماية الخصوصية، منع التواصل المباشر بين الجنسين، والالتزام الكامل بالقيم الإسلامية في كل مراحل الخدمة.",
    },
    {
      icon: Star,
      title: "الثقة",
      description:
        "نحن نحترم ثقة إخواننا وأخواتنا فينا، خاصةً عندما يتعلق الأمر بقضايا حساسة مثل الزواج. نضمن التعامل مع جميع المتقدمين بصدق وأمانة ونقدم لهم خدمة صادقة وموثوقة.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-10 h-10 mr-3 text-amber-500" />
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
