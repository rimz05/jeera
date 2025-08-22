import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Jeera</h1>
      <div>
        <Button>
          <RegisterLink>Get Started</RegisterLink>
        </Button>

        <Button asChild variant={"outline"}>
          <LoginLink>Sign in</LoginLink>
        </Button>

      </div>
    </div>
  );
}
