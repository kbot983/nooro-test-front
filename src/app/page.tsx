"use client";

import Button from "@/components/Button";
import { mdiPlusCircleOutline } from "@mdi/js";
// import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TaskProps } from "@/lib/Props";
import TaskList from "@/components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className="mx-4">
        <div className="container mx-auto max-w-3xl">
          <Link href="/add-task">
            <Button
              className="-translate-y-1/2 transform"
              icon={mdiPlusCircleOutline}
              onClick={() => {}}
            >
              Create Task
            </Button>
          </Link>
          {isLoading && (
            <div className="mt-6 flex items-center justify-center rounded-lg border-t border-[#333] py-16">
              <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            </div>
          )}
          {isError && (
            <div className="mt-6 flex items-center justify-center rounded-lg border-t border-[#333] py-16">
              <p className="text-light-gray text-center">
                An error occurred while fetching the tasks.
              </p>
            </div>
          )}
          {!isLoading && !isError && <TaskList tasks={tasks} />}
        </div>
      </div>
    </>
  );
}
