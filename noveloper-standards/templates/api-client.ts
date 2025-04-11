/**
 * Standard Noveloper API Client
 * 
 * This template provides a standardized approach to API communication
 * with built-in error handling, type safety, and environment awareness.
 */

export const API_ENVIRONMENTS = {
  development: 'http://localhost:5000',
  production: 'https://api.noveloper.ai',
} as const;

/**
 * Helper to determine the API base URL based on environment
 */
export function getApiEndpoint(path: string): string {
  const isProd = import.meta.env.PROD || import.meta.env.MODE === 'production';
  const baseURL = isProd ? API_ENVIRONMENTS.production : API_ENVIRONMENTS.development;
  return `${baseURL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Standard API error structure
 */
export interface ApiError {
  message: string;
  status: number;
  errors?: Array<{ field: string; message: string }>;
}

/**
 * Standard API response structure
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
}

/**
 * API client with standardized methods
 */
export class ApiClient {
  private headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  /**
   * Set authorization token
   */
  setToken(token: string): void {
    this.headers = {
      ...this.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  /**
   * Generic fetch method with error handling
   */
  private async fetchWithErrorHandling<T>(
    url: string, 
    options: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: this.headers,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'An unexpected error occurred',
          errors: data.errors,
        };
      }
      
      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      console.error('API request failed', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network request failed',
      };
    }
  }

  /**
   * GET request
   */
  async get<T>(path: string): Promise<ApiResponse<T>> {
    return this.fetchWithErrorHandling<T>(
      getApiEndpoint(path),
      { method: 'GET' }
    );
  }

  /**
   * POST request
   */
  async post<T>(path: string, data: any): Promise<ApiResponse<T>> {
    return this.fetchWithErrorHandling<T>(
      getApiEndpoint(path),
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }

  /**
   * PUT request
   */
  async put<T>(path: string, data: any): Promise<ApiResponse<T>> {
    return this.fetchWithErrorHandling<T>(
      getApiEndpoint(path),
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );
  }

  /**
   * PATCH request
   */
  async patch<T>(path: string, data: any): Promise<ApiResponse<T>> {
    return this.fetchWithErrorHandling<T>(
      getApiEndpoint(path),
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      }
    );
  }

  /**
   * DELETE request
   */
  async delete<T>(path: string): Promise<ApiResponse<T>> {
    return this.fetchWithErrorHandling<T>(
      getApiEndpoint(path),
      { method: 'DELETE' }
    );
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();