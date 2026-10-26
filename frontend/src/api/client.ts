/**
 * SachetSewa API Client
 * Base fetch wrapper reading backend URL from VITE_API_URL.
 */

export const API_BASE_URL: string =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:8000/api/v1";

export interface RequestOptions extends RequestInit {
  data?: unknown;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { data, headers, ...restOptions } = options;

  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const config: RequestInit = {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    credentials: "include", // Supports httpOnly cookies for authentication
  };

  if (data !== undefined) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody.detail || `Request failed with status ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}
