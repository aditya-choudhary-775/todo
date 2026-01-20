"use client";
import { IconDescription } from "@/icons/description";
import { IconSquarePlus } from "@tabler/icons-react";
import { KeyboardEvent, RefObject } from "react";
import { motion } from "motion/react";
import { DueDate } from "@/icons/due-date";

type TodoInputProps = {
  setOpenDesc: () => void;
  setOpenDueDate: () => void;
  openDueDate: boolean;
  openDesc: boolean;
  todoTitle: RefObject<HTMLInputElement | null>;
  description: string;
  setDescription: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  onAddTodo: () => void;
};

const TodoInput = ({
  setOpenDesc,
  openDesc,
  setOpenDueDate,
  openDueDate,
  todoTitle,
  description,
  setDescription,
  dueDate,
  setDueDate,
  onAddTodo,
}: TodoInputProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onAddTodo();
    }
  };

  return (
    <motion.div className="relative flex w-full items-center gap-3 rounded-md border border-green-600 p-3">
      <input
        ref={todoTitle}
        type="text"
        placeholder="What's the task ?"
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-cyan-500 placeholder:text-green-800 focus:outline-none"
      />
      <DueDate
        checked={dueDate !== ""}
        show={!openDueDate}
        onClick={setOpenDueDate}
        className="cursor-pointer text-red-500"
      />
      <IconDescription
        checked={description !== ""}
        show={!openDesc}
        onClick={setOpenDesc}
        className="cursor-pointer text-cyan-500"
      />
      <IconSquarePlus
        onClick={onAddTodo}
        className="cursor-pointer text-green-500"
        aria-label="Add task"
      />
      {/* Hidden original inputs that preserve the values */}
      <input
        type="date"
        aria-label="due-date"
        className="hidden"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <textarea
        className="hidden"
        aria-label="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
    </motion.div>
  );
};

export default TodoInput;
