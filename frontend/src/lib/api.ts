const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || "Something went wrong");
  }

  // DELETE endpoints often return 204 No Content
  if (res.status === 204) {
    return undefined as unknown as T;
  }

  // Some endpoints may return an empty body even with 200/201
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return undefined as unknown as T;
  }

  return res.json();
};