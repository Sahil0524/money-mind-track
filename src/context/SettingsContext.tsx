
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface Settings {
  currency: string;
  darkMode: boolean;
  emailNotifications: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  currency: "USD",
  darkMode: false,
  emailNotifications: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  // Load settings from localStorage on mount and when user changes
  useEffect(() => {
    if (user) {
      const storedSettings = localStorage.getItem(`settings-${user.id}`);
      if (storedSettings) {
        try {
          setSettings({ ...defaultSettings, ...JSON.parse(storedSettings) });
        } catch (error) {
          console.error("Failed to parse settings", error);
        }
      }
    } else {
      // Use default settings when not logged in
      setSettings(defaultSettings);
    }
  }, [user]);

  // Update settings
  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    // Save to localStorage if user is logged in
    if (user) {
      localStorage.setItem(`settings-${user.id}`, JSON.stringify(updatedSettings));
    }
    
    // Apply dark mode setting
    if (newSettings.darkMode !== undefined) {
      document.documentElement.classList.toggle("dark", newSettings.darkMode);
    }
  };

  // Apply dark mode on mount
  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.darkMode);
  }, [settings.darkMode]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
