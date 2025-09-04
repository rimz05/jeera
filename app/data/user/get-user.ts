import { db } from "@/lib/db"
import { userRequired } from "./is-user-authenticated"

export const getUserById = async() =>{

    try{
        const {user} = await userRequired()

        const data = await db.user.findUnique({
            where:{
                id:user?.id as string
            }
        })
        return data;
    }catch(error){
        console.log(error);
        return{
            success: false,
            error:true,
            status:500,
            message: "Error fetching user data"
        }
    }
}