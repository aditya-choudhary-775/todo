"use client";

import { useContext } from "react";
import { LayoutGroup } from "motion/react";

import { TodoContext } from "@/context/todoContext";
import { cn } from "@/lib/utils";
import { useTodoForm } from "@/hooks/useTodoForm";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import TodoSummary from "@/components/TodoSummary";
import UserProfileLink from "@/components/UserProfileLink";

export default function Home() {
  const { todoList, addTodo, deleteTodoById, toggleTodoById } = useContext(TodoContext);
  const form = useTodoForm();

  const handleAddTodo = () => {
    const newTodo = form.createTodo();
    if (!newTodo) return;

    addTodo(newTodo);
    form.reset();
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div
        className={cn(
          "relative h-[90%] w-full max-w-4xl rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-[1px]",
          "shadow-[inset_0px_0px_10px_theme(colors.neutral.400),0px_0px_50px_theme(colors.cyan.300)]",
        )}
      >
        <UserProfileLink />

        <LayoutGroup>
          <div className="flex h-full w-[75%] flex-col items-center justify-between gap-4">
            <TodoSummary />

            <TodoInput
              todoTitle={form.titleInputRef}
              openDueDate={form.openDueDate}
              setOpenDueDate={() => form.setOpenDueDate(true)}
              setOpenDesc={() => form.setOpenDesc(true)}
              openDesc={form.openDesc}
              description={form.description}
              setDescription={form.setDescription}
              dueDate={form.dueDate}
              setDueDate={form.setDueDate}
              onAddTodo={handleAddTodo}
            />

            <TodoList
              openDueDate={form.openDueDate}
              setOpenDueDate={form.setOpenDueDate}
              openDesc={form.openDesc}
              setOpenDesc={form.setOpenDesc}
              description={form.description}
              setDescription={form.setDescription}
              dueDate={form.dueDate}
              setDueDate={form.setDueDate}
              todos={todoList}
              onDelete={deleteTodoById}
              onToggle={toggleTodoById}
            />
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
