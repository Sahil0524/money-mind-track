
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  defaultValues: {
    name: string;
    email: string;
  };
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ defaultValues }) => {
  const { updateUserProfile } = useAuth();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateUserProfile({
        name: data.name,
        email: data.email,
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Profile</Button>
      </form>
    </Form>
  );
};
