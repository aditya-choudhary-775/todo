import { apiFetch } from "./api";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(data: {
  name: string,
  email: string,
  password: string,
}) {
  const res = await fetch(`${API_BASE_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  localStorage.setItem("accessToken", json.accessToken);
  localStorage.setItem("refreshToken", json.refreshToken);

  return json;
};

export async function loginUser(data: {
  email: string,
  password: string,
}) {
  const res = await fetch(`${API_BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  localStorage.setItem("accessToken", json.accessToken);
  localStorage.setItem("refreshToken", json.refreshToken);

  return json;
};

export async function logoutUser() {
  await fetch(`${API_BASE_URL}/api/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: localStorage.getItem("refreshToken"),
    }),
  });

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  window.location.href="/auth"
};
