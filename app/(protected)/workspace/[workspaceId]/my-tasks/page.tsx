
import { getMyTasks } from "@/app/data/task/get-my-tasks";
import { userRequired } from "@/app/data/user/is-user-authenticated";
import { MyTasksTable, TaskProps } from "@/components/project/project-table";
import React from "react";

const MyTaskPage = async () => {
  await userRequired();

  const tasks = await getMyTasks();

  return (
    <div>
      <MyTasksTable tasks={tasks as unknown as TaskProps[]} />
    </div>
  );
};

export default MyTaskPage;
