import {
  Profile,
  MaleProfile,
  FemaleProfile,
  PrivacySettings,
  isFemaleProfile,
  isMaleProfile,
} from "@/lib/types";

// Interface for the current viewing user context
export interface ViewerContext {
  id: string;
  gender: "m" | "f";
  isVerified?: boolean;
  isPremium?: boolean;
  isGuardianApproved?: boolean;
  hasMatched?: boolean;
  location?: {
    country: string;
    city: string;
  };
}

// Check if a viewer can see a profile based on privacy settings
export function canViewProfile(
  profile: Profile,
  viewer: ViewerContext,
): boolean {
  // If no privacy settings, default to everyone can see
  if (!profile.privacySettings) {
    return true;
  }

  const privacy = profile.privacySettings;

  // Check profile visibility (main gate)
  if (!checkProfileVisibility(privacy, viewer, profile)) {
    return false;
  }

  // Check if profile views are allowed
  if (!checkProfileViewPermission(privacy, viewer, profile)) {
    return false;
  }

  return true;
}

// Check the main profile visibility setting
function checkProfileVisibility(
  privacy: PrivacySettings,
  viewer: ViewerContext,
  profile: Profile,
): boolean {
  // For female profiles, use enhanced privacy controls
  if (isFemaleProfile(profile) && privacy.profileVisibility) {
    switch (privacy.profileVisibility) {
      case "everyone":
        return true;
      case "verified-only":
        return viewer.isVerified === true;
      case "premium-only":
        return viewer.isPremium === true;
      case "guardian-approved":
        return viewer.isGuardianApproved === true;
      case "matches-only":
        return viewer.hasMatched === true;
      default:
        return true;
    }
  }

  // Default behavior for all profiles
  return true;
}

// Check if viewer can view profile details
function checkProfileViewPermission(
  privacy: PrivacySettings,
  viewer: ViewerContext,
  profile: Profile,
): boolean {
  // For female profiles with enhanced privacy
  if (isFemaleProfile(profile) && privacy.allowProfileViews) {
    switch (privacy.allowProfileViews) {
      case "everyone":
        return true;
      case "verified-males":
        return viewer.gender === "m" && viewer.isVerified === true;
      case "premium-males":
        return viewer.gender === "m" && viewer.isPremium === true;
      case "guardian-approved":
        return viewer.isGuardianApproved === true;
      case "matches-only":
        return viewer.hasMatched === true;
      default:
        return true;
    }
  }

  return true;
}

// Check if viewer can send contact requests
export function canSendContactRequest(
  profile: Profile,
  viewer: ViewerContext,
): boolean {
  if (!profile.privacySettings) {
    return true;
  }

  const privacy = profile.privacySettings as any;

  // For female profiles
  if (isFemaleProfile(profile) && privacy.allowContactRequests) {
    switch (privacy.allowContactRequests) {
      case "everyone":
        return true;
      case "verified-only":
        return viewer.isVerified === true;
      case "guardian-approved":
        return viewer.isGuardianApproved === true;
      case "none":
        return false;
      default:
        return true;
    }
  }

  return true;
}

// Check if viewer can send messages
export function canSendMessage(
  profile: Profile,
  viewer: ViewerContext,
): boolean {
  if (!profile.privacySettings) {
    return true;
  }

  const privacy = profile.privacySettings;

  switch (privacy.allowMessagesFrom) {
    case "everyone":
      return true;
    case "matches-only":
      return viewer.hasMatched === true;
    case "none":
      return false;
    default:
      return true;
  }
}

// Check geographic privacy restrictions
export function checkGeographicPrivacy(
  profile: Profile,
  viewer: ViewerContext,
): boolean {
  if (!profile.privacySettings || !isFemaleProfile(profile)) {
    return true;
  }

  const privacy = profile.privacySettings as any;

  // If hiding from local users and viewer is in same city
  if (
    privacy.hideFromLocalUsers &&
    viewer.location &&
    profile.city === viewer.location.city
  ) {
    return false;
  }

  return true;
}

// Get filtered profile data based on privacy settings
export function getFilteredProfileData(
  profile: Profile,
  viewer: ViewerContext,
): Profile {
  if (!profile.privacySettings) {
    return profile;
  }

  const privacy = profile.privacySettings;
  const filtered = { ...profile };

  // Apply basic privacy filters
  if (!privacy.showAge) {
    (filtered as any).age = undefined;
  }

  if (!privacy.showLocation) {
    (filtered as any).city = undefined;
    (filtered as any).country = undefined;
  }

  if (!privacy.showOccupation) {
    (filtered as any).occupation = undefined;
  }
  // Apply enhanced privacy for female profiles
  if (isFemaleProfile(profile)) {
    const enhancedPrivacy = privacy as any;

    // Check if basic info should be shown
    if (
      enhancedPrivacy.showBasicInfo &&
      !checkBasicInfoPermission(enhancedPrivacy, viewer)
    ) {
      // Hide basic info
      (filtered as any).bio = undefined;
      (filtered as any).education = undefined;
    }

    // Check if detailed info should be shown
    if (
      enhancedPrivacy.showDetailedInfo &&
      !checkDetailedInfoPermission(enhancedPrivacy, viewer)
    ) {
      // Hide detailed info - safely check if it's a female profile
      const femaleFiltered = filtered as FemaleProfile;
      (femaleFiltered as any).guardianRelationship = undefined;
      (femaleFiltered as any).wearHijab = undefined;
      (femaleFiltered as any).wearNiqab = undefined;
      (femaleFiltered as any).prayingLocation = undefined;
    }

    // Profile picture privacy
    if (
      privacy.showProfilePicture === "none" ||
      (privacy.showProfilePicture === "matches-only" && !viewer.hasMatched)
    ) {
      (filtered as any).profilePicture = undefined;
    }
  }

  return filtered;
}

// Check basic info permission
function checkBasicInfoPermission(
  privacy: PrivacySettings,
  viewer: ViewerContext,
): boolean {
  if (!privacy.showBasicInfo) return true;

  switch (privacy.showBasicInfo) {
    case "everyone":
      return true;
    case "verified-only":
      return viewer.isVerified === true;
    case "matches-only":
      return viewer.hasMatched === true;
    default:
      return true;
  }
}

// Check detailed info permission
function checkDetailedInfoPermission(
  privacy: PrivacySettings,
  viewer: ViewerContext,
): boolean {
  if (!privacy.showDetailedInfo) return true;

  switch (privacy.showDetailedInfo) {
    case "matches-only":
      return viewer.hasMatched === true;
    case "guardian-approved":
      return viewer.isGuardianApproved === true;
    case "none":
      return false;
    default:
      return true;
  }
}

// Filter a list of profiles based on privacy settings
export function filterProfilesByPrivacy(
  profiles: Profile[],
  viewer: ViewerContext,
): Profile[] {
  return profiles
    .filter((profile) => canViewProfile(profile, viewer))
    .filter((profile) => checkGeographicPrivacy(profile, viewer))
    .map((profile) => getFilteredProfileData(profile, viewer));
}
