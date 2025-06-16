"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Typography component props interface
interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// Typography variants with semantic naming for Islamic content
export const variants = {
  // Hero and display text
  hero: "text-hero font-display text-text arabic-optimized text-balance",
  display: "text-page-title font-display text-text arabic-optimized",

  // Headings hierarchy
  h1: "text-page-title font-heading text-text arabic-optimized",
  h2: "text-section-title font-heading text-text arabic-optimized",
  h3: "text-card-title font-heading text-text arabic-optimized",
  h4: "text-lg font-medium font-heading text-text arabic-optimized",
  h5: "text-base font-medium font-heading text-text arabic-optimized",
  h6: "text-sm font-medium font-heading text-text arabic-optimized",

  // Body text variants
  bodyLarge: "text-body-large text-text arabic-optimized text-pretty",
  body: "text-body text-text arabic-optimized text-pretty",
  bodySmall: "text-body-small text-text arabic-optimized",

  // UI text
  button: "text-button-primary font-medium arabic-optimized",
  buttonSmall: "text-button-small font-medium arabic-optimized",
  label: "text-label text-text arabic-optimized",
  caption: "text-caption text-text-secondary arabic-optimized",
  helper: "text-helper arabic-optimized",
  error: "text-error arabic-optimized",

  // Special content
  islamicVerse: "text-islamic-verse arabic-optimized",
  arabicName: "text-arabic-name arabic-optimized",
  profileIntro: "text-profile-intro arabic-optimized arabic-justify",

  // Navigation
  navPrimary: "text-nav-primary text-text arabic-optimized",
  navSecondary: "text-nav-secondary text-text-secondary arabic-optimized",

  // Status and badges
  status: "text-status arabic-optimized",

  // Muted and secondary text
  muted: "text-sm text-text-secondary arabic-optimized",
  subtle: "text-xs text-text-secondary arabic-optimized",
} as const;

export type TypographyVariant = keyof typeof variants;

// Base Typography component
export function Typography({
  children,
  className,
  as = "p",
  ...props
}: TypographyProps & { [key: string]: any }) {
  const Component = as;

  return (
    <Component className={cn("arabic-optimized", className)} {...props}>
      {children}
    </Component>
  );
}

// Semantic typography components
export function Hero({ children, className, ...props }: TypographyProps) {
  return (
    <Typography as="h1" className={cn(variants.hero, className)} {...props}>
      {children}
    </Typography>
  );
}

export function Heading1({ children, className, ...props }: TypographyProps) {
  return (
    <Typography as="h1" className={cn(variants.h1, className)} {...props}>
      {children}
    </Typography>
  );
}

export function Heading2({ children, className, ...props }: TypographyProps) {
  return (
    <Typography as="h2" className={cn(variants.h2, className)} {...props}>
      {children}
    </Typography>
  );
}

export function Heading3({ children, className, ...props }: TypographyProps) {
  return (
    <Typography as="h3" className={cn(variants.h3, className)} {...props}>
      {children}
    </Typography>
  );
}

export function Heading4({ children, className, ...props }: TypographyProps) {
  return (
    <Typography as="h4" className={cn(variants.h4, className)} {...props}>
      {children}
    </Typography>
  );
}

export function BodyLarge({ children, className, ...props }: TypographyProps) {
  return (
    <Typography as="p" className={cn(variants.bodyLarge, className)} {...props}>
      {children}
    </Typography>
  );
}

export function Body({ children, className, ...props }: TypographyProps) {
  return (
    <Typography as="p" className={cn(variants.body, className)} {...props}>
      {children}
    </Typography>
  );
}

export function BodySmall({ children, className, ...props }: TypographyProps) {
  return (
    <Typography as="p" className={cn(variants.bodySmall, className)} {...props}>
      {children}
    </Typography>
  );
}

export function Caption({ children, className, ...props }: TypographyProps) {
  return (
    <Typography
      as="span"
      className={cn(variants.caption, className)}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Label({ children, className, ...props }: TypographyProps) {
  return (
    <Typography as="label" className={cn(variants.label, className)} {...props}>
      {children}
    </Typography>
  );
}

export function Helper({ children, className, ...props }: TypographyProps) {
  return (
    <Typography as="p" className={cn(variants.helper, className)} {...props}>
      {children}
    </Typography>
  );
}

export function ErrorText({ children, className, ...props }: TypographyProps) {
  return (
    <Typography as="p" className={cn(variants.error, className)} {...props}>
      {children}
    </Typography>
  );
}

export function IslamicVerse({
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <Typography
      as="blockquote"
      className={cn(variants.islamicVerse, className)}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function ArabicName({ children, className, ...props }: TypographyProps) {
  return (
    <Typography
      as="span"
      className={cn(variants.arabicName, className)}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function ProfileIntro({
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <Typography
      as="p"
      className={cn(variants.profileIntro, className)}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Status({ children, className, ...props }: TypographyProps) {
  return (
    <Typography as="span" className={cn(variants.status, className)} {...props}>
      {children}
    </Typography>
  );
}

export function Muted({ children, className, ...props }: TypographyProps) {
  return (
    <Typography as="p" className={cn(variants.muted, className)} {...props}>
      {children}
    </Typography>
  );
}

export function Subtle({ children, className, ...props }: TypographyProps) {
  return (
    <Typography as="span" className={cn(variants.subtle, className)} {...props}>
      {children}
    </Typography>
  );
}

// Export all components
export { Typography as default, variants as typographyVariants };
