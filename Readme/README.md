# Marriage Platform Phase 1 README

## 📖 Overview

This document outlines the frontend implementation for Phase 1 of the Marriage Platform, a web application designed to facilitate marriage connections with a focus on privacy, moderation, and user safety. The frontend is built using **Next.js** (App Router), **Tailwind CSS** for styling, and **TypeScript** for type safety. The platform includes features like user registration, profile building, search, marriage requests, chat, and an admin dashboard, with automated abuse detection.

This README is tailored for senior frontend developers, providing detailed instructions, component structures, API integration patterns, and best practices. It assumes familiarity with Next.js, React, and TypeScript, and focuses on delivering a maintainable, scalable, and performant frontend.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) for server-side rendering, static generation, and API routes.
- **Styling**: Tailwind CSS for utility-first styling, ensuring rapid development and consistency.
- **Language**: TypeScript for static typing and improved developer experience.
- **State Management**: React Context with `useReducer` for global state (e.g., auth, profile); `useState` for local component state.
- **API Client**: Axios for HTTP requests, with typed responses and interceptors for auth tokens.
- **Form Handling**: React Hook Form with Zod for validation, ensuring robust form management.
- **UI Components**: Custom components with Tailwind, no external UI libraries to keep bundle size minimal.
- **Routing**: Next.js App Router for dynamic and static routes, with middleware for auth protection.
- **Deployment**: Vercel recommended for seamless Next.js deployment.

## 📂 Project Structure

```plaintext
marriage-platform/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes for proxying backend requests
│   ├── auth/                     # Authentication routes (login, register, OTP)
│   ├── profile/                  # Profile builder routes
│   ├── search/                   # Search and filter routes
│   ├── requests/                 # Marriage request routes
│   ├── chat/                     # Chat system routes
│   ├── admin/                    # Admin dashboard routes
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                 # Home page
│   └── middleware.ts            # Route protection
├── components/                   # Reusable UI components
│   ├── common/                   # Buttons, Inputs, Cards, etc.
│   ├── auth/                     # OTPInput, VerifyButton, etc.
│   ├── profile/                  # ProfileSummaryCard, ImageUploader, etc.
│   ├── search/                   # FilterSidebar, ProfileCard, etc.
│   ├── chat/                     # ChatPage, MessageInput, etc.
│   ├── admin/                    # TableView, RequestsTable, etc.
├── lib/                          # Utilities and helpers
│   ├── api/                      # Axios client, API endpoints
│   ├── types/                    # TypeScript interfaces and types
│   ├── hooks/                    # Custom hooks (useAuth, useForm, etc.)
│   ├── constants/                # App constants (e.g., API base URL)
├── public/                       # Static assets
├── styles/                       # Global CSS (Tailwind imports)
├── context/                      # React Context for global state
├── tests/                        # Unit and integration tests
├── README.md                     # This file
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
```

## 🚀 Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-org/marriage-platform.git
   cd marriage-platform
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   Key dependencies:

   - `next`: ^14.0.0
   - `react`: ^18.2.0
   - `react-dom`: ^18.2.0
   - `axios`: ^1.6.0
   - `react-hook-form`: ^7.50.0
   - `zod`: ^3.22.0
   - `tailwindcss`: ^3.4.0
   - `typescript`: ^5.3.0

3. **Configure Environment Variables**

   Create a `.env.local` file in the root:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://api.marriage-platform.com
   NEXT_PUBLIC_S3_BUCKET_URL=https://s3.bucket.url
   ```

4. **Run Development Server**

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000` in your browser.

5. **Build for Production**

   ```bash
   npm run build
   npm run start
   ```

## 🔐 Registration + Profile Builder

### Overview

The registration and profile builder flow consists of 8 steps, guiding users through account creation and profile setup. The flow is implemented as a multi-step form with client-side navigation and server-side data persistence.

### Frontend Implementation

#### Components

- **OTPInput**: Custom input for OTP entry with auto-focus on digits.
- **VerifyButton**: Button to submit OTP for verification.
- **TextInput**: Reusable input with Tailwind styling and error display.
- **SelectInput**: Dropdown for country, marital status, etc.
- **Checkboxes/RadioButtons**: For religious preferences (e.g., prays, hijab).
- **ImageUploader**: Drag-and-drop or file input for profile pictures.
- **ProfileSummaryCard**: Displays preview of entered data.
- **FormWizard**: Manages multi-step navigation and state.

#### Routes

- `/auth/register`: Entry point for registration.
- `/profile/builder`: Protected route for profile steps (redirects if not authenticated).

#### Example: OTPInput Component

```tsx
// components/auth/OTPInput.tsx
import { useState, useRef, useEffect } from "react";

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d$/.test(value) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => el && (inputRefs.current[index] = el)}
          className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OTPInput;
```

#### Form Validation with React Hook Form and Zod

```tsx
// app/auth/register/page.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import OTPInput from "@/components/auth/OTPInput";
import axios from "@/lib/api/axios";

const registerSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "Email or phone is required")
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\d{10,15}$/.test(value),
      "Invalid email or phone number",
    ),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await axios.post("/auth/send-otp", data);
      // Redirect to OTP verification
    } catch (error) {
      console.error("OTP send failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email or Phone
          </label>
          <input
            {...register("emailOrPhone")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.emailOrPhone && (
            <p className="text-red-500 text-sm">
              {errors.emailOrPhone.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
```

#### Multi-Step Form Wizard

```tsx
// components/profile/FormWizard.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormWizardProps {
  steps: { component: React.ReactNode; title: string }[];
}

const FormWizard: React.FC<FormWizardProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/search");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
        <div className="flex mt-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 ${index <= currentStep ? "bg-blue-500" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
      <div>{steps[currentStep].component}</div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default FormWizard;
```

### Backend Integration

- **Step 1: Register**
  - `POST /auth/send-otp`: Sends OTP to email/phone.
  - `POST /auth/verify-otp`: Verifies OTP and creates user session.
- **Steps 2-7**: Temporarily store data in local state or session storage, then submit in Step 8.
- **Step 8: Submit**
  - `POST /profile/create`: Submits all profile data to backend.

### Notes

- Use `useAuth` hook to manage authentication state.
- Protect `/profile/builder` with middleware to ensure user is authenticated.
- Implement optimistic updates for better UX (e.g., show "Submitting..." during API calls).
- Use Tailwind’s responsive classes for mobile-friendly forms.

## 🔍 Search Flow

### Overview

The search flow allows users to filter and browse profiles based on criteria like country, age, and marital status. Profiles are displayed in a grid or list view, with limited details respecting privacy settings.

### Frontend Implementation

#### Components

- **FilterSidebar**: Collapsible sidebar with filter inputs.
- **ProfileCard**: Card displaying profile summary (name, age, country, etc.).
- **Pagination**: Component for paginated results.

#### Routes

- `/search`: Main search page with filters and results.

#### Example: FilterSidebar Component

```tsx
// components/search/FilterSidebar.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import SelectInput from "@/components/common/SelectInput";

interface FilterValues {
  country: string;
  ageRange: string;
  maritalStatus: string;
}

const FilterSidebar = () => {
  const [filters, setFilters] = useState<FilterValues>({
    country: "",
    ageRange: "",
    maritalStatus: "",
  });
  const router = useRouter();

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });
    router.push(`/search?${query.toString()}`);
  };

  return (
    <div className="w-64 bg-gray-100 p-4">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <SelectInput
        label="Country"
        options={[
          { value: "", label: "Any" },
          { value: "US", label: "United States" },
        ]}
        value={filters.country}
        onChange={(value) => handleFilterChange("country", value)}
        className="mb-4"
      />
      <SelectInput
        label="Age Range"
        options={[
          { value: "", label: "Any" },
          { value: "20-30", label: "20-30" },
        ]}
        value={filters.ageRange}
        onChange={(value) => handleFilterChange("ageRange", value)}
        className="mb-4"
      />
      <SelectInput
        label="Marital Status"
        options={[
          { value: "", label: "Any" },
          { value: "single", label: "Single" },
        ]}
        value={filters.maritalStatus}
        onChange={(value) => handleFilterChange("maritalStatus", value)}
        className="mb-4"
      />
      <button
        onClick={applyFilters}
        className="w-full bg-blue-500 text-white py-2 rounded-md"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
```

#### Example: ProfileCard Component

```tsx
// components/search/ProfileCard.tsx
import { useRouter } from "next/navigation";

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

  const handleSendRequest = () => {
    router.push(`/requests/new?profileId=${profile.id}`);
  };

  return (
    <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{profile.name}</h3>
      <p className="text-gray-600">
        {profile.age} years old, {profile.country}
      </p>
      <p className="mt-2 text-gray-700">{profile.intro}</p>
      <button
        onClick={handleSendRequest}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Send Request
      </button>
    </div>
  );
};

export default ProfileCard;
```

### Backend Integration

- `GET /profiles/search`: Fetches paginated profiles based on query parameters.
- `POST /requests/create`: Sends a marriage request to a profile.

### Notes

- Use `useSearchParams` from `next/navigation` to read query parameters.
- Implement debouncing for filter inputs to reduce API calls.
- Respect privacy settings by conditionally rendering profile details.
- Optimize performance with `useMemo` for computed filter states.

## 💍 Marriage Request Flow

### Overview

Users can send marriage requests with an introductory message. The recipient can accept or reject, triggering notifications and chat availability if accepted.

### Frontend Implementation

#### Components

- **RequestModal**: Modal for writing and sending request message.
- **AcceptRejectButtons**: Buttons for accepting or rejecting requests.

#### Routes

- `/requests/new`: Page for sending a new request.
- `/requests`: List of sent/received requests.

#### Example: RequestModal Component

```tsx
// components/requests/RequestModal.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/api/axios";

interface RequestModalProps {
  profileId: string;
  onClose: () => void;
}

const RequestModal: React.FC<RequestModalProps> = ({ profileId, onClose }) => {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSend = async () => {
    try {
      await axios.post("/requests/create", { profileId, message });
      router.push("/requests");
      onClose();
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Send Marriage Request</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          rows={4}
          placeholder="Write a short introduction..."
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
```

### Backend Integration

- `POST /requests/create`: Creates a new request.
- `POST /requests/respond`: Accepts or rejects a request.
- `GET /requests`: Fetches user’s sent/received requests.

### Notes

- Use optimistic updates for request status changes.
- Implement real-time notifications with WebSockets or polling.
- Ensure modals are accessible (e.g., keyboard navigation, ARIA labels).

## 💬 Chat System Flow

### Overview

The chat system is available after accepted requests, with messages stored as pending until admin approval. Users are limited to 1 message/hour and 3/day, and chats auto-close after 7 days.

### Frontend Implementation

#### Components

- **ChatPage**: Main chat interface with message history and input.
- **MessageInput**: Input for sending messages with rate limiting.
- **Timer**: Displays remaining chat time.

#### Routes

- `/chat/[matchId]`: Chat page for a specific match.

#### Example: ChatPage Component

```tsx
// app/chat/[matchId]/page.tsx
import { useState, useEffect } from "react";
import axios from "@/lib/api/axios";
import MessageInput from "@/components/chat/MessageInput";

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
}

interface ChatPageProps {
  params: { matchId: string };
}

const ChatPage = ({ params }: ChatPageProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [expiryTime, setExpiryTime] = useState<string>("");

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get(`/chat/${params.matchId}`);
        setMessages(response.data.messages);
        setExpiryTime(response.data.expiryTime);
      } catch (error) {
        console.error("Fetch chat failed:", error);
      }
    };
    fetchChat();
  }, [params.matchId]);

  const handleSendMessage = async (content: string) => {
    try {
      const response = await axios.post(`/chat/${params.matchId}/send`, {
        content,
      });
      setMessages((prev) => [...prev, response.data.message]);
    } catch (error) {
      console.error("Send message failed:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="border rounded-md p-4 h-96 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <p className="text-sm text-gray-500">{msg.timestamp}</p>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <MessageInput onSend={handleSendMessage} />
      {expiryTime && (
        <p className="text-sm text-gray-600 mt-2">
          Chat expires on {new Date(expiryTime).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default ChatPage;
```

#### Example: MessageInput Component

```tsx
// components/chat/MessageInput.tsx
import { useState } from "react";

interface MessageInputProps {
  onSend: (content: string) => Promise<void>;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [content, setContent] = useState("");
  const [isLimited, setIsLimited] = useState(false);

  const handleSend = async () => {
    if (!content.trim() || isLimited) return;

    try {
      setIsLimited(true);
      await onSend(content);
      setContent("");
      setTimeout(() => setIsLimited(false), 3600000); // 1 hour limit
    } catch (error) {
      setIsLimited(false);
    }
  };

  return (
    <div className="flex mt-4">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 border border-gray-300 rounded-md p-2"
        placeholder="Type your message..."
        disabled={isLimited}
      />
      <button
        onClick={handleSend}
        disabled={isLimited || !content.trim()}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
```

### Backend Integration

- `GET /chat/:matchId`: Fetches chat messages and metadata.
- `POST /chat/:matchId/send`: Sends a new message (pending admin approval).
- `GET /chat/limits`: Checks user’s message limits.

### Notes

- Implement WebSocket for real-time message updates.
- Display rate limit warnings with a countdown timer.
- Use `useEffect` to poll for chat expiry updates.

## 🛡️ Admin Dashboard

### Overview

The admin dashboard provides tools to manage users, requests, messages, and settings. It includes tabs for Users, Requests, Flagged Messages, Chats, Reports, Settings, and Notifications.

### Frontend Implementation

#### Components

- **TableView**: Generic table for users, requests, etc.
- **RequestsTable**: Table for managing marriage requests.
- **FlaggedList**: List of flagged messages with approve/reject actions.
- **ChatOverviewPanel**: Displays active chats with filters.
- **ReportTable**: Table for user reports.
- **SettingsForm**: Form for updating global settings.
- **NotificationsBox**: Compact notification summaries.

#### Routes

- `/admin`: Dashboard with tabbed navigation.
- `/admin/[tab]`: Dynamic route for specific tabs (e.g., users, requests).

#### Example: TableView Component

```tsx
// components/admin/TableView.tsx
import { useState } from "react";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableViewProps<T> {
  data: T[];
  columns: Column<T>[];
}

const TableView = <T extends Record<string, any>>({
  data,
  columns,
}: TableViewProps<T>) => {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          {columns.map((col) => (
            <th
              key={String(col.key)}
              onClick={() => handleSort(col.key)}
              className="p-2 text-left cursor-pointer"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index} className="border-t">
            {columns.map((col) => (
              <td key={String(col.key)} className="p-2">
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
```

### Backend Integration

- `GET /admin/users`: Fetches user list.
- `POST /admin/users/:id/suspend`: Suspends a user.
- `GET /admin/requests`: Fetches marriage requests.
- `POST /admin/messages/approve`: Approves a flagged message.
- `GET /admin/chats`: Fetches active chats.
- `POST /admin/settings`: Updates global settings.

### Notes

- Use Next.js middleware to restrict `/admin` to admin roles.
- Implement lazy loading for large tables with `useInfiniteQuery`.
- Ensure tables are accessible with proper ARIA roles.

## 💬 Auto-Detection of Abuse

### Overview

Messages are scanned against an abusive word list (Arabic/English) before sending. Flagged messages are sent to the admin dashboard for review, and users receive strikes for violations.

### Frontend Implementation

#### Components

- **WordListEditor**: Admin interface for managing abusive words.
- **FlagToggle**: Button to mark flagged messages as safe.

#### Integration

The message interceptor is handled server-side, but the frontend displays warnings and strike counts.

```tsx
// components/chat/MessageInput.tsx (extended)
const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [content, setContent] = useState("");
  const [isLimited, setIsLimited] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!content.trim() || isLimited) return;

    try {
      setIsLimited(true);
      const response = await onSend(content);
      if (response.data.flagged) {
        setError(
          "Message flagged for review. Please avoid inappropriate language.",
        );
      }
      setContent("");
      setTimeout(() => setIsLimited(false), 3600000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to send message");
      setIsLimited(false);
    }
  };

  return (
    <div className="flex mt-4">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 border border-gray-300 rounded-md p-2"
        placeholder="Type your message..."
        disabled={isLimited}
      />
      <button
        onClick={handleSend}
        disabled={isLimited || !content.trim()}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
      >
        Send
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};
```

### Backend Integration

- `POST /chat/:matchId/send`: Intercepts and flags messages.
- `GET /admin/flagged`: Fetches flagged messages.
- `POST /admin/flagged/resolve`: Marks message as safe or bans user.

### Notes

- Display strike count in user profile settings.
- Allow admins to export/import word lists as JSON.

## 👨 Brother Flow

### Steps

1. **Register**: Complete OTP verification.
2. **Profile**: Fill out all profile steps.
3. **Search**: Apply filters and browse sister profiles.
4. **View Profile**: See limited details based on privacy settings.
5. **Send Request**: Write intro and send request.
6. **Wait**: Monitor request status in `/requests`.
7. **Chat**: Access chat if request is accepted.
8. **Rate Limits**: Adhere to message limits.
9. **Moderation**: Messages monitored by admin.

### Frontend Notes

- Use a progress bar for profile completion.
- Highlight accepted requests with notifications.
- Disable chat input when rate limits are reached.

## 👩 Sister Flow

### Steps

1. **Register**: Complete OTP verification.
2. **Profile**: Include hijab, wali, and privacy settings.
3. **Privacy**: Set who can view profile details.
4. **Requests**: Review and accept/reject requests.
5. **Chat**: Engage in chat if request accepted.
6. **Report**: Report inappropriate behavior.
7. **Extend Chat**: Request admin to extend chat duration.

### Frontend Notes

- Provide a toggle for profile visibility.
- Use modals for request actions (accept/reject).
- Implement a report button in chat and profile views.

## 🛡️ Admin Moderation Flow

### Steps

1. **Login**: Access `/admin` with admin credentials.
2. **Users**: Search, approve, or suspend users.
3. **Requests**: Manage pending/accepted/rejected requests.
4. **Messages**: Review flagged messages.
5. **Chats**: Monitor active chats.
6. **Reports**: Resolve user-reported issues.
7. **Settings**: Update message limits and word lists.
8. **Notifications**: View summaries of actions needed.

### Frontend Notes

- Use tabs for navigation between dashboard sections.
- Implement filters for tables (e.g., by date, status).
- Provide bulk actions for approving/rejecting multiple items.

## 📚 Best Practices

1. **Type Safety**: Define interfaces for all API responses and props.
2. **Performance**: Use `React.memo` for static components and `useCallback` for event handlers.
3. **Accessibility**: Ensure ARIA labels, keyboard navigation, and sufficient color contrast.
4. **Error Handling**: Display user-friendly error messages and log errors to console.
5. **Testing**: Write unit tests for components and hooks using Jest and React Testing Library.
6. **Code Splitting**: Leverage Next.js dynamic imports for heavy components.
7. **SEO**: Use Next.js `metadata` for page titles and descriptions.
8. **Responsive Design**: Use Tailwind’s responsive classes (e.g., `sm:`, `md:`).
9. **Security**: Sanitize user inputs and use HTTPS for API calls.
10. **Documentation**: Maintain JSDoc comments for complex functions and components.

## 🧪 Testing

### Setup

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Example Test

```tsx
// components/auth/OTPInput.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import OTPInput from "@/components/auth/OTPInput";

describe("OTPInput", () => {
  it("renders correct number of inputs", () => {
    render(<OTPInput length={4} onComplete={jest.fn()} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(4);
  });

  it("calls onComplete with correct OTP", () => {
    const onComplete = jest.fn();
    render(<OTPInput length={4} onComplete={onComplete} />);
    const inputs = screen.getAllByRole("textbox");

    fireEvent.change(inputs[0], { target: { value: "1" } });
    fireEvent.change(inputs[1], { target: { value: "2" } });
    fireEvent.change(inputs[2], { target: { value: "3" } });
    fireEvent.change(inputs[3], { target: { value: "4" } });

    expect(onComplete).toHaveBeenCalledWith("1234");
  });
});
```

### Run Tests

```bash
npm run test
```

## 🚧 Future Improvements

- Implement real-time notifications with WebSockets.
- Add internationalization (i18n) for Arabic and other languages.
- Optimize image uploads with client-side resizing.
- Introduce user onboarding with tooltips or a guided tour.
- Enhance search with fuzzy matching and advanced filters.

## 📜 License

This project is proprietary and intended for internal use by the Marriage Platform team. Unauthorized distribution or use is prohibited.

## 📞 Contact

For questions or support, contact the frontend lead at [frontend@marriage-platform.com](mailto:frontend@marriage-platform.com).

---

_Generated on June 12, 2025, by Grok 3 for the Marriage Platform team._
