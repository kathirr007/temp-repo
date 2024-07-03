import type { AxiosRequestConfig } from 'axios';

export interface PaginatedResponse<T> {
  results: T[];
  newResults?: T[];
  total: number;
}

export interface EmptyObj { [key: string]: unknown }
export type CustomAxiosRequestConfig = AxiosRequestConfig & {
  catchErrors: boolean;
};
