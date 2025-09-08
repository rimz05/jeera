import React from "react";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarContainer, AppSidebarDataProps } from "@/components/sidebar/app-sidebar-container";
import { getUserWorkspaces } from "@/app/data/workspace/get-user-workspaces";

interface Props {
  children: React.ReactNode;
  params: { workspaceid: string }; // ✅ fixed type
}

const WorkspaceIdLayout = async ({ children, params }: Props) => {
  console.log("params received in layout:", params); 
  const { workspaceid } = params; // ✅ no need to await
  const { data } = await getUserWorkspaces() as unknown as { success: boolean; data: AppSidebarDataProps };


  if (!data?.onboardingCompleted && (data?.workspaces?.length ?? 0) === 0) {
    redirect("/create-workspace");
  } else if (!data?.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <SidebarProvider>
      <div className="w-full flex bg-background h-screen ">
        <AppSidebarContainer data={data} workspaceId={workspaceid} />
        <main className="w-full overflow-y-auto min-h-screen">
          <div className="flex items-center">
            <SidebarTrigger className="pt-3" />
            {/* ✅ Navbar can go here if needed */}
          </div>
          <div className="p-0 md:p-4 pt-2">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default WorkspaceIdLayout;
