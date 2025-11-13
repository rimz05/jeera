import React from "react";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarContainer, AppSidebarDataProps } from "@/components/sidebar/app-sidebar-container";
import { getUserWorkspaces } from "@/app/data/workspace/get-user-workspaces";
import { Navbar } from "@/components/workspace/navbar";

interface Props {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>; // ✅ fixed type
}

const WorkspaceIdLayout = async ({ children, params }: Props) => { 
  const { workspaceId } = await params; // ✅ no need to await
  const { data } = await getUserWorkspaces() as unknown as { success: boolean; data: AppSidebarDataProps };


  if (!data?.onboardingCompleted && (data?.workspaces?.length ?? 0) === 0) {
    redirect("/create-workspace");
  } else if (!data?.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <SidebarProvider>
      <div className="w-full flex bg-background h-screen ">
        <AppSidebarContainer data={data} workspaceId={workspaceId} />
        <main className="w-full overflow-y-auto min-h-screen">
          <div className="flex items-center">
            <SidebarTrigger className="pt-3" />
            <Navbar 
            id={data?.id}
            name={data?.name as string}
            email={data?.email as string}
            image={data?.image as string}/>
          </div>
          <div className="p-0 md:p-4 pt-2">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default WorkspaceIdLayout;
