const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      let errorMessage = "Something went wrong";
      try {
        const errorBody = await res.json();
        errorMessage = errorBody.error || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = res.statusText || errorMessage;
      }
      throw new Error(errorMessage);
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

    const json = await res.json();
    return json;
  } catch (error) {
    // Re-throw if it's already an Error, otherwise wrap it
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error or invalid response");
  }
};