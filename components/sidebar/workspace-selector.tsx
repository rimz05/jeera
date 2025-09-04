"use client";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { WorkspacesProps } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "zod";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { DropdownMenu,DropdownMenuContent,DropdownMenuSubTrigger } from "../ui/dropdown-menu";
import { WorkspaceAvatar } from "../workspace/workspace-avatar";
import { Check, ChevronsUpDown } from "lucide-react";
import { DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";


export const WorkspaceSelector = ({
    workspaces,
}: {workspaces: WorkspacesProps[]}) =>{
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspacesProps | undefined>(undefined)

    const onSelect  = (id:string) =>{
        setSelectedWorkspace(
            workspaces.find((workspace) => workspace.workspaceId === id)
        )
        router.push(`/workspace/${id}`)
    }

    useEffect(() => {
        if(workspaceId && workspaces){
            setSelectedWorkspace(workspaces.find((workspace) => workspace.workspaceId === workspaceId))
        }
    }, [workspaceId, workspaces])

    return <div>
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground text-center"
                        >
                          <WorkspaceAvatar name = {selectedWorkspace?.workspace.name as string || "W"}/>

                          <div className="font-semibold">
                            {selectedWorkspace?.workspace.name}
                          </div>
                          <ChevronsUpDown className="ml-auto"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[--radix-dropdown-menu-trigger-width]">
                        {
                            workspaces?.map(workspace =>(
                                <DropdownMenuItem
                                    key={workspace.id}
                                    onSelect={() => onSelect(workspace.workspaceId)}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors w-full text-center"
                                    >
                                    <div className="flex flex-row items-center gap-2">
                                        <WorkspaceAvatar
                                        name={workspace.workspace?.name as string}/>
                                        <p className="text-sm font-medium truncate">
                                            {workspace?.workspace.name}
                                        </p>
                                    </div>
                                    {workspace.workspaceId === workspaceId && (
                                        <Check className="ml-auto size-4 text-primary"/>
                                    )}
                                </DropdownMenuItem>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    </div>
}