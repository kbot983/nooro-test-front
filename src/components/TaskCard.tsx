import { TaskProps } from "@/lib/Props";
import Icon from "@mdi/react";
import { mdiCheckCircle, mdiCircleOutline, mdiTrashCanOutline } from "@mdi/js";
import Link from "next/link";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

interface TaskCardProps {
  task: TaskProps;
  onCompleted: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onCompleted, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <li className="border-custom-gray flex items-start space-x-2 rounded-md border bg-[#262626] p-4">
      <button onClick={() => onCompleted(task.id)}>
        <Icon
          path={task.completed ? mdiCheckCircle : mdiCircleOutline}
          size={1}
          className={`${task.completed ? "text-secondary" : "text-primary"}`}
        />
      </button>
      <Link
        className={`flex-1 text-white ${task.completed ? "line-through" : ""}`}
        href={`/tasks/${task.id}?title=${task.title}&color=${task.color}`}
      >
        {task.title}
      </Link>
      <button className="group mt-1" onClick={() => setIsDeleteModalOpen(true)}>
        <Icon
          path={mdiTrashCanOutline}
          size={0.8}
          className="text-light-gray transition-colors duration-300 group-hover:text-red-500"
        />
      </button>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => onDelete(task.id)}
        task={task.title}
      />
    </li>
  );
};

export default TaskCard;
