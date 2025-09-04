"use client"

import { ProjectProps, WorkspaceMemberProps } from "@/utils/types"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "../ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { CreateProjectForm } from "../project/create-project-form"

export const NavProjects = ({
  projects,
  workspaceMembers,
}: {
  projects: ProjectProps[]
  workspaceMembers: WorkspaceMemberProps[]
}) => {
  const { isMobile, setOpenMobile } = useSidebar()
  const pathname = usePathname()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex justify-between">
        <span className="text-sm font-semibold text-muted-foreground uppercase">
          Projects
        </span>
      <CreateProjectForm workspaceMembers={workspaceMembers}/>
      </SidebarGroupLabel>

      <SidebarMenu>
        {projects?.map((proj) => {
          const href = `/workspace/${proj.workspaceId}/projects/${proj.id}`

          return (
            <SidebarMenuItem key={proj.id}>
              <SidebarMenuButton>
                <Link
                  href={href}
                  className={
                    pathname === href
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-primary-foreground"
                  }
                >
                  {proj?.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
