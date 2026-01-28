"use client";
import { loginUser, registerUser } from "@/lib/auth.api";
import { createTodo, deleteTodo, getTodos, toggleTodo } from "@/lib/todos.api";
import { getUserData } from "@/lib/user.api";
import { useRouter, usePathname } from "next/navigation";
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
  handleRegister: (data: {
    name: string,
    email: string,
    password: string,
  }) => void;
  handleLogin: (data: {
    email: string,
    password: string,
  }) => void;
  name: string,
  email: string,
};

export const TodoContext = createContext<TodoContextType>({
  todoList: [],
  addTodo: () => { },
  deleteTodoById: () => { },
  toggleTodoById: () => { },
  completedTasks: 0,
  incompleteTasks: 0,
  handleRegister: () => { },
  handleLogin: () => { },
  name: "",
  email: "",
});

const TodoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [incompleteTasks, setIncompleteTasks] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  async function handleRegister(data: {
    name: string,
    email: string,
    password: string,
  }) {
    try {
      await registerUser(data);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  async function handleLogin(data: {
    email: string,
    password: string,
  }) {
    try {
      await loginUser(data);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  async function getUser() {
    try {
      const res = await getUserData();
      const user = res.data;
      setName(user.name);
      setEmail(user.email);
    } catch (error: any) {
      setError(error.message);
    }
  };

  async function refreshTodos() {
    try {
      setLoading(true);
      setError(null);
      const response = await getTodos();
      // Defensive check: ensure data exists and has data property
      const todos = response && response.data && Array.isArray(response.data) ? response.data : [];
      setTodoList(todos);
      getStats(todos);
    } catch (err: any) {
      setError(err.message);
      // On error, ensure todoList is still an array (not undefined)
      setTodoList([]);
      getStats([]);
    } finally {
      setLoading(false);
    }
  }

  function getStats(todos: Todo[]) {
    let complete = 0, incomplete = 0;
    todos.forEach(todo => {
      if (todo.completed) {
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
    // Don't fetch todos on auth page
    if (pathname !== "/auth") {
      getUser();
      refreshTodos();
    }
  }, [pathname]);

  const value: TodoContextType = { todoList, addTodo, deleteTodoById, toggleTodoById, completedTasks, incompleteTasks, handleLogin, handleRegister, name, email };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
