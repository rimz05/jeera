import { $Enums, User } from "@prisma/client";
import { getUserById } from "@/app/data/user/get-user";
import { AppSidebar } from "./app-sidebar";
import { ProjectProps, WorkspaceMembersProps } from "@/utils/types";
import { getWorkspaceProjectsByWorkspaceId } from "@/app/data/projects/get-worksapce-projects";


export interface AppSidebarDataProps extends User {
  workspaces: {
    id: string;
    name: string;
    createdAt: Date;
    userId: string;
    workspaceId: string;
    accessLevel: $Enums.AccessLevel;
    workspace: {
      name: string;
    };
  }[];
}
export const AppSidebarContainer = async ({
  data,
  workspaceId,
}: {
  data: AppSidebarDataProps;
  workspaceId: string;
}) => {
    const { projects, workspaceMembers } =
    await getWorkspaceProjectsByWorkspaceId(workspaceId);
    const user = await getUserById();

  return (
    <AppSidebar
      data={data}
      projects={projects as unknown as ProjectProps[]}
      workspaceMembers={workspaceMembers as unknown as WorkspaceMembersProps[]}
      user={user as User}
    />
  );
};
