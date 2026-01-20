"use client";
import { createTodo, deleteTodo, getTodos, toggleTodo } from "@/lib/todos.api";
import { error } from "console";
import { number } from "motion";
import React, { createContext, useEffect, useState } from "react";

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string | null;
  createdAt: string;
};

type TodoContextType = {
  todoList: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodoById: (id: number) => void;
  toggleTodoById: (id: number) => void;
  completedTasks: number;
  incompleteTasks: number;
};

export const TodoContext = createContext<TodoContextType>({
  todoList: [],
  addTodo: () => {},
  deleteTodoById: () => {},
  toggleTodoById: () => {},
  completedTasks: 0,
  incompleteTasks: 0,
});

const TodoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [incompleteTasks, setIncompleteTasks] = useState<number>(0);

  async function refreshTodos() {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodos();
      setTodoList(data.todos);
      getStats(data.todos);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function getStats(todos: Todo[]) {
    let complete = 0, incomplete = 0;
    todos.forEach(todo => {
      if(todo.completed) {
        complete++;
      } else {
        incomplete++;
      }
    });
    setCompletedTasks(complete);
    setIncompleteTasks(incomplete);
  }

  async function addTodo(todo: Todo) {
    try {
      setLoading(true);
      setError(null);
      await createTodo({
        title: todo.title,
        description: todo.description,
        ...(todo.dueDate ? { dueDate: todo.dueDate } : {}),
      });
      await refreshTodos();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTodoById(id: number) {
    try {
      setLoading(true);
      setError(null);
      await deleteTodo(id);
      await refreshTodos();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  async function toggleTodoById(id: number) {
    try {
      setLoading(true);
      setError(null);
      await toggleTodo(id);
      await refreshTodos();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const value: TodoContextType = { todoList, addTodo, deleteTodoById, toggleTodoById, completedTasks, incompleteTasks };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
