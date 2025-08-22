import React from 'react'
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from '@/components/ui/button';
const page = () => {
  return (
    <div>
        page
        <Button asChild>
            <LogoutLink>Log out</LogoutLink>
        </Button>
    </div>
  )
}

export default page