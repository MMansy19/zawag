import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthActions } from "@/lib/hooks/useAuthActions";
import { loginSchema, type LoginFormData } from "@/lib/validation/auth.schemas";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface EnhancedLoginFormProps {
  redirectTo?: string;
  onSuccess?: () => void;
  className?: string;
}

export function EnhancedLoginForm({
  redirectTo = "/dashboard",
  onSuccess,
  className = "",
}: EnhancedLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();

    const success = await login(data);

    if (success) {
      reset();
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(redirectTo);
      }
    }
  };

  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-bold text-center">تسجيل الدخول</h2>
        <p className="text-sm text-gray-600 text-center">
          أدخل بياناتك للوصول إلى حسابك
        </p>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Input
              label="البريد الإلكتروني"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="أدخل بريدك الإلكتروني"
              autoComplete="email"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                label="كلمة المرور"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={errors.password?.message}
                placeholder="أدخل كلمة المرور"
                autoComplete="current-password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute left-3 top-9 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="rememberMe"
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                disabled={isLoading}
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700">
                تذكرني
              </label>
            </div>

            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary hover:text-primary-hover"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || isSubmitting}
          >
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جارٍ تسجيل الدخول...
              </>
            ) : (
              "تسجيل الدخول"
            )}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">ليس لديك حساب؟ </span>
            <Link
              href="/auth/register"
              className="text-primary hover:text-primary-hover font-medium"
            >
              إنشاء حساب جديد
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
