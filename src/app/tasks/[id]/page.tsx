"use client";

import { useState } from "react";
import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import TaskForm from "@/components/TaskForm";

export default function EditTask() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [isError, setIsError] = useState(false);
  const searchParams = useSearchParams();

  const handleSubmit = (title: string, color: string) => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      setIsError(true);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, color }),
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("An error occurred while updating the task.");
        console.log("updated");
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
      <TaskForm
        onSubmit={handleSubmit}
        formType="edit"
        title={searchParams.get("title") || ""}
        color={searchParams.get("color") || ""}
      />
      {isError && (
        <p className="mt-4 bg-red-500 p-2 text-white">
          An error occurred while creating the task.
        </p>
      )}
    </div>
  );
}
