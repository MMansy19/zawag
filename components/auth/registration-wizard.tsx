"use client";
import React, { Suspense, lazy } from "react";
import { useRouter } from "next/navigation";
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
const Step2AllData = lazy(
  () => import("@/components/auth/registration-steps/step2-all-data"),
);
const Step3Review = lazy(
  () => import("@/components/auth/registration-steps/step3-review"),
);

interface RegistrationWizardProps {
  className?: string;
}

const StepLoader = () => (
  <div className="flex items-center justify-center py-8 sm:py-12">
    <div className="text-center space-y-4">
      <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary mx-auto" />
      <p className="text-sm sm:text-base text-gray-600">جارٍ تحميل الخطوة...</p>
    </div>
  </div>
);

export function RegistrationWizard({
  className = "",
}: RegistrationWizardProps) {
  const router = useRouter();
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
    sendOTP,
    otpSent,
    submitRegistration,
    clearError,
    isStepCompleted,
    canProceedToStep,
  } = useRegistration();
  // Dynamic steps based on gender
  const getSteps = () => {
    const steps = [
      {
        id: 1,
        title: "إنشاء الحساب",
        description: "البريد الإلكتروني، الهاتف، كلمة المرور والجنس",
      },
      {
        id: 2,
        title: "المعلومات الشخصية",
        description: "جميع البيانات المطلوبة للملف الشخصي",
      },
      {
        id: 3,
        title: "مراجعة وإرسال",
        description: "مراجعة المعلومات وإنشاء الملف",
      },
    ];

    return steps;
  };

  const steps = getSteps();
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
        return <Step2AllData {...stepProps} />;
      case 3:
        return (
          <Step3Review
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
        router.push("/dashboard");
      }
    } else {
      await nextStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    prevStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto px-0 sm:px-2 lg:px-4 ${className}`}
    >
      {/* Progress Indicator */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-center lg:gap-20 md:gap-10 gap-5 items-center mb-4 sm:mb-6 overflow-x-auto">
          {steps.map((step) => (
            <button
              key={step.id}
              className={`flex items-center justify-center w-10 h-12 mx-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 px-2">
            {steps[currentStep - 1]?.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            {steps[currentStep - 1]?.description}
          </p>
          <div className="text-xs sm:text-sm text-gray-500">
            الخطوة {currentStep} من {totalSteps}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <Card className="shadow-sm sm:shadow-md">
        <CardHeader className="pb-4 px-2 sm:px-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}
        </CardHeader>

        <CardContent className="px-2 sm:px-4 py-4">
          <Suspense fallback={<StepLoader />}>{renderStep()}</Suspense>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-2 px-4 sm:px-6 py-4">
          <div className="flex gap-2 w-full sm:w-auto order-2 sm:order-1">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none text-sm"
            >
              إلغاء
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1 || isSubmitting}
              className="flex-1 sm:flex-none text-sm"
            >
              السابق
            </Button>
          </div>

          <Button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="min-w-32 w-full sm:w-auto order-1 sm:order-2 text-sm sm:text-base"
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
