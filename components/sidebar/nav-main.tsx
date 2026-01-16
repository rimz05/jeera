"use client"

import { useWorkspaceId } from "@/hooks/use-workspace-id"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "../ui/sidebar"
import { CheckSquare, LayoutDashboard, Settings, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const NavMain = () => {
  const workspaceId = useWorkspaceId()
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  const items = [
    {
      label: "Home",
      href: `/workspace/${workspaceId}`,
      icon: LayoutDashboard,
      path: "home"
    },
    {
      label: "My Tasks",
      href: `/workspace/${workspaceId}/my-tasks`,
      icon: CheckSquare,
      path: "my-tasks"
    },
    {
      label: "Members",
      href: `/workspace/${workspaceId}/members`,
      icon: Users,
      path: "members"
    },
    {
      label: "Settings",
      href: `/workspace/${workspaceId}/settings`,
      icon: Settings,
      path: "settings"
    }
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>

      <SidebarMenu className="space-y-4">
       {items.map((el) => {
  let isActive = false

  if (el.label === "Home") {
    isActive = pathname === el.href
  } else {
    isActive = pathname.startsWith(el.href)
  }

  return (
    <SidebarMenuItem key={el.label}>
      <SidebarMenuButton
        asChild
        tooltip={el.label}
        isActive={isActive}
        className={`
          px-3 py-6 text-md w-full rounded-none
          transition-all duration-200
          ${
            isActive
              ? "border-l-4"
              : "text-white/100 hover:bg-white/20 hover:border-l-2 rounded-r-md"
          }
        `}
      >
        <Link
          href={el.href}
          onClick={() => setOpenMobile(false)}
          className="flex items-center gap-2 w-full"
        >
          <el.icon className="h-4 w-4" />
          {el.label}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
})}

      </SidebarMenu>
    </SidebarGroup>
  )
}
