import type { AxiosRequestConfig } from 'axios';

export interface PaginatedResponse<T> {
  results: T[];
  newResults?: T[];
  total: number;
}

export interface PaginationParams {
  current_page: number;
  pagesize: number;
  column_filters?: any[];
  change_type?: string;
  offset?: number;
  search?: string;
  sort_column?: string;
  sort_direction?: string;
}

export interface EmptyObj { [key: string]: unknown }
export type CustomAxiosRequestConfig = AxiosRequestConfig & {
  catchErrors: boolean;
};

export enum DrawerSize {
  'small' = 'max-w-sm',
  'medium' = 'max-w-md',
  'large' = 'max-w-lg',
  'extra-large' = 'max-w-xl'
}
