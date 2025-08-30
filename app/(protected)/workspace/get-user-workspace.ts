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
            where:{ id: user.id },
            include:{
                workspace:{
                    select: {
                        id: true,
                        userId: true,
                        workspaceId: true,
                        accessLevel: true,
                        createdAt: true, Workspace:{select:{name:true}}
                    }
                }
            }

        });

        return {data:workspaces}

    } catch (error) {
        console.log(error);
        return{
            success:false, error:true, message:"Failed to fetch user workspaces",status:500
        }
    }
}