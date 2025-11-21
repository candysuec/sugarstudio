import { ApiError } from '../errors/apiError';
import { ErrorType } from '../errors/errorTypes';
import { serverLogger } from '../logging/logger.server'; // Use server logger for fetch operations

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
  expectedStatus?: number;
}

export async function safeFetch<T>(
  url: string,
  options: Omit<FetchOptions, 'body'> = {},
  requestBody?: Record<string, any>
): Promise<T> {
  const { params, expectedStatus = 200, headers, ...rest } = options;

  let requestUrl = new URL(url);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      requestUrl.searchParams.append(key, String(value));
    });
  }

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const fetchOptions: RequestInit = {
    ...rest,
    headers: { ...defaultHeaders, ...headers },
  };

  if (requestBody) {
    fetchOptions.body = JSON.stringify(requestBody);
  }

  const response = await fetch(requestUrl.toString(), fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    serverLogger.error(`Fetch error: ${response.status} ${response.statusText}`, { url: requestUrl.toString(), errorData });
    throw new ApiError(
      ErrorType.EXTERNAL_SERVICE_ERROR,
      errorData.message || `Request failed with status ${response.status}`,
      response.status,
      { url: requestUrl.toString(), ...errorData }
    );
  }

  if (response.status !== expectedStatus) {
    serverLogger.warn(`Fetch unexpected status: Expected ${expectedStatus}, got ${response.status}`, { url: requestUrl.toString() });
  }

  return response.json() as Promise<T>;
}
