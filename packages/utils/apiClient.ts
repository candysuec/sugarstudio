// sugarstudio/packages/utils/apiClient.ts

interface ApiCallOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, any>;
  headers?: Record<string, string>;
}

export async function callApi<T>(url: string, options?: ApiCallOptions): Promise<T> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    method: options?.method || 'GET',
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  };

  if (options?.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorData: any = { message: `API Error: ${response.statusText}` };
    try {
      errorData = await response.json();
    } catch (e) {
      // If response is not JSON, use default error
    }
    throw new Error(errorData.error || errorData.message || `API Error: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
