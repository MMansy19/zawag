"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Profile, isFemaleProfile } from "@/lib/types";
import {
  ViewerContext,
  canViewProfile,
  canSendContactRequest,
  canSendMessage,
} from "@/lib/utils/privacy-filter";
import { useAuth } from "@/providers/auth-provider";

interface ProfilePrivacyContextType {
  viewerContext: ViewerContext | null;
  canView: (profile: Profile) => boolean;
  canContact: (profile: Profile) => boolean;
  canMessage: (profile: Profile) => boolean;
  updateViewerContext: (context: Partial<ViewerContext>) => void;
}

const ProfilePrivacyContext = createContext<
  ProfilePrivacyContextType | undefined
>(undefined);

interface ProfilePrivacyProviderProps {
  children: ReactNode;
}

export function ProfilePrivacyProvider({
  children,
}: ProfilePrivacyProviderProps) {
  const { user } = useAuth();
  const [viewerContext, setViewerContext] = useState<ViewerContext | null>(
    null,
  );

  useEffect(() => {
    if (user && user.profile) {
      const profile = user.profile;

      // Create viewer context from current user
      const context: ViewerContext = {
        id: user.id,
        gender: isFemaleProfile(profile) ? "f" : "m",
        isVerified: user.isEmailVerified && user.isPhoneVerified,
        isPremium: false, // TODO: Check premium status
        isGuardianApproved: false, // TODO: Check guardian approval status
        hasMatched: false, // This will be updated per profile basis
        location: {
          country: profile.country,
          city: profile.city,
        },
      };

      setViewerContext(context);
    }
  }, [user]);

  const canView = (profile: Profile): boolean => {
    if (!viewerContext) return true; // Default to allow if no context
    return canViewProfile(profile, viewerContext);
  };

  const canContact = (profile: Profile): boolean => {
    if (!viewerContext) return true;
    return canSendContactRequest(profile, viewerContext);
  };

  const canMessage = (profile: Profile): boolean => {
    if (!viewerContext) return true;
    return canSendMessage(profile, viewerContext);
  };

  const updateViewerContext = (updates: Partial<ViewerContext>) => {
    if (viewerContext) {
      setViewerContext({ ...viewerContext, ...updates });
    }
  };

  const value: ProfilePrivacyContextType = {
    viewerContext,
    canView,
    canContact,
    canMessage,
    updateViewerContext,
  };

  return (
    <ProfilePrivacyContext.Provider value={value}>
      {children}
    </ProfilePrivacyContext.Provider>
  );
}

export function useProfilePrivacy(): ProfilePrivacyContextType {
  const context = useContext(ProfilePrivacyContext);
  if (context === undefined) {
    throw new Error(
      "useProfilePrivacy must be used within a ProfilePrivacyProvider",
    );
  }
  return context;
}

// Hook for checking privacy for a specific profile
export function useProfilePrivacyCheck(profile: Profile) {
  const { viewerContext, canView, canContact, canMessage } =
    useProfilePrivacy();
  const privacyCheck = {
    canView: canView(profile),
    canContact: canContact(profile),
    canMessage: canMessage(profile),
    isFemaleProfile: isFemaleProfile(profile),
    hasEnhancedPrivacy:
      isFemaleProfile(profile) &&
      (profile.privacySettings as any)?.requireGuardianApproval,
    privacyLevel:
      (profile.privacySettings as any)?.profileVisibility || "everyone",
  };

  return privacyCheck;
}
