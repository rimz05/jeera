import React from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { getUserWorkspace } from "../workspace/get-user-workspace";
import { redirect } from "next/navigation";
import OnboardingForm from "@/components/onboarding-form";
import { userRequired } from "@/app/data/user/is-user-authenticated";
const page = async () => {
  const { data } = await getUserWorkspace();
  const {user} = await userRequired();

  if (data?.onboardingComplete && data?.workspaces?.length > 0) {
    redirect("/workspace");
  } else if (data?.onboardingComplete) {
    redirect("/create-workspace");
  }

  const name = `${user?.given_name || ""} ${user?.family_name || ""}`
  return (
    <div>
      <OnboardingForm
      name = {name}
      email = {user?.email as string}
      image ={user?.picture || ""}/>
    </div>
  );
};

export default page;
