"use client"
import { useContext } from "react";
import StatsCard from "./StatsCard";
import TodoTitleBadge from "./TodoTitleBadge";
import { TodoContext } from "@/context/todoContext";

const TodoSummary = () => {
  const {completedTasks, incompleteTasks} = useContext(TodoContext);

  return (
    <div className="flex h-[100px] w-full justify-center gap-4">
      <StatsCard value={incompleteTasks} label="Tasks Remaining" />
      <TodoTitleBadge />
      <StatsCard value={completedTasks} label="Tasks Completed" />
    </div>
  );
};

export default TodoSummary;
