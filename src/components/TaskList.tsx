import { TaskProps } from "@/lib/Props";
import { useState } from "react";
import TaskCard from "@/components/TaskCard";
import Image from "next/image";

export interface TaskListProps {
  tasks: TaskProps[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks: initalTasks }) => {
  const [tasks, setTasks] = useState<TaskProps[]>(initalTasks);
  const handleDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCompleted = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      }),
    );
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !tasks.find((task) => task.id === id)?.completed,
      }),
    })
      .then(() => {
        console.log("completed");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <div className="mb-4 flex justify-between">
        <div>
          <span className="text-sm font-bold text-primary">Tasks</span>{" "}
          <span className="bg-custom-gray inline-block rounded-full px-2 py-1 text-xs font-bold text-white">
            {tasks.length}
          </span>
        </div>
        <div>
          <span className="text-sm font-bold text-secondary">Completed</span>{" "}
          <span className="bg-custom-gray inline-block rounded-full px-2 py-1 text-xs font-bold text-white">
            {tasks.filter((task) => task.completed).length} of {tasks.length}
          </span>
        </div>
      </div>
      {tasks.length === 0 && (
        <div className="mt-6 flex flex-col items-center justify-center rounded-lg border-t border-[#333] py-16">
          <Image src="/images/clipboard.png" width={100} height={100} alt="" />
          <p className="text-light-gray mt-8 text-center">
            You don&apos;t have any tasks registered yet.
          </p>
          <p className="text-light-gray mt-4 text-center">
            Create tasks and organize your to-do items.
          </p>
        </div>
      )}
      {tasks.length > 0 && (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onCompleted={handleCompleted}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default TaskList;
