import { apiFetch } from "./api";

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string | null;
  createdAt: string;
};

export async function getTodos() {
  return apiFetch("/todos");
};

export async function createTodo(data: {
  title: string;
  description?: string;
  dueDate?: string | null;
}) {
  return apiFetch("/todos", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export async function updateTodo(id: number, data: {
  title?: string;
  description?: string;
  dueDate?: string | null;
}) {
  return apiFetch(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export async function toggleTodo(id: number) {
  return apiFetch(`/todos/${id}/toggle`, {
    method: "PATCH",
  });
};

export async function deleteTodo(id: number) {
  return apiFetch(`/todos/${id}`, {
    method: "DELETE",
  });
};