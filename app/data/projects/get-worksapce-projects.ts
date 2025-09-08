import { db } from "@/lib/db";
import { userRequired } from "@/app/data/user/is-user-authenticated";
import { AccessLevel } from "@prisma/client";

export const getWorkspaceProjectsByWorkspaceId = async (workspaceId: string) => {
  try {
    const { user } = await userRequired();
    if (!workspaceId) throw new Error("workspaceId is required");

    // Check if user is a workspace member
    const isUserMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: { 
          userId: user?.id as string,
          workspaceId,
        },
      },
    });

    if (!isUserMember) throw new Error("User is not a member of this workspace");

    // Build query based on access level
    const query = isUserMember.accessLevel === AccessLevel.OWNER
      ? { workspaceId }
      : {
          projectAccess: {
            some: {
              hasAccess: true,
              workspaceMember: { userId: user?.id, workspaceId },
            },
          },
        };

    // Fetch projects and workspace members
    const [projects, workspaceMembers] = await Promise.all([
      db.project.findMany({
        where: query,
        select: { name: true, id: true, workspaceId: true, description: true },
      }),
      db.workspaceMember.findMany({
        where: { workspaceId },
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
        },
      }),
    ]);
    console.log("workspaceMembers fetched:", workspaceMembers);

    return { success: true, projects, workspaceMembers };
  } catch (error) {
     console.error("Error in getWorkspaceProjectsByWorkspaceId:", error);
    return { success: false, projects: [], workspaceMembers: [] };
  }
};
