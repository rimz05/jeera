import { getProjectById } from "@/app/data/projects/get-project-di";
import { ProjectTable } from "./project-table";

export const ProjectTableContainer = async({projectId}: {projectId: string}) => {

    const {tasks} = await getProjectById(projectId);
  return (
    <div>
        <ProjectTable tasks={tasks}/>
    </div>
  )
}