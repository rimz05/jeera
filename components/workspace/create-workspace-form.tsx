"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"; // ✅ corrected import
import { countryList } from "@/utils/countriesList";
import { industryTypesList, roleList } from "@/utils";
import { Textarea } from "../ui/textarea";
import { createUser } from "@/app/actions/user";

interface Props {
  name: string;
  email: string;
  image?: string;
}

export type UserDataType = z.infer<typeof userSchema>;

const OnboardingForm = ({ name, email, image }: Props) => {
  const [pending, setPending] = useState(false);

  const form = useForm<UserDataType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      about: "",
      name: name || "",
      email: email,
      image: image || "",
      role: "",
      industryType: "", // ✅ consistent with field
      country: "",
    },
  });


const onSubmit = async (data: UserDataType) => {
  try {
    setPending(true);
    await createUser(data);  // ✅ just call it
  } catch (error) {
    console.error(error);
  } finally {
    setPending(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Plannfy</CardTitle>
          <CardDescription>
            Let's get started by setting up your profile.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl className="w-full">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryList.map((country) => (
                            <SelectItem key={country.code} value={country.name}>
                              <div className="flex items-center">
                                <img
                                  src={country.flag}
                                  alt={country.name}
                                  className="w-5 h-3"
                                />
                                <p className="pl-2">{country.name}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Industry */}
                <FormField
                  control={form.control}
                  name="industryType" // ✅ fixed
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industryTypesList.map((industry) => (
                              <SelectItem key={industry} value={industry}
                              className="w-full">
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roleList.map((role) => ( // ✅ fixed list
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe your role" {...field} className="resize-none">
                          
                        </Textarea>
                      </FormControl>
                    </FormItem>
                  )}
                />

              <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
