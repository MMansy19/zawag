// Mock profile API functions
// These will be replaced with actual API calls

import {
  Profile,
  MaleProfile,
  FemaleProfile,
  isMaleProfile,
  isFemaleProfile,
} from "@/lib/types";

export async function getProfile(userId: string): Promise<Profile | null> {
  // TODO: Replace with actual API call
  console.log("Getting profile for user:", userId);

  // Mock male profile data conforming to MaleProfile interface
  const mockProfile: MaleProfile = {
    id: "1",
    userId,
    name: "محمد أحمد",
    age: 28,
    gender: "male",
    country: "SA",
    city: "الرياض",
    nationality: "SA",
    maritalStatus: "single",
    education: "bachelor",
    occupation: "مهندس برمجيات",
    religiousLevel: "practicing",
    bio: "أبحث عن شريكة حياة ملتزمة وتتشارك معي نفس القيم",
    profilePicture: "/placeholder.jpg",
    preferences: {
      ageRange: { min: 22, max: 30 },
      country: "SA",
      cities: ["الرياض", "جدة"],
      religiousLevel: ["practicing", "very-religious"],
    },
    status: "approved",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    // Verification and completion
    isComplete: true,
    isApproved: true,
    isVerified: true,
    privacySettings: {
      showProfilePicture: "matches-only",
      showAge: true,
      showLocation: true,
      showOccupation: true,
      allowMessagesFrom: "matches-only",
    },

    // Common religious & family fields
    isPrayerRegular: true,
    prays: true, // Legacy compatibility
    fasts: true, // Legacy compatibility
    areParentsAlive: "both",
    parentRelationship: "excellent",
    wantsChildren: "yes",

    // Physical appearance
    height: 175,
    weight: 75,
    appearance: "attractive",
    skinColor: "medium",
    bodyType: "average",

    // Personal information
    interests: ["القراءة", "الرياضة", "التكنولوجيا"],
    marriageGoals: "تكوين أسرة مسلمة متماسكة",
    personalityDescription: "شخص هادئ ومحب للخير",
    familyPlans: "أريد 2-3 أطفال",
    relocationPlans: "مستعد للانتقال للعمل",
    marriageTimeline: "في غضون سنة",

    // Male-specific fields
    hasBeard: true,
    beard: true, // Legacy compatibility
    prayingLocation: "mosque",
    isRegularAtMosque: true,
    smokes: false,
    financialSituation: "good",
    housingLocation: "الرياض - حي النخيل",
    housingOwnership: "owned",
    housingType: "independent",
    monthlyIncome: 8000,
    providerView: "sole provider",
    householdChores: "willing",
  };

  return mockProfile;
}

export async function createProfile(
  profileData: Partial<Profile>,
): Promise<Profile> {
  // TODO: Replace with actual API call
  console.log("Creating profile:", profileData);

  const baseFields = {
    id: Math.random().toString(36).substr(2, 9),
    userId: profileData.userId || "1",
    name: profileData.name || "",
    age: profileData.age || 18,
    maritalStatus: profileData.maritalStatus || "single",
    country: profileData.country || "",
    city: profileData.city || "",
    nationality: profileData.nationality || "",
    religiousLevel: profileData.religiousLevel || "basic",
    preferences: profileData.preferences || {
      ageRange: { min: 18, max: 40 },
    },
    status: "pending" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    // Common required fields with defaults
    isPrayerRegular: profileData.isPrayerRegular || false,
    areParentsAlive: profileData.areParentsAlive || "both",
    parentRelationship: profileData.parentRelationship || "good",
    wantsChildren: profileData.wantsChildren || "yes",
    height: profileData.height || 160,
    weight: profileData.weight || 60,
    appearance: profileData.appearance || "average",
    skinColor: profileData.skinColor || "medium",
    bodyType: profileData.bodyType || "average",
    interests: profileData.interests || [],
    marriageGoals: profileData.marriageGoals || "",
    personalityDescription: profileData.personalityDescription || "",
    familyPlans: profileData.familyPlans || "",
    relocationPlans: profileData.relocationPlans || "",
    marriageTimeline: profileData.marriageTimeline || "",

    // Legacy compatibility fields
    prays: profileData.prays || profileData.isPrayerRegular || false,
    fasts: profileData.fasts || false,
    isComplete: profileData.isComplete || false,
    isApproved: profileData.isApproved || false,
    isVerified: profileData.isVerified || false,
    privacySettings: profileData.privacySettings || {
      showProfilePicture: "matches-only",
      showAge: true,
      showLocation: true,
      showOccupation: true,
      allowMessagesFrom: "matches-only",
    },
  };

  // Create gender-specific profile
  if (profileData.gender === "female") {
    const femaleData = profileData as Partial<FemaleProfile>;
    const femaleProfile: FemaleProfile = {
      ...baseFields,
      gender: "female" as const,

      // Required female-specific fields
      guardianName: femaleData.guardianName || "",
      guardianPhone: femaleData.guardianPhone || "",
      guardianRelationship: femaleData.guardianRelationship || "father",
      wearHijab: femaleData.wearHijab || false,
      wearNiqab: femaleData.wearNiqab || false,
      clothingStyle: femaleData.clothingStyle || "modest",
      prayingLocation: femaleData.prayingLocation || "home",
    };

    // Add optional fields only if they have values
    if (profileData.bio !== undefined) femaleProfile.bio = profileData.bio;
    if (profileData.profilePicture !== undefined)
      femaleProfile.profilePicture = profileData.profilePicture;
    if (profileData.education !== undefined)
      femaleProfile.education = profileData.education;
    if (profileData.occupation !== undefined)
      femaleProfile.occupation = profileData.occupation;
    if (femaleData.guardianEmail !== undefined)
      femaleProfile.guardianEmail = femaleData.guardianEmail;
    if (femaleData.guardianNotes !== undefined)
      femaleProfile.guardianNotes = femaleData.guardianNotes;
    if (femaleData.hasHijab !== undefined)
      femaleProfile.hasHijab = femaleData.hasHijab;
    if (femaleData.hijab !== undefined) femaleProfile.hijab = femaleData.hijab;
    if (femaleData.mahramAvailable !== undefined)
      femaleProfile.mahramAvailable = femaleData.mahramAvailable;
    if (femaleData.workAfterMarriage !== undefined)
      femaleProfile.workAfterMarriage = femaleData.workAfterMarriage;
    if (femaleData.childcarePreference !== undefined)
      femaleProfile.childcarePreference = femaleData.childcarePreference;

    return femaleProfile;
  } else {
    const maleData = profileData as Partial<MaleProfile>;
    const maleProfile: MaleProfile = {
      ...baseFields,
      gender: "male" as const,

      // Required male-specific fields
      hasBeard: maleData.hasBeard || false,
      prayingLocation: maleData.prayingLocation || "home",
      isRegularAtMosque: maleData.isRegularAtMosque || false,
      smokes: maleData.smokes || false,
      financialSituation: maleData.financialSituation || "average",
      housingLocation: maleData.housingLocation || "",
      housingOwnership: maleData.housingOwnership || "rented",
      housingType: maleData.housingType || "with-family",
    };

    // Add optional fields only if they have values
    if (profileData.bio !== undefined) maleProfile.bio = profileData.bio;
    if (profileData.profilePicture !== undefined)
      maleProfile.profilePicture = profileData.profilePicture;
    if (profileData.education !== undefined)
      maleProfile.education = profileData.education;
    if (profileData.occupation !== undefined)
      maleProfile.occupation = profileData.occupation;
    if (maleData.beard !== undefined) maleProfile.beard = maleData.beard;
    if (maleData.monthlyIncome !== undefined)
      maleProfile.monthlyIncome = maleData.monthlyIncome;
    if (maleData.providerView !== undefined)
      maleProfile.providerView = maleData.providerView;
    if (maleData.householdChores !== undefined)
      maleProfile.householdChores = maleData.householdChores;

    return maleProfile;
  }
}

export async function updateProfile(
  userId: string,
  profileData: Partial<Profile>,
): Promise<Profile> {
  // TODO: Replace with actual API call
  console.log("Updating profile for user:", userId, profileData);

  const existingProfile = await getProfile(userId);
  if (!existingProfile) {
    throw new Error("Profile not found");
  }

  // Update based on gender
  if (isFemaleProfile(existingProfile)) {
    const updatedProfile: FemaleProfile = {
      ...existingProfile,
      ...(profileData as Partial<FemaleProfile>),
      updatedAt: new Date().toISOString(),
    };
    return updatedProfile;
  } else {
    const updatedProfile: MaleProfile = {
      ...existingProfile,
      ...(profileData as Partial<MaleProfile>),
      updatedAt: new Date().toISOString(),
    };
    return updatedProfile;
  }
}
