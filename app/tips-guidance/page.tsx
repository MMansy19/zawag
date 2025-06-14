import { Metadata } from "next";
import { PublicLayout } from "@/components/layouts/public-layout";
import { InfoPageLayout } from "@/components/layouts/info-page-layout";
import { CommonFAQ } from "@/components/common/faq";
import { allTipsGuidanceFaqData } from "@/lib/constants/faq-data";
import { Mail, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "نصائح وتوجيهات | موقع الزواج الإسلامي",
  description:
    "إجابات شاملة لأهم الأسئلة المتعلقة بالزواج الإسلامي، مُستندين إلى القرآن الكريم والسنة النبوية الشريفة",
  keywords:
    "نصائح الزواج الإسلامي, توجيهات الزواج, الزواج في الإسلام, فتاوى الزواج, أحكام الزواج",
};

export default function TipsGuidancePage() {
  return (
    <PublicLayout>
      <InfoPageLayout
        title="نصائح وتوجيهات"
        subtitle="نسعى لتقديم إجابات شاملة لأهم الأسئلة المتعلقة بالزواج الإسلامي، مُستندين إلى القرآن الكريم والسنة النبوية الشريفة"
        badgeText="نصائح وإرشادات"
        badgeIcon={Lightbulb}
      >
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              نتمنى أن تساهم هذه المعلومات في توعية الراغبين في الزواج بأهميته
              وأهدافه السامية في الإسلام، ونسعى جاهدين لتقديم المزيد من الدعم
              والإرشاد لبناء حياة زوجية سعيدة مُستَنِدَةٍ إلى تعاليم الإسلام
              تُسعدكم في الدنيا والآخرة.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              لا تترددوا في تصفح الأسئلة أدناه، وإذا كان لديكم أي سؤال لم يتم
              الإجابة عليه، فلا تترددوا في الاتصال بنا للحصول على المساعدة.
              يسعدنا تقديم معلومات عامة حول الزواج من منظور شرعي، ونشجعك على طرح
              أي أسئلة لديك دون تردد.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>
                مع ذلك، نودّ التأكيد على أننا لا نستطيع تقديم فتاوى دينية مُلزمة
                أو إجابات مُحددة على جميع الأسئلة.
              </strong>{" "}
              في حال رغبتك باستشارة مُتخصصة، مثل مفتٍ أو مُختصٍّ في الشأن
              الشرعي، يُمكننا مساعدتك في العثور على الجهة المُناسبة للحصول على
              المساعدة المُلائمة.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <CommonFAQ
          faqs={allTipsGuidanceFaqData}
          title="الأسئلة والأجوبة الشرعية"
          subtitle="إجابات شاملة مُستندة إلى القرآن الكريم والسنة النبوية الشريفة"
          helperText="يرجى النقر على السؤال لتظهر لك الإجابة."
          initialDisplayCount={5}
          showToggle={true}
          showContactButton={true}
          contactButtonText="تواصل معنا للمزيد من المساعدة"
          contactButtonHref="/contact"
          contactButtonIcon={<Mail className="w-5 h-5" />}
          className="bg-white"
        />
      </InfoPageLayout>
    </PublicLayout>
  );
}
