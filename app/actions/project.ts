"use server";

import { ProjectDataType } from "@/components/project/create-project-form";
import { db } from "@/lib/db";
import { projectSchema } from "@/lib/schema";
import { userRequired } from "../data/user/is-user-authenticated";

export const createNewProject = async (data: ProjectDataType) => {
  // ✅ Ensure user is logged in
  const { user } = await userRequired();
  if (!user || !user.id) {
    throw new Error("User not authenticated.");
  }

  // ✅ Validate input
  const validatedData = projectSchema.parse(data);

  // ✅ Fetch workspace
  const workspace = await db.workspace.findUnique({
    where: { id: validatedData.workspaceId },
    include: {
      projects: { select: { id: true } },
    },
  });

  if (!workspace) {
    throw new Error("Workspace not found.");
  }

  // ✅ Fetch members of this workspace
  const workspaceMembers = await db.workspaceMember.findMany({
    where: {
      workspaceId: validatedData.workspaceId,
    },
  });

  // ✅ Check if user belongs to this workspace
  const isUserMember = workspaceMembers.some(
    (member) => member.userId === user.id
  );

  if (!isUserMember) {
    throw new Error("Unauthorized to create project in this workspace.");
  }

  // ✅ Prepare memberAccess safely
  let memberAccess = [...(validatedData.memberAccess ?? [])];
  if (memberAccess.length === 0) {
    memberAccess = [user.id];
  } else if (!memberAccess.includes(user.id)) {
    memberAccess.push(user.id);
  }

  // ✅ Create the project
  await db.project.create({
    data: {
      name: validatedData.name,
      description: validatedData.description,
      workspaceId: validatedData.workspaceId,
      projectAccess: {
        create: memberAccess.map((userId) => {
          const member = workspaceMembers.find((m) => m.userId === userId);
          if (!member) {
            throw new Error(`User ${userId} is not a member of this workspace.`);
          }
          return {
            workspaceMemberId: member.id,
            hasAccess: true,
          };
        }),
      },
      activities: {
        create: {
          type: "PROJECT_CREATED",
          description: `created project "${validatedData.name}"`,
          userId: user.id, // ✅ never undefined
        },
      },
    },
  });

  return { success: true };
};


export const postComment = async (
  workspaceId: string,
  projectId: string,
  content: string
) => {
  const { user } = await userRequired();
  if (!user || !user.id) {
    throw new Error("User not authenticated.");
  }

  const isMember = await db.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: user.id,
        workspaceId,
      },
    },
  });

  if (!isMember) {
    throw new Error("You are not a member of this workspace");
  }

  const projectAccess = await db.projectAccess.findUnique({
    where: {
      workspaceMemberId_projectId: {
        workspaceMemberId: isMember.id,
        projectId,
      },
    },
  });

  if (!projectAccess) {
    throw new Error("You do not have access to this project");
  }

  const comment = await db.comment.create({
    data: {
      content,
      projectId,
      userId: user.id,
    },
  });

  return comment;
};
