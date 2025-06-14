import React, { Suspense, lazy } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRegistration } from "@/lib/hooks/useRegistration";
import { Loader2 } from "lucide-react";

// Lazy load step components for code splitting
const Step1Auth = lazy(
  () => import("@/components/auth/registration-steps/step1-auth"),
);
const Step2BasicInfo = lazy(
  () => import("@/components/auth/registration-steps/step2-basic-info"),
);
const Step3Religious = lazy(
  () => import("@/components/auth/registration-steps/step3-religious"),
);
const Step4Education = lazy(
  () => import("@/components/auth/registration-steps/step4-education"),
);
const Step5Bio = lazy(
  () => import("@/components/auth/registration-steps/step5-bio"),
);
const Step6Preferences = lazy(
  () => import("@/components/auth/registration-steps/step6-preferences"),
);
const Step7Photo = lazy(
  () => import("@/components/auth/registration-steps/step7-photo"),
);
const Step8Guardian = lazy(
  () => import("@/components/auth/registration-steps/step8-guardian"),
);
const Step9Review = lazy(
  () => import("@/components/auth/registration-steps/step9-review"),
);

interface EnhancedRegistrationWizardProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

const StepLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
      <p className="text-gray-600">جارٍ تحميل الخطوة...</p>
    </div>
  </div>
);

export function EnhancedRegistrationWizard({
  onSuccess,
  onCancel,
  className = "",
}: EnhancedRegistrationWizardProps) {
  const {
    currentStep,
    totalSteps,
    data,
    isSubmitting,
    error,
    nextStep,
    prevStep,
    goToStep,
    updateData,
    profilePicture,
    setProfilePicture,
    sendOTP,
    otpSent,
    submitRegistration,
    clearError,
    isStepCompleted,
    canProceedToStep,
  } = useRegistration();

  const steps = [
    {
      id: 1,
      title: "إنشاء الحساب",
      description: "البريد الإلكتروني وكلمة المرور",
    },
    { id: 2, title: "المعلومات الأساسية", description: "الاسم والعمر والجنس" },
    {
      id: 3,
      title: "المعلومات الدينية",
      description: "مستوى التدين والممارسات",
    },
    { id: 4, title: "التعليم والعمل", description: "المؤهلات والمهنة والموقع" },
    { id: 5, title: "نبذة شخصية", description: "معلومات إضافية ووصف شخصي" },
    {
      id: 6,
      title: "تفضيلات الزواج",
      description: "المواصفات المرغوبة في شريك الحياة",
    },
    { id: 7, title: "الصورة الشخصية", description: "رفع صورة (اختياري)" },
    { id: 8, title: "معلومات الولي", description: "بيانات الولي (اختياري)" },
    {
      id: 9,
      title: "مراجعة وإرسال",
      description: "مراجعة المعلومات وإنشاء الملف",
    },
  ];
  const renderStep = () => {
    const stepProps = {
      data,
      updateData,
      onNext: nextStep,
      onPrev: prevStep,
      error,
      clearError,
      isSubmitting,
    };

    switch (currentStep) {
      case 1:
        return (
          <Step1Auth {...stepProps} onSendOTP={sendOTP} otpSent={otpSent} />
        );
      case 2:
        return <Step2BasicInfo {...stepProps} />;
      case 3:
        return <Step3Religious {...stepProps} />;
      case 4:
        return <Step4Education {...stepProps} />;
      case 5:
        return <Step5Bio {...stepProps} />;
      case 6:
        return <Step6Preferences {...stepProps} />;
      case 7:
        return (
          <Step7Photo
            {...stepProps}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
          />
        );
      case 8:
        return <Step8Guardian {...stepProps} />;
      case 9:
        return (
          <Step9Review
            {...stepProps}
            profilePicture={profilePicture}
            onEdit={goToStep}
            onSubmit={submitRegistration}
          />
        );
      default:
        return null;
    }
  };

  const handleNext = async () => {
    if (currentStep === totalSteps) {
      const success = await submitRegistration();
      if (success) {
        onSuccess?.();
      }
    } else {
      await nextStep();
    }
  };

  const handlePrev = () => {
    prevStep();
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          {steps.map((step) => (
            <button
              key={step.id}
              className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                step.id === currentStep
                  ? "bg-primary text-white"
                  : isStepCompleted(step.id)
                    ? "bg-green-500 text-white"
                    : canProceedToStep(step.id)
                      ? "bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => canProceedToStep(step.id) && goToStep(step.id)}
              disabled={!canProceedToStep(step.id)}
            >
              {step.id}
            </button>
          ))}
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {steps[currentStep - 1]?.title}
          </h2>
          <p className="text-gray-600">{steps[currentStep - 1]?.description}</p>
          <div className="text-sm text-gray-500">
            الخطوة {currentStep} من {totalSteps}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader className="pb-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardHeader>

        <CardContent className="px-6 py-4">
          <Suspense fallback={<StepLoader />}>{renderStep()}</Suspense>
        </CardContent>

        <CardFooter className="flex justify-between px-6 py-4">
          <div className="flex space-x-2">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                إلغاء
              </Button>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1 || isSubmitting}
            >
              السابق
            </Button>
          </div>

          <Button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="min-w-32"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                {currentStep === totalSteps
                  ? "جارٍ الإنشاء..."
                  : "جارٍ المتابعة..."}
              </>
            ) : currentStep === totalSteps ? (
              "إنشاء الحساب"
            ) : (
              "التالي"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
