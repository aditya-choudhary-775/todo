"use client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

// Helper to safely get token from localStorage (client-side only)
function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
}

// Helper to safely remove token from localStorage
function removeToken(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("token");
    } catch {
      // Ignore localStorage errors
    }
  }
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  try {
    const token = getToken();

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    // Handle 401 Unauthorized - redirect to auth page (but not if already on auth page)
    if (res.status === 401) {
      removeToken();
      // Only redirect if we're not already on the auth page
      if (typeof window !== "undefined" && window.location.pathname !== "/auth") {
        window.location.href = "/auth";
        return; // Exit early to prevent further processing
      }
      // If already on auth page, just throw the error
      try {
        const errorBody = await res.json();
        throw new Error(errorBody.message || "Unauthorized");
      } catch {
        throw new Error("Unauthorized");
      }
    }

    if (!res.ok) {
      let errorMessage = "Something went wrong";
      try {
        const errorBody = await res.json();
        errorMessage = errorBody.error || errorBody.message || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = res.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // DELETE endpoints often return 204 No Content
    if (res.status === 204) {
      return undefined;
    }

    // Some endpoints may return an empty body even with 200/201
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return undefined;
    }

    const json = await res.json();
    return json;
  } catch (error) {
    // Re-throw if it's already an Error, otherwise wrap it
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error or invalid response");
  }
}