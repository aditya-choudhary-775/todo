const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_BASE_URL}/api/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem("refreshToken"),
      }),
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error("Refresh failed");
      }
      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    }).finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const accessToken = localStorage.getItem("accessToken");

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    try {
      const newAccessToken = await refreshAccessToken();

      const retryRes = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
          ...options.headers,
        }
      });

      if (!retryRes.ok) {
        throw new Error("Retry failed");
      }

      if (retryRes.status === 204) {
        return null; // Return null for 204 No Content
      }

      return retryRes.json();
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/auth";
      throw new Error("Session Expired");
    }
  }

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Request failed");
  }

  if (res.status === 204) {
    return null; // Return null for 204 No Content
  }

  return res.json();
};
