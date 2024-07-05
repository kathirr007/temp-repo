import type { PaginationParams } from '@/types/common.type';

interface PaginationOptions {
  totalRecords?: number;
  queryFn?: Function;
}

export function usePagination({ totalRecords = 0, queryFn }: PaginationOptions) {
  const params = reactive<PaginationParams>({
    change_type: '',
    column_filters: [],
    current_page: 1,
    pagesize: 10,
    search: '',
    sort_column: '',
    sort_direction: ''
  });

  const totalPages = computed(() => {
    return totalRecords ? Math.ceil(totalRecords / params.pagesize) : 0;
  });

  const disablePrevious = computed(() => params.current_page === 1);
  const disableNext = computed(() => params.current_page === totalPages.value);

  return {
    params,
    totalPages,
    disablePrevious,
    disableNext
  };
}
