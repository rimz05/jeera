// components/sidebar/nav-project-list.tsx
"use client";

import { ProjectProps, WorkspaceMembersProps } from "@/utils/types";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { CreateProjectForm } from "../project/create-project-form";

interface NavProjectsProps {
  projects: ProjectProps[];
  workspaceMembers: WorkspaceMembersProps[]; // ✅ must be typed
}

export const NavProjects = ({ projects, workspaceMembers }: NavProjectsProps) => {
  const { isMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex justify-between">
        <span className="text-sm font-semibold text-muted-foreground uppercase">
          Projects
        </span>

        {/* ✅ workspaceMembers finally arrive here */}
        <CreateProjectForm workspaceMembers={workspaceMembers} />
      </SidebarGroupLabel>

      <SidebarMenu>
        {projects?.map((proj) => {
          const href = `/workspace/${proj.workspaceId}/projects/${proj.id}`;
          const isActive = pathname === href;

          return (
            <SidebarMenuItem key={proj?.id}>
              <SidebarMenuButton asChild>
                <a
                  href={href}
                  onClick={() => {
                    if (isMobile) setOpenMobile(false);
                  }}
                  className={
                    isActive
                      ? "text-blue-500 font-semibold"
                      : "text-muted-foreground"
                  }
                >
                  {proj?.name}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
