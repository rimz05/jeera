"use server"

import { CreateWorkspaceDataType } from "@/components/workspace/create-workspace-form"
import { userRequired } from "../data/user/is-user-authenticated"
import { workspaceSchema } from "@/lib/schema"
import { db } from "@/lib/db"
import { generateInviteCode } from "@/utils/generate-invite-code"
export const createNewWorkspace = async (data: CreateWorkspaceDataType) => {
    try {
        
        const {user} = await userRequired()
        const validData = workspaceSchema.parse(data)

        const res = await db.workspace.create({
            data:{
                name: validData.name,
                description: validData.description,
                ownerId: user?.id as string,
                inviteCode: generateInviteCode(),
                members:{
                    create:{
                        userId: user?.id as string,
                        accessLevel: "OWNER"}
                }
            }
        })
        
        return res;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create workspace");
    }
}