import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProfileStore } from "../store/useProfileStore";
import { useAuthStore } from "../store/useAuthStore";
import ProfileHeader from "../components/ProfileHeader";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";

const ProfilePage = () => {
  const { username } = useParams();

  const {
    userProfile,
    isLoading,
    fetchUserProfile,
    updateProfile,
  } = useProfileStore();

  const { authUser } = useAuthStore();

useEffect(() => {
	fetchUserProfile(username);
  }, [username, fetchUserProfile]);

  if (isLoading) return <p>Loading...</p>;

  if (!userProfile) return <p>Profile not found</p>;

  
  const isOwnProfile = authUser.username === userProfile.username;
  const userData = isOwnProfile ? authUser : userProfile;


  const handleSave = (updatedData) => {
    updateProfile(updatedData);
  };

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <ProfileHeader userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
      <AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
      <ExperienceSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
      <EducationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
      <SkillsSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
    </div>
  );
};

export default ProfilePage;
