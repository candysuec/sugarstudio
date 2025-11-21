var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { ApiError } from '../errors/apiError';
import { ErrorType } from '../errors/errorTypes';
import { serverLogger } from '../logging/logger.server'; // Use server logger for fetch operations
export async function safeFetch(url, options = {}, requestBody) {
    const { params, expectedStatus = 200, headers } = options, rest = __rest(options, ["params", "expectedStatus", "headers"]);
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
    const fetchOptions = Object.assign(Object.assign({}, rest), { headers: Object.assign(Object.assign({}, defaultHeaders), headers) });
    if (requestBody) {
        fetchOptions.body = JSON.stringify(requestBody);
    }
    const response = await fetch(requestUrl.toString(), fetchOptions);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        serverLogger.error(`Fetch error: ${response.status} ${response.statusText}`, { url: requestUrl.toString(), errorData });
        throw new ApiError(ErrorType.EXTERNAL_SERVICE_ERROR, errorData.message || `Request failed with status ${response.status}`, response.status, Object.assign({ url: requestUrl.toString() }, errorData));
    }
    if (response.status !== expectedStatus) {
        serverLogger.warn(`Fetch unexpected status: Expected ${expectedStatus}, got ${response.status}`, { url: requestUrl.toString() });
    }
    return response.json();
}
