import { userRequired } from "@/app/data/user/is-user-authenticated";
import { db } from "@/lib/db";
import { $Enums, Prisma } from "@/lib/generated/prisma";

export const getUserWorkspaceProjectsByWorkspaceId = async (workspaceId: string) => {
  try {
    const { user } = await userRequired();
    if (!user) {
      return {
        success: false,
        error: true,
        message: "User not authenticated",
        status: 401,
      };
    }

    // check if the user is a member of the workspace
    const isUserMember = await db.workspaceMembers.findUnique({
      where: {
        userId_workspaceId: {
          userId: user.id,
          workspaceId,   
        },
      },
    });

    if (!isUserMember) {
      return {
        success: false,
        error: true,
        message: "User is not a member of this workspace",
        status: 403,
      };
    }

    // build query conditionally based on access level
    const query: Prisma.ProjectWhereInput =
      isUserMember.accessLevel === $Enums.AccessLevel.OWNER
        ? { workspaceId }
        : {
            projectAccess: {
              some: {
                hasAccess: true,
                workspaceMember: {
                  userId: user.id,
                  workspaceId,
                },
              },
            },
          };

    // fetch projects
    const [projects, workspaceMembers] = await Promise.all([
      db.project.findMany({
        where: query,
        select:{name: true, id: true, workspaceId: true, description: true}
      }),
      db.workspaceMembers.findMany({
        where: { workspaceId },
        include:{
          user:{
            select:{name: true, image: true, id: true}
          }
        }
      }),
    ]);

    return { projects, workspaceMembers };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: true,
      message: "Failed to fetch user projects",
      status: 500,
    };
  }
};
