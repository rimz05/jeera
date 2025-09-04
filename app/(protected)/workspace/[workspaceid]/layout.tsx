import React from "react";
import { getUserWorkspace } from "../get-user-workspace";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarContainer } from "@/components/sidebar/app-sidebar-container";

interface Props {
  children: React.ReactNode;
  params: { workspaceId: string }; // ✅ fixed type
}

const WorkspaceIdLayout = async ({ children, params }: Props) => {
  const { workspaceId } = params; // ✅ no need to await
  const { success, data } = await getUserWorkspace();

  if (!success || !data) {
    redirect("/auth/login"); 
  }

  if (!data?.onboardingCompleted && (data?.workspaces?.length ?? 0) === 0) {
    redirect("/create-workspace");
  } else if (!data?.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <SidebarProvider>
      <div className="w-full flex bg-background h-screen ">
        <AppSidebarContainer data={data as any} workspaceId={workspaceId} />
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
