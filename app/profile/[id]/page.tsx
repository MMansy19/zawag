import { PublicProfileView } from "@/components/profile/public-profile-view";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <PublicProfileView userId={params.id} />
      </div>
    </div>
  );
}
