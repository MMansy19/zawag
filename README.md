# Islamic Zawaj Platform

A comprehensive Next.js 14 platform for Islamic marriage connections, built with privacy, moderation, and cultural sensitivity at its core.

## 🌟 Features

### Core Features

- **Registration & Profile Builder**: 8-step guided profile creation with OTP verification
- **Advanced Search**: Filter-based search respecting privacy settings
- **Marriage Requests**: Secure request system with introductory messages
- **Moderated Chat**: Rate-limited, admin-moderated messaging system
- **Admin Dashboard**: Comprehensive moderation and management tools
- **Auto-Abuse Detection**: AI-powered content moderation with Arabic support

### Technical Highlights

- **Full RTL Support**: Native Arabic language support with proper RTL layout
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **Performance**: Optimized for fast loading with Next.js 14 App Router
- **Security**: End-to-end encryption, rate limiting, and privacy controls
- **Responsive**: Mobile-first design for all devices
- **Cultural Sensitivity**: Islamic values and cultural norms respected throughout

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

- **Primary**: `#1E88E5` (Blue) - Buttons, links, highlights
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

---

**May Allah bless this project and make it a means of bringing together righteous Muslim couples in halal marriages. Ameen.**

---

Built with ❤️ by the Islamic Zawaj Platform Team
© 2024 Islamic Zawaj Platform. All rights reserved.
