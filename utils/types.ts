import { $Enums, AccessLevel, Workspace } from "@/lib/generated/prisma";

export interface WorkspaceMemberProps extends Workspace{
    user:{
        id: string;
        name: string;
        email: string;
        image?: string;
    };
    projectAccess:{
        id: string;
        hasAccess: boolean;
        projectId: string;
    }[];
}

export interface ProjectProps{
    id: string;
    name: string;
    description?: string| null;
    workspaceId: string;
    members:{
        id: string;
        userId: string;
        workspaceId: string;
        accessLevel: AccessLevel;
        user:{
            id: string;
            name: string;
            email: string;
            image?: string;
        }
    }[];
}

export interface WorkspacesProps{
    id: string;
    createdAt: Date;
    userId: string;
    workspaceId: string;
    accessLevel: $Enums.AccessLevel;
    workspace: {
        name: string;
    }
}
