import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


export const userRequired = async () => {
    const {isAuthenticated, getUser} = await getKindeServerSession();

    const isUserAuthenticated = await isAuthenticated();

    if(!isUserAuthenticated) redirect('/api/auth/login')
    const user = await getUser();

    if (!user) {
        redirect("/api/auth/login");
    }

    return {
        user,
        isUserAuthenticated,
    };
}
