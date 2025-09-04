import { userRequired } from "@/app/data/user/is-user-authenticated";
import { db } from "@/lib/db";

export const getUserWorkspace = async () => {

    try {
        const {user} = await userRequired();
        if (!user) {
        return {
            success: false,
            error: true,
            message: "User not authenticated",
            status: 401,
        };
        }

        const workspaces = await db.user.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                email: true,
                onboardingCompleted: true,
                workspaces: {
                select: {
                    id: true,
                    userId: true,
                    workspaceId: true,
                    accessLevel: true,
                    createdAt: true,
                    workspace: { select: { name: true } },
                },
                },
            },
            });

            if (!workspaces) {
      return {
        success: false,
        error: true,
        message: "No workspaces found",
        status: 404,
        data: null,
      };
    }

    return {
      success: true,
      error: false,
      message: "User workspaces fetched",
      status: 200,
      data: workspaces,
    };

    } catch (error) {
        console.log(error);
        return{
            success:false, error:true, message:"Failed to fetch user workspaces",status:500
        }
    }
}