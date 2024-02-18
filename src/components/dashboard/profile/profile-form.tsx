import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import * as React from "react";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DataContext } from "@/utlis/userContext";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { CrossIcon, Crosshair, Trash } from "lucide-react";

const profileFormSchema = z.object({
  username: z.string().toLowerCase(),
  full_name: z.string(),
  bio: z.string().max(300, "The bio cannot exceed 300 characters."),
  urls: z
    .array(
      z.object({
        url: z.string().url({ message: "Please enter a valid URL." }),
        name: z.string(),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { reloadData } = React.useContext(DataContext);
  const { data } = React.useContext(DataContext);
  const { toast } = useToast();

  const defaultValues: Partial<ProfileFormValues> = {
    username: data.username,
    full_name: data.full_name,
    bio: data.bio,
    urls: data.links,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  async function onSubmit(formData: ProfileFormValues) {
    const { data: userData, error } = await supabase
      .from("users")
      .update({
        username: formData.username,
        full_name: formData.full_name,
        bio: formData.bio,
        links: formData.urls,
      })
      .eq("id", data.id);
    if (error) {
      if (error.code === "23505") {
        toast({
          variant: "destructive",
          title: "Username already used",
          description: "Please change your username",
        });
      } else {
        toast({
          variant: "destructive",
          title: "An error has occurred",
        });
      }
    } else {
      toast({
        description: "Profile updated !",
      });
      reloadData();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="username"
                  {...field}
                  defaultValue={defaultValues.username}
                />
              </FormControl>
              <FormDescription>
                You username will be used for your page&apos;s url (Ex:
                https://kuta/gallery/username)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input
                  placeholder="My Name"
                  {...field}
                  defaultValue={defaultValues.full_name}
                />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your page
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                  defaultValue={defaultValues.bio}
                />
              </FormControl>
              <FormDescription>
                Write about what you want, your passion..
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <div className="flex items-end gap-3" key={field.id}>
              <div className="w-3/5">
                <FormField
                  control={form.control}
                  name={`urls.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        URL
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Add links to your page
                      </FormDescription>
                      <FormControl>
                        <Input className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-2/5">
                <FormField
                  control={form.control}
                  name={`urls.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Name
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Add a name for the URL.
                      </FormDescription>
                      <FormControl>
                        <Input className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                variant="secondary"
                className="flex items-center justify-center"
              >
                <Trash
                  onClick={() => remove(index)}
                  className="mb-2 mt-2 w-4 h-4"
                />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ url: "", name: "" })} // Ajoutez les deux valeurs avec des chaînes vides
          >
            Add URL
          </Button>
        </div>

        <Button variant="outline" type="submit">
          Update profile
        </Button>
      </form>
    </Form>
  );
}
