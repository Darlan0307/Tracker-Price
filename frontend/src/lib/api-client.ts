export interface ApiOptions extends RequestInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  query?: Record<string, string | number | boolean>;
}

export type ResponseSuccess<T> = {
  ok: true;
  status: number;
  data: T;
};

export type ResponseError = {
  ok: false;
  status: number;
  errorMessage: string;
};

export type ApiResponse<T> = ResponseSuccess<T> | ResponseError;

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    ...(options.headers || {}),
  };

  let body = options.body;
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
    body,
  });

  if (!response.ok) {
    let errorText = "";
    try {
      const data = await response.json();
      errorText = data.errorMessage;
    } catch (error) {
      errorText = await response.text().catch(() => "Erro desconhecido");
    }

    return {
      ok: false,
      status: response.status,
      errorMessage: errorText,
    };
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return {
      ok: true,
      status: response.status,
      data: (await response.json()) as T,
    };
  }

  return {
    ok: true,
    status: response.status,
    data: response as unknown as T,
  };
}
