
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SettingsCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
