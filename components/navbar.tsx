import { Bell } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ThemeToggle } from "./theme-toggle";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { ProjectAvatar } from "./project/project-avatar";
import { Button } from "./ui/button";
import { PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

interface Props {
  id: string;
  name: string;
  email: string;
  image: string;
}

export const Navbar = ({ id, email, name, image }: Props) => {
  return (
    <nav className="flex items-center justify-between p-4 w-full">
      <div>
        <h1 className="text-2xl font-semibold">Home</h1>
        <span className="text-sm text-muted-foreground">
          Manage all your tasks at one place
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <ThemeToggle />

        <Popover>
          <PopoverTrigger asChild>
            <ProjectAvatar url = {image || undefined} name={name}/>
          </PopoverTrigger>
          <PopoverContent className="mr-5 mt-1 p-3 border-1 rounded-xl items-center ">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>

            <Separator/>
              <LogoutLink className="w-full">Sign Out</LogoutLink>
          </PopoverContent>

        </Popover>
      </div>
    </nav>
  );
};
