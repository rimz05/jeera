"use server"
import { UserDataType } from "@/components/onboarding-form"
import { userRequired } from "../data/user/is-user-authenticated"
import { userSchema } from "@/lib/schema"
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export const createUser = async (data: UserDataType) => {
    const { user } = await userRequired()

    const validData = userSchema.parse(data)

    const userData = await db.user.upsert({
        where: {
            email: user?.email as string, // 👈 unique identifier
        },
        update: {
            // fields to update if user already exists
            name: validData.name,
            about: validData.about,
            country: validData.country,
            industryType: validData.industryType,
            role: validData.role,
            image: user?.picture || "",
        },
        create: {
            id: user?.id as string,
            email: user?.email as string,
            name: validData.name,
            about: validData.about,
            country: validData.country,
            industryType: validData.industryType,
            role: validData.role,
            image: user?.picture || "",
            subscriptions: {
                create: {
                    plan: "FREE",
                    status: "ACTIVE",
                    currentPeriodEnd: new Date(),
                    cancelAtPeriodEnd: false,
                },
            },
        },
        select: {
            id: true,
            email: true,
            name: true,
            about: true,
            workspace: true,
        },
    })

    // todo: send user welcome email

    if (userData.workspace.length === 0) {
        redirect("/create-workspace")
    }

    redirect("/workspaces")
}
