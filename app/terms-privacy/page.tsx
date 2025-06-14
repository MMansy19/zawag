import { Metadata } from "next";
import { PublicLayout } from "@/components/layouts/public-layout";
import { InfoPageLayout } from "@/components/layouts/info-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Lock,
  Users,
  Heart,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "الشروط والخصوصية - الزواج السعيد",
  description:
    "اطلع على شروط الاستخدام وسياسة الخصوصية لمنصة الزواج السعيد. نضمن حماية معلوماتك الشخصية وفق أعلى معايير الأمان.",
  keywords: [
    "شروط الاستخدام",
    "سياسة الخصوصية",
    "حماية البيانات",
    "الأمان والخصوصية",
    "شروط الزواج السعيد",
  ],
  openGraph: {
    title: "الشروط والخصوصية - الزواج السعيد",
    description:
      "اطلع على شروط الاستخدام وسياسة الخصوصية. نضمن حماية معلوماتك الشخصية.",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/terms-privacy",
  },
};

export default function TermsPrivacyPage() {
  return (
    <PublicLayout>
      <InfoPageLayout
        title="الشروط والخصوصية"
        subtitle="نعتبر الشروط والخصوصية جزءًا أساسيًا من تجربتك معنا. نحرص على توفير بيئة آمنة وموثوقة للمتقدمين"
        badgeText="الشروط والسياسات"
        badgeIcon={Shield}
      >
        <div className="max-w-4xl mx-auto">
          {/* Terms Section */}
          <Card className="mb-8 shadow-lg">
            <CardHeader className="bg-emerald-600 text-white">
              <CardTitle className="flex items-center gap-3 text-xl font-amiri">
                <Users className="h-6 w-6" />
                الشروط
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {[
                  {
                    title: "الانتماء الديني",
                    content:
                      "الموقع مخصص للمسلمين من أهل السنة والجماعة فقط. لا تُقبل الطلبات من غير المسلمين أو من أصحاب المذاهب المخالفة.",
                    icon: <Heart className="h-5 w-5 text-emerald-600" />,
                  },
                  {
                    title: "الهدف من التقديم",
                    content:
                      "يُشترط أن تكون الرغبة في الزواج الشرعي المعروف. لا نقبل من يسعى لزواج المسيار أو الزواج العرفي أو أي علاقة غير شرعية.",
                    icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
                  },
                  {
                    title: "الجدية",
                    content:
                      "الموقع مخصص للجادين والجادّات فقط. لا مكان للعلاقات العابرة أو للتسلية أو ما يخالف ضوابط الشريعة.",
                    icon: <Shield className="h-5 w-5 text-emerald-600" />,
                  },
                  {
                    title: "أهلية الرجل للزواج",
                    content:
                      "يُشترط أن يكون المتقدم قادرًا على تحمل مسؤولية الزواج، من حيث توفير السكن والنفقة والاحتياجات الأساسية.",
                    icon: <Users className="h-5 w-5 text-emerald-600" />,
                  },
                  {
                    title: "الصدق والأمانة",
                    content:
                      "نرجو من الجميع تحري الصدق في جميع المعلومات المُقدّمة، والحفاظ على خصوصية الطرف الآخر وعدم إفشاء أي معلومات يتم الاطلاع عليها.",
                    icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
                  },
                  {
                    title: "القسم والتعهد",
                    content:
                      "يُطلب من كل متقدم ومتقدمة الموافقة على القسم عند تعبئة الاستمارة، تأكيدًا لصدق النية والمعلومات.",
                    icon: <Shield className="h-5 w-5 text-emerald-600" />,
                  },
                  {
                    title: "خصوصية النساء",
                    content:
                      "يجب على المتقدمة إبلاغ ولي أمرها أو أحد محارمها عند التقديم. يُمنع إدخال أي وسيلة تواصل شخصية خارج الخانة المخصصة لذلك. لا يُسمح بذكر أو وصف تفاصيل الجسد الدقيقة.",
                    icon: <Lock className="h-5 w-5 text-emerald-600" />,
                  },
                  {
                    title: "رقم ولي الأمر",
                    content:
                      "يُشترط أن يكون الرقم المُدخل في خانة رقم ولي الأمر خاصًا بولي الأمر الحقيقي فقط، حفاظًا على مصداقية الطلب وسريته. في حال التأكد من إدخال رقم غير صحيح أو رقم المتقدمة نفسها، يحتفظ الموقع بحق رفض أو إيقاف الطلب دون إشعار مسبق.",
                    icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
                  },
                  {
                    title: "التواصل والاختيار",
                    content:
                      "يُشترط على المتقدم التواصل فقط مع ولي أمر المتقدمة التي يراها مناسبة وله معها توافق واضح، ويُمنع التواصل مع أي متقدمة أخرى غير مناسبة أو لا تتوافق مع شروطه، احترامًا لوقت وجهد جميع الأطراف.",
                    icon: <Users className="h-5 w-5 text-emerald-600" />,
                  },
                  {
                    title: "تشجيع على التيسير",
                    content:
                      "ندعو إلى تسهيل الزواج، وتخفيف المهر، وتبسيط العرس، بما يتوافق مع توجيهات الدين وتيسير الحلال.",
                    icon: <Heart className="h-5 w-5 text-emerald-600" />,
                  },
                  {
                    title: "التهيئة النفسية والمعرفية",
                    content:
                      "نوصي بحضور برامج تثقيف وتأهيل للزواج بعد الخطبة، لتكوين أسرة مستقرة قائمة على الفهم والتفاهم.",
                    icon: <Users className="h-5 w-5 text-emerald-600" />,
                  },
                  {
                    title: "معيار الاختيار",
                    content:
                      "نحث الجميع على أن يكون الدين هو الأساس في اختيار الشريك، فالتقوى هي الركيزة الأولى في بناء حياة زوجية سعيدة.",
                    icon: <Heart className="h-5 w-5 text-emerald-600" />,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {index + 1}. {item.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <span className="font-semibold text-amber-800">تنويه:</span>
                </div>
                <p className="text-amber-700">
                  الشروط قابلة للتحديث حسب ما تقتضيه مصلحة المستخدمين وأهداف
                  الموقع.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Section */}
          <Card className="shadow-lg">
            <CardHeader className="bg-teal-600 text-white">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Lock className="h-6 w-6" />
                الخصوصية
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {[
                  {
                    title: "الاسم",
                    content:
                      "يتيح لك موقعنا استخدام اسم مستعار أو كنية بدلاً من اسمك الكامل. يمكنك أيضًا تقديم الاسم الأول فقط دون ذكر اسم العائلة إذا كنت تفضل ذلك.",
                    icon: <Users className="h-5 w-5 text-teal-600" />,
                  },
                  {
                    title: "الملف الشخصي",
                    content:
                      "نولي أهمية كبيرة لخصوصيتك ونضمن حماية معلوماتك الشخصية. لن يتم نشر استمارتك على الموقع الإلكتروني إلا بعد موافقتك الواضحة والصريحة. كما أن استمارتك ستكون متاحة فقط للأعضاء المسجلين لدينا، ولن يتمكن أي من زوار الموقع من الاطلاع عليها.",
                    icon: <Shield className="h-5 w-5 text-teal-600" />,
                  },
                  {
                    title: "وسائل التواصل",
                    content:
                      "نحن ملتزمون تمامًا بحماية خصوصيتك. قبل نشر أي ملف شخصي على الموقع، نقوم بحذف جميع وسائل التواصل الخاصة مثل رقم الواتساب والبريد الإلكتروني وأي معلومات تواصل شخصية أخرى. لن يتم عرض هذه البيانات لأي طرف ثالث. نود أن نوضح أن معلومات الاتصال التي تزودنا بها تُستخدم فقط من قبل إدارة الموقع للتواصل معك عند الحاجة. أما المعلومات التي قد تظهر في الملف فهي تقتصر فقط على رقم ولي أمر المتقدمة أو قريب موثوق منها، وذلك لتسهيل التواصل الرسمي والشرعي.",
                    icon: <Lock className="h-5 w-5 text-teal-600" />,
                  },
                  {
                    title: "حذف المعلومات",
                    content:
                      "يحق لك طلب حذف ملفك الشخصي في أي وقت ترغب فيه، سواء قبل بدء البحث أو أثناء البحث أو بعد العثور على الشريك المناسب. يكفي أن تراسلنا وتقدم لنا البريد الإلكتروني المسجل في حسابك، وسنقوم بحذف جميع معلوماتك من موقعنا وأنظمتنا بما في ذلك الحواسيب، وسنقوم بحذف أي مراسلات تمت بيننا عبر البريد الإلكتروني.",
                    icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
                  },
                  {
                    title: "أمن المعلومات",
                    content:
                      "نؤكد أننا لا نطلب معلومات حساسة أو غير محترمة من المتقدمين على موقعنا من شأنها أن تلحق الضرر بصاحبها أو تنتهك خصوصيته، حتى لو تم الكشف عنها.",
                    icon: <Shield className="h-5 w-5 text-teal-600" />,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        • {item.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-emerald-600 mb-4">
              <Shield className="h-6 w-6" />
              <span className="font-semibold">
                نحن ملتزمون بحماية خصوصيتك وضمان أمان معلوماتك
              </span>
            </div>
            <p className="text-gray-600 text-sm">آخر تحديث: يونيو 2025</p>
          </div>
        </div>
      </InfoPageLayout>
    </PublicLayout>
  );
}
