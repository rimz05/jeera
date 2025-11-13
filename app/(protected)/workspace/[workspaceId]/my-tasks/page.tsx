
import { userRequired } from "@/app/data/user/is-user-authenticated";
import React from "react";

const MyTaskPage = async () => {
  await userRequired();

  // const tasks = await getMyTasks();

  return (
    <div>
      {/* <MyTasksTable tasks={tasks as unknown as TaskProps[]} /> */}
      My Tasks Page
    </div>
  );
};

export default MyTaskPage;
