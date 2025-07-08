/**
 * API Client with timeout handling and retry logic
 */

interface ApiOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

class ApiClient {
  private defaultTimeout = 10000; // 10 seconds
  private defaultRetries = 3;
  private defaultRetryDelay = 1000; // 1 second

  async request<T>(
    url: string,
    options: ApiOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      retryDelay = this.defaultRetryDelay,
      ...fetchOptions
    } = options;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return { data, success: true };
      } catch (error: any) {
        const isLastAttempt = attempt === retries;
        const isAbortError = error.name === 'AbortError';

        if (isLastAttempt) {
          return {
            error: isAbortError
              ? 'Request timed out. Please try again.'
              : error.message || 'An unexpected error occurred',
            success: false,
          };
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve =>
          setTimeout(resolve, retryDelay * Math.pow(2, attempt))
        );
      }
    }

    return { error: 'Maximum retries exceeded', success: false };
  }

  async get<T>(url: string, options?: ApiOptions): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  async post<T>(
    url: string,
    body?: any,
    options?: ApiOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

export const apiClient = new ApiClient();
