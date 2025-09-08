
import { CreateWorkspaceForm } from "@/components/workspace/create-workspace-form";
import { redirect } from "next/navigation";
import { getUserWorkspace } from "../workspace/get-user-workspace";

const page = async () => {
  const { data } = await getUserWorkspace();

  if (!data?.onboardingCompleted) redirect("/onboarding");
  return (
    <div>
      <CreateWorkspaceForm />
    </div>
  );
};

export default page;
