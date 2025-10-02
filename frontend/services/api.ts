"use client"
import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL||'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get auth token
const getAuthToken = async (): Promise<string | null> => {
  try {
    return await localStorage.getItem('authToken');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAuthToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }
    return config;
  },
  (error: AxiosError) => {
    
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses for debugging
    // console.log(
    //   'Response:',
    //   response.config.method?.toUpperCase(),
    //   response.config.url,
    //   `Status: ${response.status}`,
    //   response.data ? `Data: ${JSON.stringify(response.data)}` : ''
    // );
    return response;
  },
  (error: AxiosError) => {
    // Enhanced error logging
    // console.error(
    //   'API Error:',
    //   error.config?.method?.toUpperCase(),
    //   error.config?.url,
    //   `Status: ${error.response?.status}`,
    //   error.response?.data ? `Data: ${JSON.stringify(error.response.data)}` : ''
    // );

    // Handle common errors globally
    if (error.response?.status === 401) {
      console.log('Unauthorized - redirecting to login');
    }

    if (error.response?.status === 500) {
      console.log('Server error occurred');
    }

    return Promise.reject(error);
  }
);

// Custom API Error Class
export class ApiError extends Error {
  status?: number;
  data?: any;

  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    // Set the prototype explicitly for instanceof checks
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// Enhanced API Request Function
export const apiRequest = async <T = any>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response = await apiClient({
      url,
      ...options,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const responseData = error.response?.data as any;
      throw new ApiError(
        responseData?.message ||
          error.message ||
          'An unexpected error occurred',
        error.response?.status,
        responseData
      );
    }

    // Handle non-Axios errors
    if (error instanceof Error) {
      throw new ApiError(error.message);
    }

    throw new ApiError('An unknown error occurred');
  }
};

// Utility functions for common methods
export const apiGet = <T = any>(url: string, params?: object) =>
  apiRequest<T>(url, { method: 'GET', params });

export const apiPost = <T = any>(url: string, data?: object) =>
  apiRequest<T>(url, { method: 'POST', data });

export const apiPut = <T = any>(url: string, data?: object) =>
  apiRequest<T>(url, { method: 'PUT', data });

export const apiDelete = <T = any>(url: string) =>
  apiRequest<T>(url, { method: 'DELETE' });

export const apiPatch = <T = any>(url: string, data?: object) =>
  apiRequest<T>(url, { method: 'PATCH', data });
