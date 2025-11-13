"use client";
import { ProjectAvatar } from "./project-avatar";

export interface Activity {
  id: string;
  type: string;
  description: string;
  createdAt: Date;
  user?: {
    name: string;
    image: string | null;
  };
}

interface ActivityFeedProps {
  activities: Activity[];
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <ProjectAvatar 
          url={activity.user?.image as string || undefined} 
          name={activity.user?.name || "Unknown User"}
          numOfChars = {2}
          size ="lg"/>

          {/* Activity details */}
          <div>
            <p className="text-sm font-medium text-foreground">
              {activity.user?.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.description}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(activity.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
