"use client";

import { IconTrash } from "@tabler/icons-react";
import { Todo } from "@/context/todoContext";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Chevron } from "@/icons/chevron";
import { CheckBox } from "@/icons/checkbox";
import { formatDate } from "@/utils/dateUtils";
import { quickTransition, deleteAnimation } from "@/constants/animations";

type TodoItemProps = {
  todo: Todo;
  onDelete?: (id: number) => void;
  onToggle?: (id: number) => void;
};

const TodoItem = ({ todo, onDelete, onToggle }: TodoItemProps) => {
  const [openDesc, setOpenDesc] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    // Wait for animation to complete before deleting
    await new Promise((resolve) => setTimeout(resolve, 200));
    onDelete?.(todo.id);
  };

  return (
    <motion.div
      layout
      animate={
        isDeleting 
          ? { x: -40, opacity: 0, height: 0, padding: 0, borderWidth: 0, marginBottom: -8 } 
          : { x: 0, opacity: 1, height: "auto", padding: "8px", borderWidth: "1px", marginBottom: 0 }
      }
      transition={deleteAnimation}
      className="todo flex w-full flex-col items-center gap-2 overflow-hidden rounded-md border border-green-600 p-2"
    >
      <div className="flex w-full items-center gap-2">
        <CheckBox
          onClick={() => onToggle?.(todo.id)}
          checked={todo.completed}
          className="cursor-pointer text-green-500"
        />
        <p
          className={`flex flex-1 items-center justify-start text-green-500 ${todo.completed ? "line-through" : ""}`}
        >
          {todo.title}
        </p>
        {todo.dueDate ? (
          <span className="mr-3 text-xs text-red-700">
            {formatDate(todo.dueDate)}
          </span>
        ) : null}
        <Chevron
          onClick={() => {
            setOpenDesc((desc) => !desc);
          }}
          openDesc={openDesc}
          className="size-5 cursor-pointer text-cyan-700"
        />
        <IconTrash
          className="cursor-pointer text-green-500"
          onClick={handleDelete}
        />
      </div>
      <AnimatePresence>
        {openDesc && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={quickTransition}
            className="w-full text-sm text-cyan-500"
          >
            {todo.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoItem;
