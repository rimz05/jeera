import { $Enums, User } from "@/lib/generated/prisma";
import { getUserWorkspaceProjectsByWorkspaceId } from "../workspace/project/get-workspace-projects";
import { getUserById } from "@/app/data/user/get-user";
import { AppSidebar } from "./app-sidebar";
import { ProjectProps, WorkspaceMemberProps } from "@/utils/types";



export interface AppSidebarDataProps extends User{

    workspaces:{
        id: string;
        name: string;
        createdAt: Date;
        userId: string;
        workspaceId: string;
        accessLevel: $Enums.AccessLevel;
        workspace:{
            name: string;
        }
    }[]
}
export const AppSidebarContainer = async ({data, workspaceId} : {data: AppSidebarDataProps, workspaceId: string}) =>{
    const {projects, workspaceMembers} = await getUserWorkspaceProjectsByWorkspaceId(workspaceId);
    const user = await getUserById();

    return <AppSidebar
    data = {data}
    projects = {projects as unknown as ProjectProps[]}
    workspaceMembers = {workspaceMembers as unknown as WorkspaceMemberProps[]}
    user = {user as User}
    />;
} 