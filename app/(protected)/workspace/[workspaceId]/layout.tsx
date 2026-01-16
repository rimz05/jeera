import React from "react";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarContainer } from "@/components/sidebar/app-sidebar-container";
import { getUserWorkspaces } from "@/app/data/workspace/get-user-workspaces";
import { Navbar } from "@/components/navbar";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";


interface Props {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}

const WorkspaceIdLayout = async ({ children, params }: Props) => {
  const { workspaceId } = await params;

  const { data } = (await getUserWorkspaces()) as {
    success: boolean;
    data: any;
  };

  if (!data?.onboardingCompleted && (data?.workspaces?.length ?? 0) === 0) {
    redirect("/create-workspace");
  } else if (!data?.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <SidebarProvider>
      <WorkspaceShell
        sidebar={
          <AppSidebarContainer data={data} workspaceId={workspaceId} />
        }
        main={
          <div className="flex flex-col h-full">

            <div className="p-3 rounded-4xl flex items-center gap-2">
              <SidebarTrigger />
              <Navbar
                id={data?.id}
                name={data?.name as string}
                email={data?.email as string}
                image={data?.image as string}
              />
            </div>

            <div className="p-4 md:p-6 flex-1 overflow-auto">
              {children}
            </div>

          </div>
        }
      />
    </SidebarProvider>
  );
};

export default WorkspaceIdLayout;
