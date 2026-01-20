import { useState, useRef, RefObject } from "react";
import { getTodayISO } from "@/utils/dateUtils";
import { Todo } from "@/context/todoContext";

type UseTodoFormReturn = {
  // Form state
  description: string;
  dueDate: string;
  openDesc: boolean;
  openDueDate: boolean;

  // Refs
  titleInputRef: RefObject<HTMLInputElement | null>;

  // Setters
  setDescription: (value: string) => void;
  setDueDate: (value: string) => void;
  setOpenDesc: (value: boolean) => void;
  setOpenDueDate: (value: boolean) => void;

  // Actions
  reset: () => void;
  createTodo: () => Todo | null;
};

export const useTodoForm = (): UseTodoFormReturn => {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [openDesc, setOpenDesc] = useState(false);
  const [openDueDate, setOpenDueDate] = useState(false);
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  const reset = () => {
    setDescription("");
    setDueDate("");
    setOpenDesc(false);
    setOpenDueDate(false);
    if (titleInputRef.current) {
      titleInputRef.current.value = "";
    }
  };

  const createTodo = (): Todo | null => {
    const title = titleInputRef.current?.value.trim() ?? "";
    if (!title) return null;

    const today = getTodayISO();
    const trimmedDescription = description.trim();

    return {
      id: Date.now(),
      title,
      description: trimmedDescription,
      completed: false,
      dueDate: dueDate || null,
      createdAt: today,
    };
  };

  return {
    description,
    dueDate,
    openDesc,
    openDueDate,
    titleInputRef,
    setDescription,
    setDueDate,
    setOpenDesc,
    setOpenDueDate,
    reset,
    createTodo,
  };
};
