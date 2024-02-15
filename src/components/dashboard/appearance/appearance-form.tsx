import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { DataContext } from "@/utlis/userContext";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme.",
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export function AppearanceForm() {
  const [userId, setUserId] = useState<String>();
  const [userData, setUserData] = useState();
  const { data } = React.useContext(DataContext);

  const defaultValues: Partial<AppearanceFormValues> = {
    theme: data.theme || "light",
  };

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  });

  async function onSubmit(formData: AppearanceFormValues) {
    const { data: userData, error } = await supabase
      .from("users")
      .update({
        theme: formData.theme,
      })
      .eq("id", data.id);

    if (error) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "An error has occurred",
      });
    } else {
      toast({
        description: "Appearance updated !",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>Select the theme for your page</FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={defaultValues.theme}
                className="grid max-w-md grid-cols-2 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <Image
                        src="/images/dashboard/light_demo.png"
                        width={400}
                        height={400}
                        alt="dark appearance"
                        className="w-full object-cover"
                      />
                    </div>
                    <span className="block w-full p-2 text-center font-medium">
                      Light
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <Image
                        src="/images/dashboard/dark_demo.png"
                        width={400}
                        height={400}
                        alt="dark appearance"
                        className="w-full object-cover"
                      />
                    </div>
                    <span className="block w-full p-2 text-center font-medium">
                      Dark
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button variant="outline" type="submit">
          Update preferences
        </Button>
      </form>
    </Form>
  );
}
