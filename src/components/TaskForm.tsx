import colors from "@/lib/colors";
import Button from "./Button";
import { mdiCheck, mdiPlusCircleOutline } from "@mdi/js";
import { useState } from "react";

interface TaskFormProps {
  onSubmit: (title: string, color: string) => void;
  title?: string;
  color?: string;
  formType: "add" | "edit";
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  title = "",
  color = "",
  formType,
}) => {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskColor, setTaskColor] = useState(color);

  const submitButton =
    formType === "add" ? (
      <Button type="submit" icon={mdiPlusCircleOutline} className="mt-4">
        Create Task
      </Button>
    ) : (
      <Button type="submit" icon={mdiCheck} className="mt-4">
        Save
      </Button>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(taskTitle, taskColor);
      }}
      className="mt-12 space-y-12"
    >
      <div>
        <label htmlFor="title" className="font-bold text-primary">
          Task
        </label>
        <input
          type="text"
          id="title"
          placeholder="Ex: Bring the milk"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border-custom-gray mt-3 w-full rounded-lg border bg-[#262626] p-4 text-white focus:border-primary focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="font-bold text-primary">Color</label>
        <div className="mt-3 flex flex-wrap gap-4">
          {(Object.keys(colors) as (keyof typeof colors)[]).map((color) => (
            <label key={color} className="relative flex items-center">
              <input
                type="radio"
                name="color"
                value={color}
                checked={taskColor === color}
                onChange={(e) => setTaskColor(e.target.value)}
                className="peer absolute h-0 w-0 opacity-0"
              />
              <div
                className={`h-8 w-8 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 peer-checked:scale-110 peer-checked:border-white peer-focus:border-white`}
                style={{ backgroundColor: colors[color] }}
              ></div>
            </label>
          ))}
        </div>
      </div>
      {submitButton}
    </form>
  );
};

export default TaskForm;
