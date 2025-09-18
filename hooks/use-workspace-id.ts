import { useParams } from "next/navigation";

export function useWorkspaceId() {
  const params = useParams<{ workspaceid: string }>();
  return params.workspaceid;
}
