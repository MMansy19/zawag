import { MarriageRequest, Profile, PrivacySettings } from "@/lib/types";

// Helper function to create complete profile objects
const createProfile = (profileData: Partial<Profile>): Profile => {
  const defaultPrivacySettings: PrivacySettings = {
    showProfilePicture: "matches-only",
    showAge: true,
    showLocation: true,
    showOccupation: true,
    allowMessagesFrom: "everyone",
  };

  return {
    id: profileData.id || "",
    userId: profileData.userId || "",
    name: profileData.name || "",
    age: profileData.age || 25,
    gender: profileData.gender || "male",
    country: profileData.country || "السعودية",
    city: profileData.city || "الرياض",
    nationality: profileData.nationality || "سعودي",
    maritalStatus: profileData.maritalStatus || "single",
    prays: profileData.prays || true,
    fasts: profileData.fasts || true,
    ...(profileData.hasHijab !== undefined && {
      hasHijab: profileData.hasHijab,
    }),
    ...(profileData.hasBeard !== undefined && {
      hasBeard: profileData.hasBeard,
    }),
    religiousLevel: profileData.religiousLevel || "practicing",
    education: profileData.education || "",
    occupation: profileData.occupation || "",
    ...(profileData.profilePicture !== undefined && {
      profilePicture: profileData.profilePicture,
    }),
    ...(profileData.bio !== undefined && { bio: profileData.bio }),
    isComplete: profileData.isComplete || true,
    isApproved: profileData.isApproved || true,
    privacySettings: profileData.privacySettings || defaultPrivacySettings,
    ...(profileData.guardianName !== undefined && {
      guardianName: profileData.guardianName,
    }),
    ...(profileData.guardianPhone !== undefined && {
      guardianPhone: profileData.guardianPhone,
    }),
    ...(profileData.guardianEmail !== undefined && {
      guardianEmail: profileData.guardianEmail,
    }),
    createdAt: profileData.createdAt || "2024-01-01T00:00:00Z",
    updatedAt: profileData.updatedAt || "2024-01-01T00:00:00Z",
  };
};

export const staticReceivedRequests: MarriageRequest[] = [
  {
    id: "req_001",
    senderId: "user_101",
    receiverId: "current_user",
    status: "pending",
    message:
      "السلام عليكم، أتشرف بالتواصل معكِ لمناقشة إمكانية الزواج. أنا شاب ملتزم أعمل في مجال الهندسة وأبحث عن شريكة حياة صالحة. أتمنى أن نتمكن من التعارف بطريقة شرعية مناسبة.",
    createdAt: "2024-12-20T10:30:00Z",
    updatedAt: "2024-12-20T10:30:00Z",
    expiresAt: "2025-01-20T10:30:00Z",
    sender: createProfile({
      id: "user_101",
      userId: "user_101",
      name: "أحمد محمد العلي",
      age: 28,
      gender: "male",
      city: "الرياض",
      country: "السعودية",
      nationality: "سعودي",
      maritalStatus: "single",
      prays: true,
      fasts: true,
      hasBeard: true,
      religiousLevel: "practicing",
      education: "بكالوريوس هندسة الحاسوب",
      occupation: "مهندس برمجيات",
      profilePicture: "/images/profiles/male-1.jpg",
      bio: "شاب ملتزم بتعاليم الدين، أحب القراءة والرياضة، أعمل في شركة تقنية كبيرة وأسعى لبناء أسرة مسلمة صالحة.",
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-02-01T10:30:00Z",
    }),
  },
  {
    id: "req_002",
    senderId: "user_102",
    receiverId: "current_user",
    status: "pending",
    message:
      "بسم الله الرحمن الرحيم، أكتب لكِ هذه الرسالة راجياً من الله أن تجدكِ في أحسن حال. أنا شاب متدين أبلغ من العمر 32 عاماً، أعمل طبيباً وأرغب في الزواج من فتاة صالحة. أعجبني ملفكِ الشخصي وأتمنى التعارف.",
    createdAt: "2024-11-28T14:15:00Z",
    updatedAt: "2024-11-28T14:15:00Z",
    expiresAt: "2024-12-28T14:15:00Z",
    sender: createProfile({
      id: "user_102",
      userId: "user_102",
      name: "خالد عبدالله النجار",
      age: 32,
      gender: "male",
      city: "جدة",
      country: "السعودية",
      nationality: "سعودي",
      maritalStatus: "single",
      prays: true,
      fasts: true,
      hasBeard: true,
      religiousLevel: "very-religious",
      education: "دكتوراه في الطب",
      occupation: "طبيب باطنة",
      profilePicture: "/images/profiles/male-2.jpg",
      bio: "طبيب مختص في الباطنة، حافظ لكتاب الله، أحب العمل التطوعي والسفر. أسعى لإيجاد شريكة حياة تشاركني نفس القيم والمبادئ.",
      createdAt: "2024-01-10T09:00:00Z",
      updatedAt: "2024-02-15T14:20:00Z",
    }),
  },
  {
    id: "req_003",
    senderId: "user_103",
    receiverId: "current_user",
    status: "accepted",
    message:
      "السلام عليكم ورحمة الله وبركاته، أسأل الله أن تكوني بخير وعافية. بعد الاطلاع على ملفكِ الشخصي، أشعر بالتوافق في الأهداف والقيم. أنا معلم لغة عربية وأحفظ القرآن الكريم، وأرغب في التقدم للزواج منكِ بإذن الله.",
    createdAt: "2024-11-25T09:45:00Z",
    updatedAt: "2024-11-26T16:20:00Z",
    expiresAt: "2024-12-25T09:45:00Z",
    sender: createProfile({
      id: "user_103",
      userId: "user_103",
      name: "عبدالرحمن صالح المطيري",
      age: 29,
      gender: "male",
      city: "الدمام",
      country: "السعودية",
      nationality: "سعودي",
      maritalStatus: "single",
      prays: true,
      fasts: true,
      hasBeard: true,
      religiousLevel: "very-religious",
      education: "ماجستير في اللغة العربية",
      occupation: "معلم لغة عربية",
      profilePicture: "/images/profiles/male-3.jpg",
      bio: "حافظ للقرآن الكريم، أعمل في التعليم وأحب نشر العلم. أقضي وقت فراغي في القراءة والدعوة إلى الله.",
      createdAt: "2024-01-20T07:30:00Z",
      updatedAt: "2024-03-01T11:45:00Z",
    }),
  },
  {
    id: "req_004",
    senderId: "user_104",
    receiverId: "current_user",
    status: "rejected",
    message:
      "أختي الكريمة، السلام عليكِ ورحمة الله وبركاته. أنا شاب أعمل في مجال التجارة، عمري 35 سنة، وأبحث عن زوجة صالحة لتكوين أسرة مباركة. أعجبني التزامكِ وأخلاقكِ من خلال ملفكِ الشخصي.",
    createdAt: "2024-11-20T11:30:00Z",
    updatedAt: "2024-11-22T13:45:00Z",
    expiresAt: "2024-12-20T11:30:00Z",
    sender: createProfile({
      id: "user_104",
      userId: "user_104",
      name: "فهد إبراهيم الشمري",
      age: 35,
      gender: "male",
      city: "الرياض",
      country: "السعودية",
      nationality: "سعودي",
      maritalStatus: "divorced",
      prays: true,
      fasts: true,
      hasBeard: true,
      religiousLevel: "practicing",
      education: "بكالوريوس إدارة أعمال",
      occupation: "تاجر",
      profilePicture: "/images/profiles/male-4.jpg",
      bio: "تاجر في مجال العقارات، أب لطفلين من زواج سابق، أسعى لإيجاد أم صالحة لأطفالي وشريكة حياة مؤمنة.",
      createdAt: "2024-02-01T06:00:00Z",
      updatedAt: "2024-03-10T15:30:00Z",
    }),
  },
  {
    id: "req_005",
    senderId: "user_105",
    receiverId: "current_user",
    status: "pending",
    message:
      "بارك الله فيكِ أختي الفاضلة، أكتب إليكِ بعد استخارة وتفكير عميق. أنا شاب ملتزم أعمل محاسباً، وأرى فيكِ الصفات التي أبحث عنها في شريكة الحياة. أتمنى أن نتعارف في إطار شرعي مناسب.",
    createdAt: "2024-11-30T16:20:00Z",
    updatedAt: "2024-11-30T16:20:00Z",
    expiresAt: "2024-12-30T16:20:00Z",
    sender: createProfile({
      id: "user_105",
      userId: "user_105",
      name: "عمر حسن القحطاني",
      age: 26,
      gender: "male",
      city: "الطائف",
      country: "السعودية",
      nationality: "سعودي",
      maritalStatus: "single",
      prays: true,
      fasts: true,
      hasBeard: true,
      religiousLevel: "practicing",
      education: "بكالوريوس محاسبة",
      occupation: "محاسب",
      profilePicture: "/images/profiles/male-5.jpg",
      bio: "محاسب في شركة كبيرة، أحب الرياضة والقراءة، ملتزم بالصلاة في المسجد وأسعى لحفظ القرآن الكريم.",
      createdAt: "2024-01-25T08:15:00Z",
      updatedAt: "2024-02-20T12:45:00Z",
    }),
  },
  {
    id: "req_006",
    senderId: "user_106",
    receiverId: "current_user",
    status: "expired",
    message:
      "السلام عليكم ورحمة الله، أختي الكريمة. أكتب إليكِ بعد اطلاع على ملفكِ الشخصي الذي أعجبني كثيراً. أنا شاب من الإمارات، أعمل في مجال الطيران، وأسعى لإيجاد شريكة حياة تقية ومحبة لله ورسوله.",
    createdAt: "2024-10-15T12:00:00Z",
    updatedAt: "2024-10-15T12:00:00Z",
    expiresAt: "2024-11-15T12:00:00Z",
    sender: createProfile({
      id: "user_106",
      userId: "user_106",
      name: "سالم راشد المرر",
      age: 33,
      gender: "male",
      city: "دبي",
      country: "الإمارات العربية المتحدة",
      nationality: "إماراتي",
      maritalStatus: "single",
      prays: true,
      fasts: true,
      hasBeard: true,
      religiousLevel: "very-religious",
      education: "بكالوريوس هندسة طيران",
      occupation: "مهندس طيران",
      profilePicture: "/images/profiles/male-6.jpg",
      bio: "مهندس طيران، أحب السفر والتعرف على ثقافات مختلفة، ملتزم بالقيم الإسلامية، أسعى لبناء أسرة مستقرة ومؤمنة.",
      createdAt: "2024-01-30T10:00:00Z",
      updatedAt: "2024-03-05T16:30:00Z",
    }),
  },
  {
    id: "req_007",
    senderId: "user_107",
    receiverId: "current_user",
    status: "pending",
    message:
      "بسم الله الرحمن الرحيم، أختي الفاضلة. بعد الاستخارة والدعاء، قررت التواصل معكِ للتقدم للزواج. أنا أستاذ جامعي من الأردن، أحمل درجة الدكتوراه في الشريعة الإسلامية، وأبحث عن زوجة صالحة تشاركني حب العلم والدين.",
    createdAt: "2024-12-18T09:15:00Z",
    updatedAt: "2024-12-18T09:15:00Z",
    expiresAt: "2025-01-18T09:15:00Z",
    sender: createProfile({
      id: "user_107",
      userId: "user_107",
      name: "د. يوسف أحمد الحنيطي",
      age: 35,
      gender: "male",
      city: "عمان",
      country: "الأردن",
      nationality: "أردني",
      maritalStatus: "single",
      prays: true,
      fasts: true,
      hasBeard: true,
      religiousLevel: "very-religious",
      education: "دكتوراه في الشريعة الإسلامية",
      occupation: "أستاذ جامعي",
      profilePicture: "/images/profiles/male-7.jpg",
      bio: "أستاذ جامعي في كلية الشريعة، حافظ للقرآن الكريم، أحب البحث العلمي والتأليف، أسعى لتربية جيل مؤمن وعالم.",
      createdAt: "2024-02-05T09:20:00Z",
      updatedAt: "2024-03-15T13:10:00Z",
    }),
  },
  {
    id: "req_008",
    senderId: "user_108",
    receiverId: "current_user",
    status: "accepted",
    message:
      "السلام عليكم أختي الكريمة، أسأل الله أن تكوني بأتم الصحة والعافية. أنا طبيب من مصر، مقيم في كندا، وأعجبني التزامكِ وأخلاقكِ من خلال ملفكِ الشخصي. أتمنى التعارف للزواج بإذن الله.",
    createdAt: "2024-12-10T16:45:00Z",
    updatedAt: "2024-12-15T14:20:00Z",
    expiresAt: "2025-01-10T16:45:00Z",
    sender: createProfile({
      id: "user_108",
      userId: "user_108",
      name: "د. محمد إبراهيم حسن",
      age: 31,
      gender: "male",
      city: "تورونتو",
      country: "كندا",
      nationality: "مصري",
      maritalStatus: "single",
      prays: true,
      fasts: true,
      hasBeard: true,
      religiousLevel: "practicing",
      education: "دكتوراه في الطب",
      occupation: "طبيب قلب",
      profilePicture: "/images/profiles/male-8.jpg",
      bio: "طبيب قلب مقيم في كندا، أحب مساعدة المرضى والعمل التطوعي، ملتزم بالصلاة والصيام، أبحث عن شريكة حياة تقية.",
      createdAt: "2024-02-10T11:30:00Z",
      updatedAt: "2024-03-20T17:00:00Z",
    }),
  },
];

export const staticSentRequests: MarriageRequest[] = [
  {
    id: "req_201",
    senderId: "current_user",
    receiverId: "user_201",
    status: "pending",
    message:
      "السلام عليكم ورحمة الله وبركاته، أختي الكريمة. بعد الاطلاع على ملفكِ الشخصي والاستخارة، أشعر بالتوافق في القيم والأهداف. أتشرف بالتقدم لكِ راجياً من الله أن يكون في هذا الأمر الخير لنا جميعاً.",
    createdAt: "2024-12-02T12:00:00Z",
    updatedAt: "2024-12-02T12:00:00Z",
    expiresAt: "2025-01-02T12:00:00Z",
    receiver: createProfile({
      id: "user_201",
      userId: "user_201",
      name: "فاطمة أحمد السلمي",
      age: 24,
      gender: "female",
      city: "مكة المكرمة",
      country: "السعودية",
      nationality: "سعودية",
      maritalStatus: "single",
      prays: true,
      fasts: true,
      hasHijab: true,
      religiousLevel: "practicing",
      education: "بكالوريوس تربية طفولة مبكرة",
      occupation: "معلمة رياض أطفال",
      profilePicture: "/images/profiles/female-1.jpg",
      bio: "معلمة أحب الأطفال والتعليم، حافظة لأجزاء من القرآن الكريم، أحب القراءة والطبخ.",
      createdAt: "2024-01-12T08:30:00Z",
      updatedAt: "2024-02-25T14:15:00Z",
    }),
  },
  {
    id: "req_202",
    senderId: "current_user",
    receiverId: "user_202",
    status: "accepted",
    message:
      "بسم الله الرحمن الرحيم، أختي الفاضلة. أكتب إليكِ بعد دعاء واستخارة، وأشعر بالراحة والطمأنينة لهذا القرار. أرى فيكِ الأخت الصالحة والزوجة المؤمنة التي أبحث عنها. أرجو أن تتقبلي طلبي بصدر رحب.",
    createdAt: "2024-11-29T10:30:00Z",
    updatedAt: "2024-12-01T15:45:00Z",
    expiresAt: "2024-12-29T10:30:00Z",
    receiver: createProfile({
      id: "user_202",
      userId: "user_202",
      name: "مريم عبدالله الغامدي",
      age: 26,
      gender: "female",
      city: "الباحة",
      country: "السعودية",
      nationality: "سعودية",
      maritalStatus: "single",
      prays: true,
      fasts: true,
      hasHijab: true,
      religiousLevel: "very-religious",
      education: "دكتوراه في طب الأسنان",
      occupation: "طبيبة أسنان",
      profilePicture: "/images/profiles/female-2.jpg",
      bio: "طبيبة أسنان، أحب مساعدة الناس، ملتزمة بتعاليم الدين، أقضي وقت فراغي في القراءة والعمل التطوعي.",
      createdAt: "2024-01-18T07:45:00Z",
      updatedAt: "2024-03-02T16:20:00Z",
    }),
  },
  {
    id: "req_203",
    senderId: "current_user",
    receiverId: "user_203",
    status: "rejected",
    message:
      "السلام عليكِ ورحمة الله وبركاته أختي الكريمة. بعد قراءة ملفكِ الشخصي والتفكير العميق، أشعر بالتوافق الكبير في الرؤى والقيم. أتقدم إليكِ بطلب التعارف للزواج، راجياً من الله أن يبارك في هذا الأمر.",
    createdAt: "2024-11-26T14:20:00Z",
    updatedAt: "2024-11-28T11:30:00Z",
    expiresAt: "2024-12-26T14:20:00Z",
    receiver: createProfile({
      id: "user_203",
      userId: "user_203",
      name: "عائشة محمد الدوسري",
      age: 28,
      gender: "female",
      city: "الخبر",
      country: "السعودية",
      nationality: "سعودية",
      maritalStatus: "single",
      prays: true,
      fasts: true,
      hasHijab: true,
      religiousLevel: "practicing",
      education: "ماجستير هندسة معمارية",
      occupation: "مهندسة معمارية",
      profilePicture: "/images/profiles/female-3.jpg",
      bio: "مهندسة معمارية، أحب التصميم والإبداع، ملتزمة بالصلاة والقرآن، أسعى للتوازن بين العمل والحياة الأسرية.",
      createdAt: "2024-01-22T09:00:00Z",
      updatedAt: "2024-03-08T12:30:00Z",
    }),
  },
  {
    id: "req_204",
    senderId: "current_user",
    receiverId: "user_204",
    status: "pending",
    message:
      "أختي الفاضلة، بارك الله فيكِ. أشعر بالراحة والطمأنينة عند قراءة ملفكِ الشخصي، وأرى التوافق في الأهداف والمبادئ. أتقدم إليكِ بطلب الزواج راجياً من الله أن يجعل في هذا الأمر الخير والبركة لنا جميعاً.",
    createdAt: "2024-12-01T18:45:00Z",
    updatedAt: "2024-12-01T18:45:00Z",
    expiresAt: "2025-01-01T18:45:00Z",
    receiver: createProfile({
      id: "user_204",
      userId: "user_204",
      name: "زينب سعد القرشي",
      age: 23,
      gender: "female",
      city: "المدينة المنورة",
      country: "السعودية",
      nationality: "سعودية",
      maritalStatus: "single",
      prays: true,
      fasts: true,
      hasHijab: true,
      religiousLevel: "very-religious",
      education: "بكالوريوس صيدلة",
      occupation: "صيدلانية",
      profilePicture: "/images/profiles/female-4.jpg",
      bio: "صيدلانية، حافظة لأجزاء كثيرة من القرآن، أحب مساعدة المرضى وأسعى لخدمة المجتمع.",
      createdAt: "2024-01-28T10:15:00Z",
      updatedAt: "2024-03-12T15:45:00Z",
    }),
  },
  {
    id: "req_205",
    senderId: "current_user",
    receiverId: "user_205",
    status: "pending",
    message:
      "بسم الله الرحمن الرحيم، السلام عليكِ ورحمة الله وبركاته. بعد الاستخارة والتفكير العميق، أكتب إليكِ هذه الرسالة راجياً من الله أن تجدكِ في أتم الصحة والعافية. أعجبني التزامكِ وأخلاقكِ، وأتمنى التعارف للزواج.",
    createdAt: "2024-11-27T08:15:00Z",
    updatedAt: "2024-11-27T08:15:00Z",
    expiresAt: "2024-12-27T08:15:00Z",
    receiver: createProfile({
      id: "user_205",
      userId: "user_205",
      name: "خديجة علي الحربي",
      age: 25,
      gender: "female",
      city: "تبوك",
      country: "السعودية",
      nationality: "سعودية",
      maritalStatus: "single",
      prays: true,
      fasts: true,
      hasHijab: true,
      religiousLevel: "practicing",
      education: "بكالوريوس محاسبة",
      occupation: "محاسبة",
      profilePicture: "/images/profiles/female-5.jpg",
      bio: "محاسبة، أحب النظام والدقة في العمل، ملتزمة بالصلاة وقراءة القرآن، أحب الطبخ والأعمال اليدوية.",
      createdAt: "2024-02-02T08:00:00Z",
      updatedAt: "2024-03-18T14:30:00Z",
    }),
  },
  {
    id: "req_206",
    senderId: "current_user",
    receiverId: "user_206",
    status: "expired",
    message:
      "السلام عليكِ ورحمة الله وبركاته، أختي الكريمة. أكتب إليكِ بعد قراءة ملفكِ الشخصي الذي أثار إعجابي. أنا شاب ملتزم وأسعى لإيجاد شريكة حياة صالحة تشاركني القيم والأهداف الإسلامية.",
    createdAt: "2024-10-20T13:30:00Z",
    updatedAt: "2024-10-20T13:30:00Z",
    expiresAt: "2024-11-20T13:30:00Z",
    receiver: createProfile({
      id: "user_206",
      userId: "user_206",
      name: "أسماء محمد الزهراني",
      age: 27,
      gender: "female",
      city: "أبها",
      country: "السعودية",
      nationality: "سعودية",
      maritalStatus: "single",
      prays: true,
      fasts: true,
      hasHijab: true,
      religiousLevel: "practicing",
      education: "ماجستير علم نفس",
      occupation: "أخصائية نفسية",
      profilePicture: "/images/profiles/female-6.jpg",
      bio: "أخصائية نفسية، أحب مساعدة الناس وحل مشاكلهم، ملتزمة بالقيم الإسلامية، أسعى لبناء أسرة مستقرة نفسياً.",
      createdAt: "2024-02-08T09:45:00Z",
      updatedAt: "2024-03-25T11:20:00Z",
    }),
  },
];

// Helper function to get random requests for testing
export const getRandomRequests = (count: number = 5) => {
  const allReceived = [...staticReceivedRequests];
  const allSent = [...staticSentRequests];

  // Shuffle arrays
  allReceived.sort(() => Math.random() - 0.5);
  allSent.sort(() => Math.random() - 0.5);

  return {
    received: allReceived.slice(0, Math.min(count, allReceived.length)),
    sent: allSent.slice(0, Math.min(count, allSent.length)),
  };
};

// Helper function to simulate API delay
export const simulateApiDelay = (
  min: number = 500,
  max: number = 1500,
): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

// Helper function to get request status in Arabic
export const getRequestStatusInArabic = (
  status: "pending" | "accepted" | "rejected" | "expired",
) => {
  const statusMap = {
    pending: "في الانتظار",
    accepted: "مقبول",
    rejected: "مرفوض",
    expired: "منتهي الصلاحية",
  };
  return statusMap[status];
};

// Helper function to get request status color
export const getRequestStatusColor = (
  status: "pending" | "accepted" | "rejected" | "expired",
) => {
  const colorMap = {
    pending: "text-yellow-600 bg-yellow-50",
    accepted: "text-green-600 bg-green-50",
    rejected: "text-red-600 bg-red-50",
    expired: "text-gray-600 bg-gray-50",
  };
  return colorMap[status];
};

// Helper function to format relative time in Arabic
export const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "منذ لحظات";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `منذ ${minutes} دقيقة`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `منذ ${hours} ساعة`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `منذ ${days} يوم`;
  } else {
    const months = Math.floor(diffInSeconds / 2592000);
    return `منذ ${months} شهر`;
  }
};

// Mock API functions for development
export const mockRequestsApi = {
  async getReceivedRequests() {
    await simulateApiDelay();
    return {
      success: true,
      data: {
        requests: staticReceivedRequests,
        total: staticReceivedRequests.length,
        page: 1,
        limit: 10,
      },
    };
  },

  async getSentRequests() {
    await simulateApiDelay();
    return {
      success: true,
      data: {
        requests: staticSentRequests,
        total: staticSentRequests.length,
        page: 1,
        limit: 10,
      },
    };
  },

  async respondToRequest({
    requestId,
    response,
  }: {
    requestId: string;
    response: "accepted" | "rejected";
  }) {
    await simulateApiDelay(300, 800);

    // Find and update the request status
    const request = staticReceivedRequests.find((req) => req.id === requestId);
    if (request) {
      request.status = response;
      request.updatedAt = new Date().toISOString();
    }

    return {
      success: true,
      message:
        response === "accepted" ? "تم قبول الطلب بنجاح!" : "تم رفض الطلب",
    };
  },

  async getRequestById(requestId: string) {
    await simulateApiDelay();

    // Look in both sent and received requests
    let request = staticReceivedRequests.find((req) => req.id === requestId);
    if (!request) {
      request = staticSentRequests.find((req) => req.id === requestId);
    }

    if (request) {
      return {
        success: true,
        data: request,
      };
    }

    return {
      success: false,
      message: "الطلب غير موجود",
    };
  },
};
