"use client";

import { useState } from "react";

export function ProfileWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  const steps = [
    { id: 1, title: "المعلومات الأساسية", description: "الاسم والعمر والجنس" },
    {
      id: 2,
      title: "المعلومات الدينية",
      description: "الصلاة والحجاب واللحية",
    },
    { id: 3, title: "التعليم والعمل", description: "المؤهل الدراسي والوظيفة" },
    { id: 4, title: "الموقع والجنسية", description: "البلد والمدينة والجنسية" },
    {
      id: 5,
      title: "تفضيلات الزواج",
      description: "المواصفات المطلوبة في الشريك",
    },
    { id: 6, title: "الصورة الشخصية", description: "رفع صورة شخصية (اختياري)" },
    { id: 7, title: "معلومات الولي", description: "بيانات الولي أو الوصي" },
    {
      id: 8,
      title: "مراجعة وإرسال",
      description: "مراجعة جميع البيانات والموافقة",
    },
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep />;
      case 2:
        return <ReligiousInfoStep />;
      case 3:
        return <EducationWorkStep />;
      case 4:
        return <LocationStep />;
      case 5:
        return <PreferencesStep />;
      case 6:
        return <PhotoStep />;
      case 7:
        return <GuardianStep />;
      case 8:
        return <ReviewStep />;
      default:
        return <BasicInfoStep />;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.id <= currentStep
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step.id < currentStep ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>{" "}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-text mb-1">
              {steps[currentStep - 1]?.title || "خطوة غير معروفة"}
            </h2>
            <p className="text-text-secondary text-sm">
              {steps[currentStep - 1]?.description || ""}
            </p>
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {renderStepContent()}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-border rounded-md text-text-secondary hover:text-text hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            السابق
          </button>

          <div className="text-sm text-text-secondary">
            الخطوة {currentStep} من {totalSteps}
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === totalSteps}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === totalSteps ? "إرسال" : "التالي"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Step components
function BasicInfoStep() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-text mb-4">المعلومات الأساسية</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            الاسم الأول
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="أدخل اسمك الأول"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            اسم العائلة
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="أدخل اسم العائلة"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            العمر
          </label>
          <input
            type="number"
            min="18"
            max="100"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="أدخل عمرك"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            الجنس
          </label>
          <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">اختر الجنس</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            الحالة الاجتماعية
          </label>
          <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">اختر الحالة الاجتماعية</option>
            <option value="single">أعزب/عزباء</option>
            <option value="divorced">مطلق/مطلقة</option>
            <option value="widowed">أرمل/أرملة</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function ReligiousInfoStep() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-text mb-4">المعلومات الدينية</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text mb-3">
            هل تصلي الصلوات الخمس؟
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="prays" value="yes" className="ml-2" />
              نعم، بانتظام
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="prays"
                value="sometimes"
                className="ml-2"
              />
              أحياناً
            </label>
            <label className="flex items-center">
              <input type="radio" name="prays" value="no" className="ml-2" />
              لا
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-3">
            للأخوات: هل ترتدين الحجاب؟
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="hijab" value="yes" className="ml-2" />
              نعم
            </label>
            <label className="flex items-center">
              <input type="radio" name="hijab" value="no" className="ml-2" />
              لا
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="hijab"
                value="planning"
                className="ml-2"
              />
              أخطط لذلك
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-3">
            للإخوة: هل تحتفظ باللحية؟
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="beard" value="yes" className="ml-2" />
              نعم
            </label>
            <label className="flex items-center">
              <input type="radio" name="beard" value="no" className="ml-2" />
              لا
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="beard"
                value="planning"
                className="ml-2"
              />
              أخطط لذلك
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function EducationWorkStep() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-text mb-4">التعليم والعمل</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            المؤهل الدراسي
          </label>
          <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">اختر المؤهل الدراسي</option>
            <option value="high-school">ثانوية عامة</option>
            <option value="diploma">دبلوم</option>
            <option value="bachelor">بكالوريوس</option>
            <option value="master">ماجستير</option>
            <option value="phd">دكتوراه</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            مجال الدراسة
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="مثل: الطب، الهندسة، الشريعة"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            الوظيفة الحالية
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="أدخل وظيفتك الحالية"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            الراتب الشهري (اختياري)
          </label>
          <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">اختر الراتب الشهري</option>
            <option value="under-3000">أقل من 3000</option>
            <option value="3000-5000">3000 - 5000</option>
            <option value="5000-10000">5000 - 10000</option>
            <option value="10000-20000">10000 - 20000</option>
            <option value="over-20000">أكثر من 20000</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function LocationStep() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-text mb-4">الموقع والجنسية</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            البلد
          </label>
          <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">اختر البلد</option>
            <option value="sa">السعودية</option>
            <option value="eg">مصر</option>
            <option value="ae">الإمارات</option>
            <option value="jo">الأردن</option>
            <option value="lb">لبنان</option>
            <option value="sy">سوريا</option>
            <option value="iq">العراق</option>
            <option value="kw">الكويت</option>
            <option value="qa">قطر</option>
            <option value="bh">البحرين</option>
            <option value="om">عُمان</option>
            <option value="ye">اليمن</option>
            <option value="ma">المغرب</option>
            <option value="tn">تونس</option>
            <option value="dz">الجزائر</option>
            <option value="ly">ليبيا</option>
            <option value="sd">السودان</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            المدينة
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="أدخل المدينة"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            الجنسية
          </label>
          <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">اختر الجنسية</option>
            <option value="sa">سعودي</option>
            <option value="eg">مصري</option>
            <option value="ae">إماراتي</option>
            <option value="jo">أردني</option>
            <option value="lb">لبناني</option>
            <option value="sy">سوري</option>
            <option value="iq">عراقي</option>
            <option value="kw">كويتي</option>
            <option value="qa">قطري</option>
            <option value="bh">بحريني</option>
            <option value="om">عُماني</option>
            <option value="ye">يمني</option>
            <option value="ma">مغربي</option>
            <option value="tn">تونسي</option>
            <option value="dz">جزائري</option>
            <option value="ly">ليبي</option>
            <option value="sd">سوداني</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function PreferencesStep() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-text mb-4">تفضيلات الزواج</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            العمر المفضل (من)
          </label>
          <input
            type="number"
            min="18"
            max="100"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            العمر المفضل (إلى)
          </label>
          <input
            type="number"
            min="18"
            max="100"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            المؤهل الدراسي المفضل
          </label>
          <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">غير محدد</option>
            <option value="high-school">ثانوية عامة أو أعلى</option>
            <option value="diploma">دبلوم أو أعلى</option>
            <option value="bachelor">بكالوريوس أو أعلى</option>
            <option value="master">ماجستير أو أعلى</option>
            <option value="phd">دكتوراه</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            البلد المفضل
          </label>
          <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">غير محدد</option>
            <option value="same">نفس بلدي</option>
            <option value="any-arab">أي بلد عربي</option>
            <option value="specific">بلد محدد</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-3">
          الالتزام الديني المطلوب
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="religiosity"
              value="high"
              className="ml-2"
            />
            ملتزم جداً
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="religiosity"
              value="medium"
              className="ml-2"
            />
            ملتزم
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="religiosity"
              value="any"
              className="ml-2"
            />
            غير محدد
          </label>
        </div>
      </div>
    </div>
  );
}

function PhotoStep() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-text mb-4">الصورة الشخصية</h3>

      <div className="text-center">
        <div className="border-2 border-dashed border-border rounded-lg p-8 mb-4">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-4 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <p className="text-text-secondary mb-2">اختر صورة شخصية</p>
          <p className="text-sm text-text-secondary mb-4">
            الصورة اختيارية ولن تظهر إلا للأشخاص المعتمدين
          </p>
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover">
            رفع صورة
          </button>
        </div>

        <div className="text-sm text-text-secondary">
          <p>• الصورة يجب أن تكون واضحة ومحتشمة</p>
          <p>• الحد الأقصى لحجم الصورة: 5 ميجابايت</p>
          <p>• الأنواع المقبولة: JPG, PNG</p>
        </div>
      </div>
    </div>
  );
}

function GuardianStep() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-text mb-4">معلومات الولي</h3>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>للأخوات:</strong> يُنصح بشدة بإدخال معلومات الولي أو الوصي
          للتواصل عند الحاجة.
          <br />
          <strong>للإخوة:</strong> يمكن إدخال معلومات ولي الأمر أو الوصي
          (اختياري).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            اسم الولي/الوصي
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="أدخل اسم الولي أو الوصي"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            صلة القرابة
          </label>
          <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">اختر صلة القرابة</option>
            <option value="father">الأب</option>
            <option value="brother">الأخ</option>
            <option value="uncle">العم</option>
            <option value="grandfather">الجد</option>
            <option value="other">أخرى</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            رقم الهاتف
          </label>
          <input
            type="tel"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="أدخل رقم الهاتف"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            البريد الإلكتروني (اختياري)
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="أدخل البريد الإلكتروني"
            dir="ltr"
          />
        </div>
      </div>
    </div>
  );
}

function ReviewStep() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-text mb-4">مراجعة وإرسال</h3>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
        <p className="text-sm text-yellow-800">
          يرجى مراجعة جميع المعلومات بعناية قبل الإرسال. سيتم مراجعة ملفك الشخصي
          من قِبل الإدارة قبل النشر.
        </p>
      </div>

      <div className="space-y-4">
        <div className="border border-border rounded-md p-4">
          <h4 className="font-medium text-text mb-2">المعلومات الأساسية</h4>
          <p className="text-sm text-text-secondary">أحمد محمد، 28 سنة، أعزب</p>
        </div>

        <div className="border border-border rounded-md p-4">
          <h4 className="font-medium text-text mb-2">المعلومات الدينية</h4>
          <p className="text-sm text-text-secondary">
            يصلي بانتظام، يحتفظ باللحية
          </p>
        </div>

        <div className="border border-border rounded-md p-4">
          <h4 className="font-medium text-text mb-2">التعليم والعمل</h4>
          <p className="text-sm text-text-secondary">
            بكالوريوس هندسة، مهندس برمجيات
          </p>
        </div>

        <div className="border border-border rounded-md p-4">
          <h4 className="font-medium text-text mb-2">الموقع</h4>
          <p className="text-sm text-text-secondary">الرياض، السعودية</p>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="finalTerms"
          type="checkbox"
          className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
        />
        <label htmlFor="finalTerms" className="mr-2 block text-sm text-text">
          أؤكد أن جميع المعلومات المدخلة صحيحة وأوافق على{" "}
          <a href="/terms" className="text-primary hover:text-primary-hover">
            الشروط والأحكام
          </a>
        </label>
      </div>
    </div>
  );
}
