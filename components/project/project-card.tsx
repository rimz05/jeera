import { ProjectTaskProps } from "@/utils/types";
import { DraggableProvided } from "@hello-pangea/dnd";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useProjectId } from "@/hooks/use-project-id";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ProjectAvatar } from "./project-avatar";
import { ProfileAvatar } from "../profileAvatar";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DataProps {
  ref: (element?: HTMLElement | null) => void;
  task: ProjectTaskProps;
  provided: DraggableProvided;
}

export const ProjectCard = ({ ref, provided, task }: DataProps) => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();

  return (
    <Card
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={cn(
        "p-2 mb-3 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all",
        "bg-white dark:bg-gray-900"
      )}
    >
      <Link
        href={`/workspace/${workspaceId}/projects/${projectId}/${task.id}`}
        className="group"
      >
        {/* Title + Priority */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold group-hover:text-primary transition-colors">
            {task.title}
          </h3>
          <Badge
            variant={task.priority}
            className="capitalize"
          >
            {task.priority}
          </Badge>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Footer Section */}
        <div className="flex items-center justify-between mt-4 flex-wrap gap-3 text-sm text-muted-foreground">
          {/* Project Info */}
          <div className="flex items-center gap-2">
            <ProjectAvatar name={task.project.name} className="!size-6" />
            <span>{task.project.name}</span>
          </div>

          {/* Assigned To */}
          <div className="flex items-center gap-2">
            <ProfileAvatar
              url={task.assignedTo.image}
              name={task.assignedTo.name}
              className="!size-6"
            />
            <span>{task.assignedTo.name}</span>
          </div>
        </div>
      </Link>
    </Card>
  );
};
