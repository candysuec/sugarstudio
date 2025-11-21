interface FetchOptions extends RequestInit {
    params?: Record<string, string | number | boolean>;
    expectedStatus?: number;
}
export declare function safeFetch<T>(url: string, options?: Omit<FetchOptions, 'body'>, requestBody?: Record<string, any>): Promise<T>;
export {};
