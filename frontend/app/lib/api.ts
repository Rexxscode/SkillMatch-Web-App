import { BACKEND_ENDPOINTS } from "./api-contract";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

function setToken(token: string): void {
  localStorage.setItem("auth_token", token);
}

function removeToken(): void {
  localStorage.removeItem("auth_token");
}

interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(status: number, message: string, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

async function request<T>(
  method: string,
  url: string,
  body?: unknown,
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${url}`, config);

  if (response.status === 401) {
    removeToken();
    const isAuthAttempt =
      url === BACKEND_ENDPOINTS.auth.login || url === BACKEND_ENDPOINTS.auth.register;
    if (!isAuthAttempt && typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
    throw new ApiError(
      401,
      isAuthAttempt ? "Email atau password salah" : "Session expired. Please login again.",
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.message || "Request failed",
      data.errors,
    );
  }

  return data as T;
}

export const api = {
  get: <T>(url: string) => request<T>("GET", url),
  post: <T>(url: string, body?: unknown) => request<T>("POST", url, body),
  put: <T>(url: string, body?: unknown) => request<T>("PUT", url, body),
  patch: <T>(url: string, body?: unknown) => request<T>("PATCH", url, body),
  delete: <T>(url: string) => request<T>("DELETE", url),
};

async function requestFile<T>(
  method: "POST" | "PUT" | "PATCH",
  url: string,
  formData: FormData,
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${url}`, {
    method,
    headers,
    body: formData,
  });

  if (response.status === 401) {
    removeToken();
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
    throw new ApiError(401, "Session expired. Please login again.");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.message || "Request failed",
      data.errors,
    );
  }

  return data as T;
}

export const apiUpload = {
  post: <T>(url: string, formData: FormData) => requestFile<T>("POST", url, formData),
  put: <T>(url: string, formData: FormData) => requestFile<T>("PUT", url, formData),
  patch: <T>(url: string, formData: FormData) => requestFile<T>("PATCH", url, formData),
};

export { setToken, removeToken, getToken, ApiError };
export { BACKEND_ENDPOINTS };
