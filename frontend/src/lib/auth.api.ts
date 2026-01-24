import { apiFetch } from "./api";

export async function registerUser(data: {
  name: string,
  email: string,
  password: string,
}) {
  return apiFetch("/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export async function loginUser(data: {
  email: string,
  password: string,
}) {
  return apiFetch("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};