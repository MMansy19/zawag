Marriage Platform Phase 1: Styling and Design System README
📖 Overview
This document provides a comprehensive guide to the styling and design system for the Marriage Platform Phase 1, a web application designed to facilitate marriage connections with a focus on privacy, moderation, and user safety. The platform is built with Next.js (App Router), Tailwind CSS for styling, TypeScript for type safety, Lucide React for icons, and GSAP for animations. The design is light-mode-only and supports Arabic as the sole language, ensuring a culturally sensitive and user-friendly experience for Arabic-speaking users.
As a senior UI/UX developer and designer, this README outlines a professional design system, including color schemes, typography, component styling, animations, and global styles. It also details how admins can modify styling settings via a centralized configuration, ensuring maintainability and flexibility. The focus is on creating a visually appealing, accessible, and responsive interface optimized for Arabic users.
🛠️ Tech Stack for Styling

Styling: Tailwind CSS (^3.4.0) for utility-first styling, enabling rapid development and consistency.
Icons: Lucide React (^0.441.0) for lightweight, customizable SVG icons.
Animations: GSAP (^3.12.0) for smooth, performant animations (e.g., page transitions, form steps).
Language: Arabic-only, with RTL (right-to-left) support using Tailwind’s RTL plugin.
Typography: Arabic fonts (Noto Kufi Arabic, Amiri) for readability and cultural alignment.
Global Styles: Centralized in globals.css with CSS custom properties for admin-configurable settings.
Accessibility: WCAG 2.1 compliance with sufficient color contrast and ARIA support.
Responsive Design: Tailwind’s responsive utilities (sm:, md:, etc.) for mobile-first design.

🎨 Design Principles

Cultural Sensitivity: Use Arabic typography and culturally appropriate colors/icons.
Light Mode Only: Clean, bright interface with a focus on simplicity and clarity.
Accessibility: Ensure high contrast, keyboard navigation, and screen reader support.
Consistency: Centralized styles and reusable components for a cohesive UI.
Performance: Optimize CSS bundle size and animation performance.
Admin Configurability: Allow admins to update colors, fonts, and spacing via a settings panel.
RTL Support: Full support for Arabic’s right-to-left layout.

📂 Project Structure (Styling-Related)
marriage-platform/
├── app/
│ ├── styles/ # Global and theme-related styles
│ │ ├── globals.css # Centralized global styles
│ │ └── themes/ # Theme configuration for admin settings
│ ├── components/ # Reusable UI components with Tailwind styling
│ │ ├── common/ # Buttons, Inputs, Cards, etc.
│ │ ├── icons/ # Lucide React icon wrappers
│ │ ├── animations/ # GSAP animation utilities
├── lib/
│ ├── constants/ # Style-related constants (e.g., colors, fonts)
│ ├── hooks/ # Custom hooks (e.g., useTheme)
│ ├── types/ # TypeScript types for styling
├── public/
│ ├── fonts/ # Custom Arabic fonts (Noto Kufi Arabic, Amiri)
├── tailwind.config.js # Tailwind configuration with custom theme
├── package.json # Dependencies and scripts

🚀 Setup Instructions

Install Dependencies
npm install tailwindcss@3.4.0 @tailwindcss/rtl lucide-react@0.441.0 gsap@3.12.0

Configure Tailwind
Update tailwind.config.js:
/** @type {import('tailwindcss').Config} \*/
module.exports = {
content: [
'./app/**/_.{js,ts,jsx,tsx}',
'./components/\*\*/_.{js,ts,jsx,tsx}',
],
theme: {
extend: {
colors: {
primary: 'var(--primary-color, #1E88E5)', // Blue
secondary: 'var(--secondary-color, #4CAF50)', // Green
accent: 'var(--accent-color, #FBC02D)', // Yellow
background: 'var(--background-color, #F5F5F5)', // Light Gray
text: 'var(--text-color, #212121)', // Dark Gray
error: 'var(--error-color, #D32F2F)', // Red
},
fontFamily: {
sans: ['Noto Kufi Arabic', 'Amiri', 'sans-serif'],
},
spacing: {
xs: 'var(--spacing-xs, 0.5rem)',
sm: 'var(--spacing-sm, 1rem)',
md: 'var(--spacing-md, 1.5rem)',
lg: 'var(--spacing-lg, 2rem)',
},
},
},
plugins: [require('@tailwindcss/rtl')],
};

Add Fonts
Download Noto Kufi Arabic and Amiri fonts and place them in public/fonts/.

Configure Environment
Create .env.local:
NEXT_PUBLIC_API_BASE_URL=http://api.marriage-platform.com

Run Development Server
npm run dev

🎨 Color Palette
The color palette is designed to be clean, professional, and culturally appropriate for an Arabic audience. It uses CSS custom properties for admin configurability.

Color
Variable
Hex (Default)
Usage

Primary
--primary-color
#1E88E5
Buttons, links, highlights

Secondary
--secondary-color
#4CAF50
Success states, secondary buttons

Accent
--accent-color
#FBC02D
Callouts, warnings

Background
--background-color
#F5F5F5
Page background

Text
--text-color
#212121
Body text, headings

Error
--error-color
#D32F2F
Error messages, alerts

Border
--border-color
#E0E0E0
Input borders, dividers

Card
--card-bg
#FFFFFF
Cards, modals

Admin Configurability
Admins can update colors via a settings panel (/admin/settings) that updates CSS custom properties stored in a backend JSON config or database. The frontend fetches these settings on load and applies them dynamically.
// lib/hooks/useTheme.ts
import { useEffect, useState } from 'react';
import axios from '@/lib/api/axios';

interface ThemeConfig {
primaryColor: string;
secondaryColor: string;
// ... other properties
}

export const useTheme = () => {
const [theme, setTheme] = useState<ThemeConfig | null>(null);

useEffect(() => {
const fetchTheme = async () => {
const response = await axios.get('/admin/settings/theme');
setTheme(response.data);
// Apply theme to root
Object.entries(response.data).forEach(([key, value]) => {
document.documentElement.style.setProperty(`--${key}`, value);
});
};
fetchTheme();
}, []);

return theme;
};

🖋️ Typography
Fonts

Primary: Noto Kufi Arabic (clean, modern, highly readable for Arabic).
Fallback: Amiri (traditional, serif-style for headings).
Sans-serif: Fallback for compatibility.

Font Sizes

Size
Variable
Value
Usage

XS
--font-size-xs
12px
Captions, fine print

SM
--font-size-sm
14px
Secondary text, labels

MD
--font-size-md
16px
Body text

LG
--font-size-lg
20px
Subheadings

XL
--font-size-xl
24px
Headings

2XL
--font-size-2xl
32px
Page titles

Line Heights

Default: 1.5 for body text.
Headings: 1.2 for tighter spacing.

Example: Typography in Tailwind

<h1 className="text-2xl font-bold font-sans leading-tight text-text">
  مرحبا بك في منصة الزواج
</h1>
<p className="text-md text-text leading-relaxed">
  منصة مخصصة لتسهيل التواصل بين الأفراد بطريقة آمنة ومحترمة.
</p>

📏 Spacing
Spacing is standardized using CSS custom properties for consistency and admin configurability.

Size
Variable
Value
Usage

XS
--spacing-xs
0.5rem
Tight margins/padding

SM
--spacing-sm
1rem
Default spacing

MD
--spacing-md
1.5rem
Card padding, sections

LG
--spacing-lg
2rem
Large sections, modals

🖼️ Icons
Lucide React provides a lightweight, customizable icon set. Icons are styled with Tailwind for size and color.
Usage Example
// components/common/Icon.tsx
import { LucideIcon } from 'lucide-react';

interface IconProps {
name: keyof typeof import('lucide-react');
size?: number;
color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'var(--text-color)' }) => {
const LucideIcon = require('lucide-react')[name] as LucideIcon;
return <LucideIcon size={size} color={color} />;
};

export default Icon;

// Usage
<Icon name="User" size={20} className="text-primary" />

Common Icons

User: Profile-related actions.
Search: Search page and filters.
MessageCircle: Chat system.
Shield: Admin dashboard.
AlertTriangle: Flagged content/reports.

🎥 Animations with GSAP
GSAP is used for smooth, performant animations to enhance UX without overwhelming users.
Animation Guidelines

Subtlety: Use animations sparingly to avoid distraction (e.g., fade-ins, slide-ins).
Performance: Optimize with GSAP’s will-change and GPU-accelerated properties.
Accessibility: Provide a prefers-reduced-motion fallback.

Example: Page Transition
// components/animations/PageTransition.tsx
import { useEffect } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
useEffect(() => {
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      '.page-content',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

}, []);

return <div className="page-content">{children}</div>;
};

export default PageTransition;

Common Animations

Fade In: For modals, cards, and form steps.
Slide In: For sidebar filters and notifications.
Button Hover: Scale or color change for interactive elements.
Progress Bar: Smooth transition for multi-step form progress.

🖌️ Component Styling
Buttons
// components/common/Button.tsx
interface ButtonProps {
children: React.ReactNode;
variant?: 'primary' | 'secondary' | 'danger';
size?: 'sm' | 'md' | 'lg';
disabled?: boolean;
onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
children,
variant = 'primary',
size = 'md',
disabled,
onClick,
}) => {
const baseStyles = 'rounded-md font-medium transition-all duration-200';
const variantStyles = {
primary: 'bg-primary text-white hover:bg-primary/90',
secondary: 'bg-secondary text-white hover:bg-secondary/90',
danger: 'bg-error text-white hover:bg-error/90',
};
const sizeStyles = {
sm: 'px-3 py-1 text-sm',
md: 'px-4 py-2 text-md',
lg: 'px-6 py-3 text-lg',
};

return (
<button
onClick={onClick}
disabled={disabled}
className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} disabled:opacity-50`} >
{children}
</button>
);
};

export default Button;

Inputs
// components/common/TextInput.tsx
import { forwardRef } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
label: string;
error?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
({ label, error, ...props }, ref) => (

<div className="space-y-1">
<label className="block text-sm font-medium text-text">{label}</label>
<input
ref={ref}
className="w-full border border-border rounded-md p-2 text-md focus:outline-none focus:ring-2 focus:ring-primary"
{...props}
/>
{error && <p className="text-error text-sm">{error}</p>}
</div>
)
);

TextInput.displayName = 'TextInput';

export default TextInput;

Cards
// components/common/Card.tsx
interface CardProps {
children: React.ReactNode;
className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => (

  <div className={`bg-card shadow-sm rounded-md p-4 ${className}`}>
    {children}
  </div>
);

export default Card;

🌐 Global Styling
Global styles are centralized in globals.css, using CSS custom properties for flexibility. Admins can update these properties via the settings panel.
Example: Admin Settings Component
// components/admin/SettingsForm.tsx
import { useState, useEffect } from 'react';
import axios from '@/lib/api/axios';

interface ThemeSettings {
primaryColor: string;
secondaryColor: string;
fontSizeMd: string;
// ... other properties
}

const SettingsForm = () => {
const [settings, setSettings] = useState<ThemeSettings>({
primaryColor: '#1E88E5',
secondaryColor: '#4CAF50',
fontSizeMd: '16px',
});

const handleChange = (key: keyof ThemeSettings, value: string) => {
setSettings((prev) => ({ ...prev, [key]: value }));
};

const handleSave = async () => {
try {
await axios.post('/admin/settings/theme', settings);
Object.entries(settings).forEach(([key, value]) => {
document.documentElement.style.setProperty(`--${key}`, value);
});
} catch (error) {
console.error('Failed to save settings:', error);
}
};

return (

<div className="max-w-md p-6">
<h2 className="text-2xl font-bold mb-4">إعدادات التصميم</h2>
<div className="space-y-4">
<div>
<label className="block text-sm font-medium text-text">اللون الأساسي</label>
<input
type="color"
value={settings.primaryColor}
onChange={(e) => handleChange('primaryColor', e.target.value)}
className="w-full h-10"
/>
</div>
<div>
<label className="block text-sm font-medium text-text">اللون الثانوي</label>
<input
type="color"
value={settings.secondaryColor}
onChange={(e) => handleChange('secondaryColor', e.target.value)}
className="w-full h-10"
/>
</div>
<div>
<label className="block text-sm font-medium text-text">حجم الخط الافتراضي</label>
<input
type="text"
value={settings.fontSizeMd}
onChange={(e) => handleChange('fontSizeMd', e.target.value)}
className="w-full border border-border rounded-md p-2"
/>
</div>
<Button onClick={handleSave}>حفظ الإعدادات</Button>
</div>
</div>
);
};

export default SettingsForm;

📱 Responsive Design

Mobile-First: Use Tailwind’s mobile-first approach (e.g., text-md sm:text-lg).
Breakpoints:
sm: 640px (mobile)
md: 768px (tablet)
lg: 1024px (desktop)

RTL: Ensure all layouts support right-to-left text with @tailwindcss/rtl.
Form Layouts: Stack forms vertically on mobile, grid on desktop.
Cards: Single-column on mobile, multi-column grid on desktop.

♿ Accessibility

Contrast: Ensure text/background contrast ratios meet WCAG 2.1 AA (4.5:1).
Keyboard Navigation: All interactive elements (buttons, inputs) are focusable.
ARIA: Use ARIA labels for icons, modals, and form fields.
Screen Readers: Test with NVDA or VoiceOver for Arabic content.
Reduced Motion: Respect prefers-reduced-motion with GSAP fallbacks.

🧪 Performance Optimizations

Minimize CSS: Purge unused Tailwind classes in production.
Lazy Load Icons: Use dynamic imports for Lucide icons.
Optimize Animations: Use GSAP’s lightweight plugins and GPU-accelerated properties.
Font Loading: Use font-display: swap to prevent FOIT (Flash of Invisible Text).
Image Uploads: Compress profile pictures client-side before upload.

📚 Styling for Specific Flows
🔐 Registration + Profile Builder

Form Steps: Use a progress bar with GSAP animations for step transitions.
Inputs: Highlight focused inputs with a primary color ring.
Profile Picture: Display a circular avatar with a subtle shadow.
Review Step: Use a Card component with a grid layout for profile summary.

🔍 Search Flow

Filter Sidebar: Collapsible on mobile with a slide-in animation.
Profile Cards: Hover effects with GSAP scale and shadow transitions.
Pagination: Styled buttons with primary/secondary colors.

💍 Marriage Request Flow

Request Modal: Fade-in animation with a centered, rounded modal.
Accept/Reject Buttons: Use secondary (accept) and danger (reject) variants.
Notifications: Slide-in toast notifications for request status updates.

💬 Chat System Flow

Chat Window: Card with a scrollable message area and fixed input at the bottom.
Messages: Alternate background colors for sender/receiver messages.
Rate Limit Warning: Animated alert with error color.

🛡️ Admin Dashboard

Tabs: Horizontal tabs with primary color underlines on active tab.
Tables: Zebra-striped rows with hover effects.
Flagged Messages: Highlight with accent color and toggle buttons.
Settings Form: Grid layout for color pickers and inputs.

🧑‍💼 Admin Styling Customization
Admins can update the following via /admin/settings:

Colors: Primary, secondary, accent, etc.
Font Sizes: XS, SM, MD, LG, XL, 2XL.
Spacing: XS, SM, MD, LG.
Fonts: Toggle between Noto Kufi Arabic and Amiri.

Backend Integration

GET /admin/settings/theme: Fetches current theme settings.
POST /admin/settings/theme: Updates theme settings and applies to frontend.

📜 Example Components with Styling
OTPInput
// components/auth/OTPInput.tsx
import { useState, useRef } from 'react';
import { gsap } from 'gsap';

interface OTPInputProps {
length: number;
onComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onComplete }) => {
const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
const inputRefs = useRef<HTMLInputElement[]>([]);

useEffect(() => {
gsap.from(inputRefs.current, {
opacity: 0,
y: 10,
stagger: 0.1,
duration: 0.3,
ease: 'power2.out',
});
}, []);

const handleChange = (value: string, index: number) => {
if (!/^\d$/.test(value) && value !== '') return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== '')) {
      onComplete(newOtp.join(''));
    }

};

return (

<div className="flex gap-2 dir-rtl">
{otp.map((digit, index) => (
<input
key={index}
type="text"
maxLength={1}
value={digit}
onChange={(e) => handleChange(e.target.value, index)}
ref={(el) => el && (inputRefs.current[index] = el)}
className="w-12 h-12 text-center border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text text-md"
aria-label={`رقم OTP ${index + 1}`}
/>
))}
</div>
);
};

export default OTPInput;

ProfileCard
// components/search/ProfileCard.tsx
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { useRef } from 'react';
import Icon from '@/components/common/Icon';

interface Profile {
id: string;
name: string;
age: number;
country: string;
intro: string;
}

interface ProfileCardProps {
profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
const router = useRouter();
const cardRef = useRef<HTMLDivElement>(null);

const handleMouseEnter = () => {
gsap.to(cardRef.current, {
scale: 1.02,
boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
duration: 0.2,
});
};

const handleMouseLeave = () => {
gsap.to(cardRef.current, {
scale: 1,
boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
duration: 0.2,
});
};

return (

<div
      ref={cardRef}
      className="bg-card border border-border rounded-md p-4 shadow-sm transition-all dir-rtl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
<h3 className="text-lg font-bold text-text">{profile.name}</h3>
<p className="text-sm text-text/80">
{profile.age} سنة، {profile.country}
</p>
<p className="mt-2 text-md text-text">{profile.intro}</p>
<Button
variant="primary"
size="sm"
className="mt-4 flex items-center gap-2"
onClick={() => router.push(`/requests/new?profileId=${profile.id}`)} >
<Icon name="Send" size={16} />
إرسال طلب
</Button>
</div>
);
};

export default ProfileCard;

🧪 Testing Styling
Visual Regression Testing
Use tools like Storybook or Playwright to test component styles.
npm install --save-dev @storybook/react playwright

Example: Playwright Test
// tests/profile-card.spec.js
const { test, expect } = require('@playwright/test');

test('ProfileCard renders correctly', async ({ page }) => {
await page.goto('http://localhost:3000/search');
const card = page.locator('.bg-card').first();
await expect(card).toHaveCSS('background-color', 'rgb(255, 255, 255)');
await expect(card).toHaveCSS('direction', 'rtl');
});

🚧 Future Styling Improvements

Add micro-interactions for form validations (e.g., shake on error).
Implement a theme previewer in the admin settings panel.
Optimize font loading with preconnect and subsetting for Arabic glyphs.
Add hover effects for all interactive elements.
Support dynamic font scaling based on user preferences.

📜 License
This project is proprietary and intended for internal use by the Marriage Platform team. Unauthorized distribution or use is prohibited.
📞 Contact
For questions or support, contact the UI/UX lead at uiux@marriage-platform.com.

Generated on June 12, 2025, by Grok 3 for the Marriage Platform team.
