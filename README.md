<div align="center">
  <img src="./public/logo.png" alt="Islamic Zawaj Platform Logo" width="200" height="200" />
  
  # Islamic Zawaj Platform
  
  ### A comprehensive Next.js 14 platform for Islamic marriage connections
  *Built with privacy, moderation, and cultural sensitivity at its core*
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://alzawajalsaeid.vercel.app)
  [![Version](https://img.shields.io/badge/Version-1.0.0-green?style=for-the-badge)](https://github.com/your-org/islamic-zawaj-platform)
  [![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](./LICENSE)
  
  [🌟 Features](#-features) • [🚀 Live Demo](https://alzawajalsaeid.vercel.app) • [📖 Documentation](#-documentation) • [🤝 Support](#-support)
  
</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🚀 Live Demo](#-live-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚡ Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🎨 Design System](#-design-system)
- [🔐 Security & Privacy](#-security--privacy)
- [🌍 Internationalization](#-internationalization)
- [🧪 Testing Strategy](#-testing-strategy)
- [📊 Performance](#-performance)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📚 Documentation](#-documentation)
- [👨‍💻 Author & Team](#-author--team)
- [🆘 Support](#-support)

---

## 🌟 Features

### 👤 User Management & Authentication

- **Smart Registration System**: 8-step guided profile creation with Islamic values integration
- **OTP Verification**: Secure phone/email verification with SMS and email support
- **Profile Builder Wizard**: Comprehensive profile creation with privacy controls
- **Religious Compatibility**: Madhab, prayer level, and religious commitment matching
- **Family Background**: Educational, professional, and family information management
- **Photo Privacy Controls**: Advanced privacy settings for profile pictures
- **Account Security**: Two-factor authentication and secure password policies

### 🔍 Advanced Search & Discovery

- **Smart Filtering System**: Age, location, education, profession, and religious criteria
- **Privacy-Respecting Search**: Users control who can view their profiles
- **Compatibility Scoring**: AI-powered compatibility assessment based on Islamic principles
- **Geographic Search**: Location-based matching with privacy controls
- **Saved Searches**: Save and track preferred search criteria
- **Profile Bookmarking**: Save interesting profiles for later review
- **Advanced Filters**: Detailed filtering by lifestyle, family background, and preferences

### 💬 Communication & Interaction

- **Secure Marriage Requests**: Formal introduction system with parental involvement options
- **Moderated Chat System**: Real-time messaging with Islamic guidelines enforcement
- **Rate-Limited Messaging**: Prevents spam and encourages meaningful conversations
- **Auto-Translation**: Arabic/English translation support for better communication
- **File Sharing**: Secure document and image sharing with moderation
- **Voice Messages**: Audio message support with content moderation
- **Video Call Integration**: Secure video calling with family supervision options

### 🛡️ Privacy & Security

- **End-to-End Encryption**: Military-grade encryption for all sensitive communications
- **Islamic Privacy Controls**: Respects Islamic guidelines for male-female interactions
- **Parental Oversight**: Optional parental involvement and supervision features
- **Data Protection**: GDPR/CCPA compliant with Islamic privacy principles
- **Anonymous Browsing**: View profiles without revealing identity initially
- **Secure File Upload**: Encrypted file storage with AWS S3 integration
- **Activity Logging**: Comprehensive audit trails for security monitoring

### 🤖 AI-Powered Moderation

- **Arabic Content Analysis**: Advanced NLP for Arabic and English content moderation
- **Islamic Guidelines Enforcement**: Automatic detection of inappropriate content
- **Behavioral Analysis**: Pattern recognition for identifying suspicious activities
- **Automated Warnings**: Smart warning system for policy violations
- **Real-time Monitoring**: 24/7 automated content and behavior monitoring
- **Cultural Sensitivity AI**: Respects Islamic cultural norms in content analysis

### 👨‍💼 Admin & Management

- **Comprehensive Dashboard**: Real-time analytics and user management
- **Content Moderation Panel**: Review and moderate user-generated content
- **User Management System**: Account status management and user support
- **Request Monitoring**: Track and moderate marriage requests and communications
- **Analytics & Reporting**: Detailed insights into platform usage and success rates
- **Bulk Operations**: Efficient management of large user bases
- **Notification Management**: Platform-wide and targeted user notifications

### 🌍 Internationalization & Accessibility

- **Full RTL Support**: Complete right-to-left layout for Arabic language
- **Multi-language Support**: Arabic and English with seamless switching
- **WCAG 2.1 AA Compliance**: Full accessibility for users with disabilities
- **Screen Reader Optimization**: Enhanced support for visually impaired users
- **Keyboard Navigation**: Complete keyboard-only navigation support
- **High Contrast Mode**: Accessibility-focused color schemes
- **Font Size Controls**: Adjustable text sizes for better readability

### 📱 Mobile & Cross-Platform

- **Mobile-First Design**: Optimized for smartphones and tablets
- **Progressive Web App**: Installable web app with offline capabilities
- **Cross-Browser Support**: Compatible with all modern browsers
- **Responsive Design**: Seamless experience across all device sizes
- **Touch Optimization**: Enhanced touch interactions for mobile devices
- **Offline Mode**: Basic functionality available without internet connection

### 🔔 Communication & Notifications

- **Real-time Notifications**: Instant alerts for messages, requests, and matches
- **Email Integration**: Professional email notifications with Islamic greetings
- **SMS Notifications**: Critical alerts via SMS with global support
- **Push Notifications**: Browser and mobile push notification support
- **Customizable Alerts**: Users control notification frequency and types
- **Prayer Time Reminders**: Optional Islamic prayer time notifications

### 📊 Analytics & Insights

- **Success Rate Tracking**: Monitor successful marriages through the platform
- **User Engagement Analytics**: Understand user behavior and preferences
- **Performance Monitoring**: Real-time performance and uptime tracking
- **Compatibility Analytics**: AI-driven insights into successful matches
- **Usage Statistics**: Comprehensive platform usage and engagement metrics

## � Live Demo

🌐 **Experience the platform**: [https://alzawajalsaeid.vercel.app](https://alzawajalsaeid.vercel.app)

### Demo Credentials

- **Regular User**: demo@zawaj.com / Demo123!
- **Admin User**: admin@zawaj.com / Admin123!

### 📸 Screenshots

<div align="center">
  <img src="./docs/screenshots/homepage.png" alt="Homepage" width="45%" />
  <img src="./docs/screenshots/dashboard.png" alt="Dashboard" width="45%" />
</div>

<div align="center">
  <img src="./docs/screenshots/profile-builder.png" alt="Profile Builder" width="45%" />
  <img src="./docs/screenshots/chat-interface.png" alt="Chat Interface" width="45%" />
</div>

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with RTL plugin
- **Icons**: Lucide React
- **Animations**: GSAP with accessibility considerations
- **State Management**: React Context + useReducer
- **Forms**: React Hook Form + Zod validation
- **Testing**: Jest + React Testing Library + Playwright

### Backend Integration

- **API Client**: Axios with interceptors
- **Real-time**: Socket.IO for chat
- **Authentication**: JWT with secure cookies
- **File Upload**: AWS S3 integration
- **Notifications**: Email (SendGrid) + SMS (Twilio)

### Development

- **Code Quality**: ESLint + Prettier + Husky
- **Documentation**: Storybook for components
- **Performance**: Bundle analyzer + Lighthouse
- **Deployment**: Vercel optimized

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/islamic-zawaj-platform.git
   cd islamic-zawaj-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run type-check       # TypeScript type checking

# Building
npm run build           # Production build
npm run start           # Start production server
npm run analyze         # Bundle analysis

# Code Quality
npm run lint            # ESLint
npm run lint:fix        # Fix ESLint issues

# Testing
npm run test            # Unit tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
npm run test:e2e        # End-to-end tests

# Documentation
npm run storybook       # Component documentation
```

## 📁 Project Structure

```
islamic-zawaj-platform/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── register/             # Registration flow
│   │   └── login/                # Login page
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── profile/              # Profile management
│   │   ├── search/               # Search functionality
│   │   ├── requests/             # Marriage requests
│   │   ├── chat/                 # Chat system
│   │   └── settings/             # User settings
│   ├── admin/                    # Admin dashboard
│   │   ├── users/                # User management
│   │   ├── requests/             # Request moderation
│   │   ├── messages/             # Message moderation
│   │   └── settings/             # Platform settings
│   ├── api/                      # API routes
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── loading.tsx               # Loading UI
│   ├── error.tsx                 # Error UI
│   └── not-found.tsx             # 404 page
├── components/                   # Reusable UI components
│   ├── common/                   # Generic components
│   │   ├── Button/               # Button variants
│   │   ├── Input/                # Form inputs
│   │   ├── Card/                 # Card layouts
│   │   ├── Modal/                # Modal dialogs
│   │   └── Navigation/           # Navigation components
│   ├── auth/                     # Authentication components
│   │   ├── OTPInput/             # OTP verification
│   │   ├── RegistrationForm/     # Multi-step registration
│   │   └── ProfileBuilder/       # Profile creation wizard
│   ├── search/                   # Search components
│   │   ├── FilterSidebar/        # Search filters
│   │   ├── ProfileCard/          # Profile preview cards
│   │   └── SearchResults/        # Results display
│   ├── chat/                     # Chat components
│   │   ├── ChatWindow/           # Main chat interface
│   │   ├── MessageInput/         # Message composer
│   │   └── MessageBubble/        # Individual messages
│   ├── admin/                    # Admin components
│   │   ├── Dashboard/            # Admin overview
│   │   ├── UserTable/            # User management
│   │   ├── ModerationPanel/      # Content moderation
│   │   └── SettingsForm/         # Platform configuration
│   └── ui/                       # Base UI primitives
├── lib/                          # Utilities and configurations
│   ├── api/                      # API client and endpoints
│   ├── auth/                     # Authentication utilities
│   ├── validation/               # Zod schemas
│   ├── hooks/                    # Custom React hooks
│   ├── utils/                    # Helper functions
│   ├── constants/                # Application constants
│   └── types/                    # TypeScript type definitions
├── context/                      # React Context providers
│   ├── AuthContext.tsx           # Authentication state
│   ├── ThemeContext.tsx          # Theme configuration
│   └── ChatContext.tsx           # Real-time chat state
├── public/                       # Static assets
│   ├── fonts/                    # Arabic fonts
│   ├── images/                   # Images and icons
│   └── locales/                  # Translation files
├── tests/                        # Test files
│   ├── __mocks__/                # Test mocks
│   ├── components/               # Component tests
│   ├── pages/                    # Page tests
│   └── e2e/                      # End-to-end tests
├── styles/                       # Additional styles
├── docs/                         # Documentation
└── .storybook/                   # Storybook configuration
```

## 🎨 Design System

### Colors

- **Primary**: `#5d1a78` (Deep Purple) - Buttons, links, highlights
- **Secondary**: `#4CAF50` (Green) - Success states, secondary actions
- **Accent**: `#FBC02D` (Yellow) - Warnings, callouts
- **Error**: `#D32F2F` (Red) - Error states, danger actions

### Typography

- **Primary Font**: Noto Kufi Arabic (modern, clean)
- **Secondary Font**: Amiri (traditional, serif)
- **Sizes**: xs(12px), sm(14px), md(16px), lg(20px), xl(24px), 2xl(32px)

### Spacing

- **Scale**: xxs(4px), xs(8px), sm(16px), md(24px), lg(32px), xl(48px)

### Components

All components follow Islamic design principles with:

- Clean, minimalist aesthetics
- Respectful color choices
- Arabic-first typography
- RTL-optimized layouts
- Accessibility compliance

## 🔐 Security & Privacy

### Data Protection

- End-to-end encryption for sensitive data
- GDPR/privacy law compliance
- Secure file upload and storage
- Rate limiting and DDoS protection

### Content Moderation

- AI-powered message filtering
- Admin review workflow
- User reporting system
- Strike-based enforcement

### Authentication

- JWT-based authentication
- OTP verification for registration
- Session management
- Role-based access control

## 🌍 Internationalization

### Arabic Support

- Full RTL layout support
- Arabic typography optimization
- Cultural appropriate iconography
- Islamic calendar integration

### Accessibility

- WCAG 2.1 AA compliance
- Screen reader optimization
- Keyboard navigation
- High contrast support
- Reduced motion preferences

## 🧪 Testing Strategy

### Unit Testing

- Component testing with React Testing Library
- Hook testing with custom test utilities
- Utility function testing
- 80%+ code coverage target

### Integration Testing

- API integration testing
- Form workflow testing
- Authentication flow testing

### End-to-End Testing

- Critical user journey testing
- Cross-browser compatibility
- Mobile responsiveness testing
- Performance testing

## 📊 Performance

### Optimizations

- Image optimization with Next.js
- Font loading optimization
- Bundle splitting and lazy loading
- Caching strategies
- CDN integration

### Monitoring

- Real-time performance monitoring
- Error tracking with Sentry
- User analytics (privacy-compliant)
- Core Web Vitals tracking

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables

Set the following in your deployment environment:

- `NEXT_PUBLIC_API_BASE_URL`
- `DATABASE_URL`
- `JWT_SECRET`
- `AWS_S3_BUCKET_URL`
- Additional vars from `.env.local.example`

## 🤝 Contributing

### Development Guidelines

1. Follow conventional commit messages
2. Use TypeScript strictly
3. Write tests for new features
4. Follow Islamic design principles
5. Ensure RTL compatibility
6. Maintain accessibility standards

### Code Style

- ESLint + Prettier configuration
- Husky pre-commit hooks
- TypeScript strict mode
- Component composition patterns

### Pull Request Process

1. Fork the repository
2. Create feature branch
3. Write tests
4. Ensure all checks pass
5. Submit PR with detailed description

## 📚 Documentation

### Component Documentation

- Storybook: `npm run storybook`
- API Documentation: `/docs/api`
- Design System: `/docs/design-system`

### Additional Resources

- [Islamic Design Guidelines](./docs/islamic-design.md)
- [RTL Development Guide](./docs/rtl-guide.md)
- [Accessibility Checklist](./docs/accessibility.md)
- [Security Best Practices](./docs/security.md)

## 🔗 Related Projects

- [Islamic Zawaj API](https://github.com/your-org/islamic-zawaj-api)
- [Islamic Zawaj Mobile](https://github.com/your-org/islamic-zawaj-mobile)
- [Islamic Zawaj Admin](https://github.com/your-org/islamic-zawaj-admin)

## 📄 License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## 🆘 Support

### Technical Support

- Email: tech-support@zawaj-platform.com
- Discord: [Community Server](https://discord.gg/zawaj-platform)
- Documentation: [docs.zawaj-platform.com](https://docs.zawaj-platform.com)

### Islamic Guidance

- Consultation with Islamic scholars
- Cultural sensitivity reviews
- Religious compliance verification

## 👨‍💻 Author & Team

<div align="center">
  
### Lead Developer
**Your Name**  
*Full-Stack Developer & Islamic Tech Specialist*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your-email@domain.com)

_Specialized in building culturally sensitive applications for the Muslim community_

</div>

### 🤝 Contributing Team

- **Islamic Scholars**: Religious guidance and cultural sensitivity review
- **UX/UI Designers**: Islamic-inspired design and user experience
- **Security Experts**: Privacy and data protection specialists
- **Community Managers**: User support and community building

---

## 🌟 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/your-org/islamic-zawaj-platform?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-org/islamic-zawaj-platform?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/your-org/islamic-zawaj-platform?style=social)

[![GitHub issues](https://img.shields.io/github/issues/your-org/islamic-zawaj-platform)](https://github.com/your-org/islamic-zawaj-platform/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/your-org/islamic-zawaj-platform)](https://github.com/your-org/islamic-zawaj-platform/pulls)
[![Last commit](https://img.shields.io/github/last-commit/your-org/islamic-zawaj-platform)](https://github.com/your-org/islamic-zawaj-platform/commits/main)

</div>

---

## 📄 License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

**© 2024 Islamic Zawaj Platform. All rights reserved.**

---

## 🤲 Islamic Blessing

<div align="center">
  
*بسم الله الرحمن الرحيم*

**May Allah bless this project and make it a means of bringing together righteous Muslim couples in halal marriages. May it be a source of barakah and contribute to strengthening the Muslim ummah through blessed unions.**

_Ameen Ya Rabb al-Alameen_

</div>

---

<div align="center">

**Built with ❤️ and Islamic values for the Muslim community worldwide**

[🌟 **Live Demo**](https://alzawajalsaeid.vercel.app) | [📚 **Documentation**](./docs) | [🆘 **Support**](mailto:support@zawaj-platform.com)

</div>
