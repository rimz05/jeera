"use client";
import { File, Project, User, Task } from "@prisma/client";
import { DataTable } from "../workspace/data.table";
import { columns } from "./columns";

interface TaskProps extends Task {
  assignedTo: User;  
  project: Project;
  attachments: File[];
}

export const ProjectTable = ({ tasks }: { tasks: TaskProps[] }) => {
  return <DataTable columns={columns} data={tasks} />;
};
