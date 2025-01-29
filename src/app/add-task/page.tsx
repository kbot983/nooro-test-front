"use client";

import { useState } from "react";
import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";

export default function AddTask() {
  const router = useRouter();
  const [isError, setIsError] = useState(false);

  const handleSubmit = (title: string, color: string) => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      setIsError(true);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, color }),
    })
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
      });
  };

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <Link href="/">
        <Icon path={mdiArrowLeft} size={1} className="text-white" />
      </Link>
      <TaskForm onSubmit={handleSubmit} formType="add" />
      {isError && (
        <p className="mt-4 bg-red-500 p-2 text-white">
          An error occurred while creating the task.
        </p>
      )}
    </div>
  );
}
