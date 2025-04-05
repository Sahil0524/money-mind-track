
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useSettings } from "@/context/SettingsContext";
import { ProfileForm } from "@/components/settings/ProfileForm";
import { PreferencesForm } from "@/components/settings/PreferencesForm";
import { SettingsCard } from "@/components/settings/SettingsCard";

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { settings } = useSettings();

  return (
    <div className="container py-10 space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <SettingsCard 
        title="Profile" 
        description="Manage your personal information"
      >
        <ProfileForm 
          defaultValues={{
            name: user?.name || "",
            email: user?.email || "",
          }} 
        />
      </SettingsCard>

      <SettingsCard 
        title="Preferences" 
        description="Customize your expense tracker experience"
      >
        <PreferencesForm 
          defaultValues={{
            currency: settings.currency,
            darkMode: settings.darkMode,
            emailNotifications: settings.emailNotifications,
          }} 
        />
      </SettingsCard>
    </div>
  );
};

export default SettingsPage;
