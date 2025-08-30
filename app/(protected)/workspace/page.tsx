
import { redirect } from "next/navigation";
import React from "react";
import { getUserWorkspace } from "./get-user-workspace";

const Page = async () => {
    const {data} = await getUserWorkspace();

    // if(!data) return null;

    if(data?.onboardingComplete && data?.workspaces?.length === 0){
        redirect('/create-workspace');

    }else if(!data?.onboardingComplete){
        redirect('/onboarding');
    }else{
        redirect(`/workspace/${data?.workspaces?.[0]?.workspaceId}`)
    }

}

export default Page;